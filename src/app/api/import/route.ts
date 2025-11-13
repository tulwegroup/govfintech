// @ts-nocheck
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST() {
  try {
    // Create demo parties
    const parties = await Promise.all([
      db.party.create({
        data: {
          name: "Electricity Company of Ghana",
          type: "UTILITY",
          code: "ECG",
          contactInfo: "contact@ecg.com.gh"
        }
      }),
      db.party.create({
        data: {
          name: "Volta River Authority",
          type: "UTILITY", 
          code: "VRA",
          contactInfo: "contact@vra.com"
        }
      }),
      db.party.create({
        data: {
          name: "Ghana National Petroleum Corporation",
          type: "OIL_COMPANY",
          code: "GNPC",
          contactInfo: "contact@gnpcghana.com"
        }
      }),
      db.party.create({
        data: {
          name: "Bulk Oil Storage and Transportation",
          type: "OIL_COMPANY",
          code: "BOST",
          contactInfo: "contact@bost.gov.gh"
        }
      }),
      db.party.create({
        data: {
          name: "IPP Alpha",
          type: "IPP",
          code: "IPP_ALPHA",
          contactInfo: "contact@ippalpha.com"
        }
      }),
      db.party.create({
        data: {
          name: "IPP Beta",
          type: "IPP",
          code: "IPP_BETA", 
          contactInfo: "contact@ippbeta.com"
        }
      })
    ]);

    // Create demo invoices
    const invoices = [];
    let invoiceCounter = 1;

    // ECG invoices to IPPs
    for (let i = 0; i < 15; i++) {
      invoices.push({
        invoiceNumber: `I000${String(invoiceCounter++).padStart(3, '0')}`,
        issuerId: parties[0].id, // ECG
        recipientId: parties[4].id, // IPP Alpha
        amount: 45000000 + Math.random() * 10000000,
        issueDate: new Date(2024, 10, Math.floor(Math.random() * 28) + 1),
        dueDate: new Date(2024, 11, Math.floor(Math.random() * 28) + 1),
        type: "ELECTRICITY",
        description: `Electricity supply invoice - Period ${i + 1}`,
        status: Math.random() > 0.2 ? "APPROVED" : "PENDING"
      });
    }

    for (let i = 0; i < 12; i++) {
      invoices.push({
        invoiceNumber: `I000${String(invoiceCounter++).padStart(3, '0')}`,
        issuerId: parties[0].id, // ECG
        recipientId: parties[5].id, // IPP Beta
        amount: 38000000 + Math.random() * 8000000,
        issueDate: new Date(2024, 10, Math.floor(Math.random() * 28) + 1),
        dueDate: new Date(2024, 11, Math.floor(Math.random() * 28) + 1),
        type: "ELECTRICITY",
        description: `Electricity supply invoice - Period ${i + 1}`,
        status: Math.random() > 0.2 ? "APPROVED" : "PENDING"
      });
    }

    // GNPC invoices to VRA
    for (let i = 0; i < 20; i++) {
      invoices.push({
        invoiceNumber: `I000${String(invoiceCounter++).padStart(3, '0')}`,
        issuerId: parties[2].id, // GNPC
        recipientId: parties[1].id, // VRA
        amount: 25000000 + Math.random() * 15000000,
        issueDate: new Date(2024, 10, Math.floor(Math.random() * 28) + 1),
        dueDate: new Date(2024, 11, Math.floor(Math.random() * 28) + 1),
        type: "GAS",
        description: `Natural gas supply invoice - Period ${i + 1}`,
        status: Math.random() > 0.15 ? "APPROVED" : "PENDING"
      });
    }

    // BOST invoices to VRA
    for (let i = 0; i < 18; i++) {
      invoices.push({
        invoiceNumber: `I000${String(invoiceCounter++).padStart(3, '0')}`,
        issuerId: parties[3].id, // BOST
        recipientId: parties[1].id, // VRA
        amount: 12000000 + Math.random() * 8000000,
        issueDate: new Date(2024, 10, Math.floor(Math.random() * 28) + 1),
        dueDate: new Date(2024, 11, Math.floor(Math.random() * 28) + 1),
        type: "FUEL",
        description: `Fuel supply invoice - Period ${i + 1}`,
        status: Math.random() > 0.1 ? "APPROVED" : "PENDING"
      });
    }

    await db.invoice.createMany({ data: invoices });

    // Create demo disputes
    const disputes = [
      {
        disputeNumber: "D001",
        partyId: parties[4].id, // IPP Alpha
        type: "PRICE_VARIANCE",
        description: "Price variance detected in electricity invoice I000015",
        status: "OPEN",
        priority: "HIGH",
        amount: 2500000
      },
      {
        disputeNumber: "D002", 
        partyId: parties[5].id, // IPP Beta
        type: "QUANTITY_VARIANCE",
        description: "Quantity discrepancy in invoice I000028",
        status: "OPEN",
        priority: "MEDIUM",
        amount: 1800000
      },
      {
        disputeNumber: "D003",
        partyId: parties[1].id, // VRA
        type: "PRICE_VARIANCE",
        description: "Gas price variation in GNPC invoice I000042",
        status: "UNDER_REVIEW",
        priority: "HIGH",
        amount: 3200000
      },
      {
        disputeNumber: "D004",
        partyId: parties[1].id, // VRA
        type: "QUANTITY_VARIANCE", 
        description: "Fuel quantity variance in BOST invoice I000058",
        status: "OPEN",
        priority: "MEDIUM",
        amount: 1500000
      }
    ];

    await db.dispute.createMany({ data: disputes });

    // Create demo payments
    const payments = [
      {
        paymentNumber: "P001",
        payerId: parties[1].id, // VRA
        receiverId: parties[2].id, // GNPC
        amount: 231480000,
        paymentDate: new Date(2024, 11, 15),
        status: "COMPLETED",
        paymentMethod: "BANK_TRANSFER",
        referenceNumber: "REF20241215001"
      },
      {
        paymentNumber: "P002",
        payerId: parties[0].id, // ECG
        receiverId: parties[4].id, // IPP Alpha
        amount: 127000000,
        paymentDate: new Date(2024, 11, 10),
        status: "PROCESSING",
        paymentMethod: "NETTING",
        referenceNumber: "NET20241210001"
      }
    ];

    await db.payment.createMany({ data: payments });

    return NextResponse.json({ 
      message: "Demo data imported successfully",
      stats: {
        parties: parties.length,
        invoices: invoices.length,
        disputes: disputes.length,
        payments: payments.length
      }
    });

  } catch (error) {
    console.error("Error importing demo data:", error);
    return NextResponse.json(
      { error: "Failed to import demo data" },
      { status: 500 }
    );
  }
}