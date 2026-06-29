import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
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
          <SmoothScroll>
            <Header />
            <main className="flex-1 bg-background relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              {children}
            </main>
            <CinematicFooter />
            <div className="pointer-events-none fixed bottom-0 left-0 w-full h-48 bg-background/80 backdrop-blur-md [mask-image:linear-gradient(to_top,black_10%,transparent)] z-50" />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
