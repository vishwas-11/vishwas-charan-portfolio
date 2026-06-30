"use client";
// Force recompile to fix HMR hydration mismatch

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { Check, ArrowUpRight, Copy, ArrowUp, MapPin, PhoneCall } from "lucide-react";
import SplitText from "./SplitText";
import BlurText from "./BlurText";

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
  const [triggerEl, setTriggerEl] = useState<HTMLDivElement | null>(null);
  const [showPhone, setShowPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("vishwascharan11@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;
    setTriggerEl(wrapperRef.current);

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
      className="relative h-[65vh] min-h-[500px] w-full"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      {/* The actual footer stays fixed to the viewport underneath everything */}
      <footer className="fixed bottom-0 left-0 flex h-[65vh] min-h-[500px] w-full flex-col items-center justify-center bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 text-foreground border-t border-border/50 shadow-inner">

        <div className="flex flex-col items-center justify-center space-y-10 px-4 md:px-8 w-full max-w-5xl mx-auto z-10 pb-28 md:pb-32 pt-12">

          <div className="flex flex-col items-center text-center space-y-6">
            <div className="inline-flex items-center gap-4">
              <div className="relative flex h-4 w-6 flex-col overflow-hidden rounded-sm border border-foreground/30 bg-background">
                <div className="flex h-1.5 w-full items-center gap-[1.5px] border-b border-foreground/20 bg-foreground/10 px-[2px]">
                  <div className="h-[2px] w-[2px] rounded-full bg-red-500/70" />
                  <div className="h-[2px] w-[2px] rounded-full bg-yellow-500/70" />
                  <div className="h-[2px] w-[2px] rounded-full bg-green-500/70" />
                </div>
                <div className="flex flex-1 items-center px-[2px]">
                  <motion.div
                    animate={{ width: ["0%", "80%", "80%", "0%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.6, 0.9, 1] }}
                    className="h-[2px] bg-foreground"
                  />
                </div>
              </div>
              <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                Available for work
              </span>
            </div>

            <div ref={giantTextRef}>
              <SplitText
                tag="h2"
                text="Let's Connect."
                className="text-4xl md:text-5xl lg:text-6xl leading-tight font-semibold tracking-tight text-foreground"
                delay={50}
                duration={1.2}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 150, rotationX: 90 }}
                to={{ opacity: 1, y: 0, rotationX: 0 }}
                threshold={0.1}
                customTrigger={triggerEl}
                onScrollReplay={true}
              />
            </div>

            <div className="max-w-md mx-auto">
              <BlurText
                text="Want to roast my code or talk about music? Drop me a line. I promise I write better guitar riffs than I do Backend APIs."
                className="text-muted-foreground text-sm md:text-base justify-center"
                delay={20}
                animateBy="words"
                direction="top"
                onScrollReplay={true}
              />
            </div>

            <div className="flex items-center justify-center gap-2 mt-8 text-muted-foreground">
              <MapPin className="w-4 h-4 text-amber-500/80" />
              <BlurText
                text="NOIDA, INDIA"
                className="text-sm font-medium tracking-[0.1em] uppercase m-0"
                delay={20}
                animateBy="words"
                direction="top"
                onScrollReplay={true}
              />
            </div>
          </div>

          <div ref={linksRef} className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 w-full mt-8">
            <Magnetic>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyEmail}
                className="group relative flex h-11 w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-foreground px-6 text-background transition-colors hover:bg-foreground/90 overflow-hidden shadow-sm"
              >
                <span className="text-sm font-medium">
                  {copied ? "Copied to clipboard" : "Copy Email"}
                </span>
                <span className="flex items-center justify-center transition-transform group-hover:scale-110">
                  {copied ? <Check className="h-4 w-4 text-background" /> : <Copy className="h-4 w-4 text-background" />}
                </span>
              </motion.button>
            </Magnetic>

            <Magnetic>
              <motion.a
                whileTap={{ scale: 0.95 }}
                href={showPhone ? "tel:+917906024886" : "#"}
                onClick={(e) => {
                  if (!showPhone) {
                    e.preventDefault();
                    setShowPhone(true);
                  }
                }}
                className="group relative flex h-11 w-full sm:w-auto items-center justify-center gap-3 rounded-full border border-border bg-background/50 backdrop-blur-sm px-6 text-foreground transition-all duration-300 hover:bg-accent hover:text-accent-foreground overflow-hidden shadow-sm"
                style={{ width: showPhone ? 'auto' : undefined }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={showPhone ? "phone" : "call"}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="text-sm font-medium"
                  >
                    {showPhone ? "+91 7906024886" : "Quick call"}
                  </motion.span>
                </AnimatePresence>

                <span className="flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-12">
                  <PhoneCall className="h-4 w-4 text-foreground group-hover:animate-pulse" />
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
