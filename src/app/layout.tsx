import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Stairway of NO-Thing",
  description: "A mystical expedition through labels, memory, vision, and the place before the name.",
  icons: {
    icon: "/images/cms-redux-logo.png",
    apple: "/images/cms-redux-logo.png"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
