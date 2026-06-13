import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
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
    <html lang="de" className={lato.variable}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
