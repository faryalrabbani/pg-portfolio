import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ChatBot from "@/components/ChatBot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Aperture — Fine Art Photography",
  description:
    "Cinematic wedding, portrait, and event photography. Moments, framed forever.",
  openGraph: {
    title: "Aperture — Fine Art Photography",
    description:
      "Cinematic wedding, portrait, and event photography.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
                        <body className="grain bg-[var(--bg)] text-[var(--fg)] antialiased">
        <SmoothScroll />
        <CustomCursor />
        <ChatBot />
        <Navbar />
        {children}
      </body>
    </html>
  );
}