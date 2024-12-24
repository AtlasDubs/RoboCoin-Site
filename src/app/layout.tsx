'use client';

import { Inter, JetBrains_Mono } from "next/font/google";
import WalletContextProvider from "./WalletContextProvider/WalletContextProvider"; // Ensure the path is correct
import "./globals.css";
import { useEffect, useState } from "react";

// Import fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "700"], // Normal, Medium, Bold
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mounted, setMounted] = useState(false);

  // Ensure rendering only happens after client has mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a fallback while waiting for the client to mount
    return (
      <html lang="en">
        <body className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
          <div className="text-center">
            <p className="text-lime-400 text-xl font-mono">Loading...</p>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={`${inter.variable} ${jetBrainsMono.variable}`}>
      <body className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-200 antialiased">
        <WalletContextProvider>{children}</WalletContextProvider>
      </body>
    </html>
  );
}
