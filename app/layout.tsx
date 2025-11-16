import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PartyProvider } from "@/lib/PartyContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anajak Play - Gaming Superapp",
  description: "ระบบหาตี้ Marketplace และคอมมูนิตี้เกมเมอร์ไทย",
  keywords: ["gaming", "thailand", "rov", "valorant", "party finder", "marketplace", "เกม", "หาตี้"],
  authors: [{ name: "Anajak Play" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#7c3aed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={inter.className}>
        <PartyProvider>
          {children}
        </PartyProvider>
      </body>
    </html>
  );
}
