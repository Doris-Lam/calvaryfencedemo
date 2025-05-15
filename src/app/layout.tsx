import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cavalry Fence - Vinyl Fence Experts in Edmonton",
  description: "Edmonton's premier vinyl fence installation experts. Get a free quote for your vinyl fence project today!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-white flex flex-col">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
