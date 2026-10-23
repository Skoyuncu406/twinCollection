import { Bodoni_Moda, Syne, Cormorant_Garamond } from "next/font/google";

import "./globals.css";

import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";

const bodoni = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bodoni",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin", "latin-ext"],
  variable: "--font-syne",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata = {
  title: {
    default: "TWIN COLLECTION | Erkek Giyim",
    template: "%s | TWIN COLLECTION",
  },
  description:
    "TWIN COLLECTION erkek giyim koleksiyonu. Modern, özgün ve zamansız stil.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body
        className={`${bodoni.variable} ${syne.variable} ${cormorant.variable}`}
      >
        <header className="site-header">
          <AnnouncementBar />
          <Navbar />
        </header>

        {children}
      </body>
    </html>
  );
}
