import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "./components";

export const metadata: Metadata = {
  title: "RBS",
  description: "Your place for your retro media needs!",
  keywords: ["retro", "video", "games", "video games", "arcade", "vhs", "dvd", "cd", "vinyl", "vintage consoles", "video games", "video game consoles"],
  authors: [{ name: "Judah Christman" }],
  openGraph: {
    title: "Retro Buy & Sell",
    description: "Your place for your retro media needs!",
    url: "https://yourdomain.com",
    siteName: "Retro Buy & Sell",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
