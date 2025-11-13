import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NEPAR - National Energy Payment & Arrears Reconciliation",
  description: "National Energy Payment & Arrears Reconciliation System for Ghana Energy Sector",
  keywords: ["NEPAR", "Energy", "Payment", "Arrears", "Reconciliation", "Ghana", "VRA", "ECG", "GNPC", "BOST"],
  authors: [{ name: "NEPAR Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "NEPAR Dashboard",
    description: "National Energy Payment & Arrears Reconciliation System",
    url: "https://nepar.gov.gh",
    siteName: "NEPAR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEPAR Dashboard",
    description: "National Energy Payment & Arrears Reconciliation System",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
