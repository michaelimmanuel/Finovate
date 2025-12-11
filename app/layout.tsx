import type { Metadata } from "next";
import { Bebas_Neue, Nunito, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/sections/NavBar";

// Heading font
const bebas = Bebas_Neue({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
});

// Body font
const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finnovate",
  description: "Innovate your Financial and Technology",
  icons: [
    { rel: "icon", url: "/icon.png" },
    { rel: "shortcut icon", url: "/icon.png" },
    { rel: "apple-touch-icon", url: "/icon.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${bebas.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
