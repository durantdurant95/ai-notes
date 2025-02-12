import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Notes",
  description: "A simple note-taking app powered by AI",
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
