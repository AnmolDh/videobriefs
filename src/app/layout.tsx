import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/helpers/googleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VideoBriefs - Summarize YouTube Videos in Just One Click!",
  description:
    "Get concise summaries of YouTube videos quickly with VideoBriefs.",
  keywords: "YouTube, video summaries, online video, productivity",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {process.env.GA_ID ? (
          <GoogleAnalytics ga_id={process.env.GA_ID} />
        ) : null}
        {children}
      </body>
    </html>
  );
}
