import type { Metadata } from "next";
import { Lato, DM_Mono } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-flap",
});

export const metadata: Metadata = {
  title: "Solari Board — Swiss Departures",
  description: "Live Swiss public transport departure board with split-flap animation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${lato.variable} ${dmMono.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
