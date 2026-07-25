import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JobsProvider } from "@/context/JobsContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "JobBoard — Find Your Next Opportunity",
    template: "%s | JobBoard",
  },
  description:
    "Discover featured job listings, search by title, location, and category. Post jobs and manage listings from your employer dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
        <JobsProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </JobsProvider>
      </body>
    </html>
  );
}
