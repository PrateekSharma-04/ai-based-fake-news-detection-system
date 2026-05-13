import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Fake News Detection System",
  description: "A simple internship-level fake news detection project using Next.js and FastAPI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
