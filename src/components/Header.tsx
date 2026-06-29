"use client";

import Link from 'next/link';
import { Home, LayoutGrid, User, PenLine, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from "react";
import { AnimatedThemeToggle } from '@/components/ui/animated-theme-toggle';

export default function Header({ githubContributions = "11.2k" }: { githubContributions?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/60">
      <nav className="w-full max-w-4xl mx-auto mt-5 flex items-center justify-between gap-4 px-4 md:mt-8 md:px-8">
        <div className="flex items-center gap-3">
          <div className="group relative">
            <Link href="/" className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground transition-all duration-300 ease-out hover:bg-muted/75 hover:-translate-y-1 hover:shadow-lg">
              <div className="transition-transform duration-500 ease-out group-hover:scale-110 flex items-center justify-center">
                <Home className="h-5 w-5" />
              </div>
            </Link>
            <div className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-3 w-max opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-50 bg-foreground text-background text-xs px-3 py-2 rounded-md shadow-xl font-medium">
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-b-foreground" />
              Home
            </div>
          </div>

          <div className="group relative">
            <Link href="/projects" className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground transition-all duration-300 ease-out hover:bg-muted/75 hover:-translate-y-1 hover:shadow-lg">
              <div className="transition-transform duration-500 ease-out group-hover:scale-110 flex items-center justify-center">
                <LayoutGrid className="h-5 w-5" />
              </div>
            </Link>
            <div className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-3 w-max opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-50 bg-foreground text-background text-xs px-3 py-2 rounded-md shadow-xl font-medium">
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-b-foreground" />
              Projects
            </div>
          </div>

          <div className="group relative">
            <Link href="/about" className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground transition-all duration-300 ease-out hover:bg-muted/75 hover:-translate-y-1 hover:shadow-lg">
              <div className="transition-transform duration-500 ease-out group-hover:scale-110 flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
            </Link>
            <div className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-3 w-max opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-50 bg-foreground text-background text-xs px-3 py-2 rounded-md shadow-xl font-medium">
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-b-foreground" />
              About
            </div>
          </div>

          <div className="group relative">
            <Link href="/articles" className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground transition-all duration-300 ease-out hover:bg-muted/75 hover:-translate-y-1 hover:shadow-lg">
              <div className="transition-transform duration-500 ease-out group-hover:scale-110 flex items-center justify-center">
                <PenLine className="h-5 w-5" />
              </div>
            </Link>
            <div className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-3 w-max opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-50 bg-foreground text-background text-xs px-3 py-2 rounded-md shadow-xl font-medium">
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-b-foreground" />
              Articles
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="group relative">
            <AnimatedThemeToggle />
            <div className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-3 w-max opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-50 bg-foreground text-background text-xs px-3 py-2 rounded-md shadow-xl font-medium">
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-b-foreground" />
              Toggle theme
            </div>
          </div>

          <div className="group relative hidden xs:block">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground transition-all duration-300 ease-out hover:bg-muted/75 hover:-translate-y-1 hover:shadow-lg">
              <div className="transition-transform duration-500 ease-out group-hover:scale-110 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
              </div>
            </a>
            <div className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-3 w-max opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-50 bg-foreground text-background text-xs px-3 py-2 rounded-md shadow-xl font-medium">
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-b-foreground" />
              Twitter
            </div>
          </div>

          <div className="group relative">
            <a href="https://www.linkedin.com/in/vishwas-charan/" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground transition-all duration-300 ease-out hover:bg-muted/75 hover:-translate-y-1 hover:shadow-lg">
              <div className="transition-transform duration-500 ease-out group-hover:scale-110 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </div>
            </a>
            <div className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-3 w-max opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-50 bg-foreground text-background text-xs px-3 py-2 rounded-md shadow-xl font-medium">
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-b-foreground" />
              LinkedIn
            </div>
          </div>

          <div className="group relative">
            <a href="https://github.com/vishwas-11" target="_blank" rel="noopener noreferrer" className="flex h-10 items-center justify-center gap-2 rounded-full bg-muted px-4 pr-5 text-foreground transition-all duration-300 ease-out hover:bg-muted/75 hover:-translate-y-1 hover:shadow-lg">
              <div className="transition-transform duration-500 ease-out group-hover:rotate-[-5deg] group-hover:scale-110 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"></path></svg>
              </div>
              <span className="text-sm font-medium leading-none">{githubContributions}</span>
            </a>
            <div className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-3 w-max opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-50 bg-foreground text-background text-xs px-3 py-2 rounded-md shadow-xl font-medium">
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-b-foreground" />
              GitHub
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
