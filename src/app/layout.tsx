import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getGithubStats } from "@/lib/github";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vishwas - Portfolio",
  description: "Full-stack developer who loves building things from idea to launch.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <div className="pointer-events-none fixed bottom-0 left-0 w-full h-32 bg-background/80 backdrop-blur-md [mask-image:linear-gradient(to_top,black_20%,transparent)] z-50" />
        </ThemeProvider>
      </body>
    </html>
  );
}
