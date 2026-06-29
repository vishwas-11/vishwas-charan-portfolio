"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useSpring } from "framer-motion";
import { Check, ArrowUpRight, Copy, ArrowUp } from "lucide-react";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Magnetic = ({ children }: { children: React.ReactElement }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.25);
    y.set(middleY * 0.25);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x, y }}
      className="flex w-full sm:w-auto"
    >
      {children}
    </motion.div>
  );
};

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("vishwascharan11@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    // React strict mode compatible GSAP context cleanup
    const ctx = gsap.context(() => {
      // Parallax for the giant text
      gsap.fromTo(
        giantTextRef.current,
        { scale: 0.8, opacity: 0.5, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // Staggered Content Reveal for buttons
      gsap.fromTo(
        linksRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 60%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative h-[80vh] w-full"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      {/* The actual footer stays fixed to the viewport underneath everything */}
      <footer className="fixed bottom-0 left-0 flex h-[80vh] w-full flex-col items-center justify-center bg-background text-foreground border-t border-border">
        
        <div className="flex flex-col items-center justify-center space-y-12 px-4 md:px-8 w-full max-w-5xl mx-auto z-10 mb-8">
          
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-foreground uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Available for work
            </div>
            
            <h2 
              ref={giantTextRef}
              className="text-6xl md:text-8xl lg:text-[9rem] leading-none font-black tracking-tighter text-foreground uppercase"
            >
              Let's Talk.
            </h2>
            
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto font-medium">
              Want to roast my code or talk about music? Drop me a line. I promise I write better guitar riffs than I do Backend APIs.
            </p>
          </div>

          <div ref={linksRef} className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 w-full mt-8">
            <Magnetic>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyEmail}
                className="group relative flex h-16 w-full sm:w-auto items-center justify-between gap-8 rounded-full bg-foreground px-8 text-background transition-colors hover:bg-foreground/90 overflow-hidden"
              >
                <span className="text-base font-semibold tracking-wide">
                  {copied ? "Copied to clipboard" : "Copy Email"}
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background/20 transition-transform group-hover:scale-110">
                  {copied ? <Check className="h-4 w-4 text-background" /> : <Copy className="h-4 w-4 text-background" />}
                </span>
              </motion.button>
            </Magnetic>

            <Magnetic>
              <motion.a 
                whileTap={{ scale: 0.95 }}
                href="https://x.com/charan_722" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex h-16 w-full sm:w-auto items-center justify-between gap-8 rounded-full border-2 border-border bg-background px-8 text-foreground transition-colors hover:border-foreground overflow-hidden"
              >
                <span className="text-base font-semibold tracking-wide">
                  Slide into DMs
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/5 transition-transform group-hover:scale-110 group-hover:-translate-y-1 group-hover:translate-x-1">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </motion.a>
            </Magnetic>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="absolute bottom-8 w-full px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground text-xs font-semibold tracking-widest uppercase z-10">
          <div>© {new Date().getFullYear()} Vishwas. All rights reserved.</div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-foreground transition-colors flex items-center gap-2 group"
          >
            Back to Top
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </footer>
    </div>
  );
}
