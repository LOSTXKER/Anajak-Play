import type { Metadata, Viewport } from "next";
import { Prompt, Sarabun, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PartyProvider } from "@/lib/PartyContext";
import { AuthProvider } from "@/lib/AuthContext";

const headingFont = Prompt({
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const bodyFont = Sarabun({
  subsets: ["latin", "thai"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
});

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
      <body className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable} font-body bg-dark-base text-text-primary`}>
        <AuthProvider>
          <PartyProvider>
            {children}
          </PartyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
