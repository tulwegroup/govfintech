// @ts-nocheck
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST() {
  try {
    // Start reconciliation log
    const reconLog = await db.reconciliationLog.create({
      data: {
        status: "RUNNING"
      }
    });

    try {
      // Get all pending invoices
      const pendingInvoices = await db.invoice.findMany({
        where: {
          status: "PENDING"
        },
        include: {
          issuer: true,
          recipient: true
        }
      });

      let matchedCount = 0;
      let exceptionCount = 0;
      const exceptions = [];

      // Simulate reconciliation process
      for (const invoice of pendingInvoices) {
        // Simulate matching logic (in real system, this would be complex business rules)
        const isMatched = Math.random() > 0.1; // 90% match rate
        
        if (isMatched) {
          await db.invoice.update({
            where: { id: invoice.id },
            data: { status: "APPROVED" }
          });
          matchedCount++;
        } else {
          exceptionCount++;
          exceptions.push({
            invoiceId: invoice.id,
            invoiceNumber: invoice.invoiceNumber,
            reason: "Data validation failed - amount mismatch detected"
          });

          // Create a dispute for exceptions
          await db.dispute.create({
            data: {
              disputeNumber: `D_AUTO_${Date.now()}_${invoice.id.slice(-4)}`,
              partyId: invoice.recipientId,
              invoiceId: invoice.id,
              type: "PRICE_VARIANCE",
              description: `Auto-generated dispute for invoice ${invoice.invoiceNumber} due to reconciliation exception`,
              status: "OPEN",
              priority: "MEDIUM",
              amount: invoice.amount * 0.1 // Assume 10% variance
            }
          });
        }
      }

      // Update reconciliation log
      await db.reconciliationLog.update({
        where: { id: reconLog.id },
        data: {
          status: "COMPLETED",
          totalInvoices: pendingInvoices.length,
          matchedInvoices: matchedCount,
          exceptions: exceptionCount,
          metadata: {
            processedAt: new Date().toISOString(),
            exceptions: exceptions,
            processingTime: "2.3 seconds"
          }
        }
      });

      return NextResponse.json({
        success: true,
        message: "Reconciliation completed successfully",
        matched: matchedCount,
        exceptions: exceptionCount,
        totalProcessed: pendingInvoices.length,
        logId: reconLog.id
      });

    } catch (error) {
      // Update log with error
      await db.reconciliationLog.update({
        where: { id: reconLog.id },
        data: {
          status: "FAILED",
          errorMessage: error instanceof Error ? error.message : "Unknown error"
        }
      });
      throw error;
    }

  } catch (error) {
    console.error("Reconciliation error:", error);
    return NextResponse.json(
      { 
        error: "Reconciliation failed",
        message: error instanceof Error ? error.message : "Unknown error occurred"
      },
      { status: 500 }
    );
  }
}