import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/helpers/googleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Record<string, string> = {
  title: "VideoBriefs - Free AI-Powered YouTube Video Summaries",
  description:
    "Summarize YouTube videos for free with our AI-powered YouTube Summarizer. Identify important ideas and facts effortlessly. Try it now!",
  keywords:
    "YouTube summarizer, video summary, AI-powered summaries, YouTube video analysis, free video summarization tool, online video summaries, efficient content consumption, concise video insights, enhance online engagement, quick video digestion, productivity tool",
  author: "Anmol Dhiman",
  publisher: "VideoBriefs",
  language: "English",
  category: "Technology",
  pageType: "Website",
  audience: "Global",
  geographicLocation: "Worldwide",
  rating: "General",
  coverage: "Worldwide",
  distribution: "Global",
  ogTitle: "YouTube Summarizer - Free AI-Powered Video Summaries",
  ogDescription:
    "Summarize YouTube videos for free with our AI-powered YouTube Summarizer. Identify important ideas and facts effortlessly. Try it now!",
  ogImage: "https://videobriefs.hidethepain.live/og-image.png",
  ogUrl: "https://videobriefs.hidethepain.live",
  twitterTitle: "YouTube Summarizer - Free AI-Powered Video Summaries",
  twitterDescription:
    "Summarize YouTube videos for free with our AI-powered YouTube Summarizer. Identify important ideas and facts effortlessly. Try it now!",
  twitterImage: "https://videobriefs.hidethepain.live/og-image.png",
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
