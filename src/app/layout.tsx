import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/helpers/googleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VideoBriefs - Summarize YouTube Videos in Just One Click!",
  description:
    "Experience seamless YouTube video summaries with VideoBriefs! Elevate productivity and knowledge with our one-click solution. Unlock concise insights effortlessly—your gateway to efficient content consumption and enhanced online video engagement.",
  keywords:
    "YouTube, video summaries, online video, productivity, one-click video insights, efficient content consumption, concise video summaries, enhance online engagement, quick video digestion, YouTube productivity tool",
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
