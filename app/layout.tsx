import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Domain Surge Forecaster",
  description:
    "Generate forward-looking domain concepts aligned with emerging macro and cultural trends."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
