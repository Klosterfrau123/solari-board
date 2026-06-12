import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="de">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
