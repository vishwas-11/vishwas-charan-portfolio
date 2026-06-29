"use client";

import { useState } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Copy, Check, MessageSquare, Mail } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("vishwascharan11@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 pt-12 pb-4 md:px-8 relative z-10">
      <Reveal delay={0.1}>
        <div 
          className="group relative rounded-[2rem] border border-border/50 bg-card overflow-hidden shadow-xl"
          onMouseMove={handleMouseMove}
        >
          {/* Spotlight Hover Effect */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  600px circle at ${mouseX}px ${mouseY}px,
                  hsl(var(--foreground) / 0.04),
                  transparent 40%
                )
              `,
            }}
          />

          <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center justify-between">
            {/* Left Side: Content */}
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Available for work
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50">extraordinary.</span>
              </h2>
              
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                Want to roast my code or talk about music? Drop me a line. I promise I write better guitar riffs than I do Backend APIs.
              </p>
            </div>

            {/* Right Side: Actions */}
            <div className="w-full md:w-auto flex flex-col gap-4 shrink-0 md:min-w-[280px]">
              <button 
                onClick={handleCopyEmail}
                className="group/btn relative flex w-full items-center justify-between gap-6 overflow-hidden rounded-2xl border border-border bg-background p-4 transition-all hover:bg-accent/50 hover:shadow-md active:scale-95"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover/btn:bg-primary group-hover/btn:text-primary-foreground">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-foreground">Email Me</span>
                    <span className="text-xs text-muted-foreground">vishwascharan11@gmail.com</span>
                  </div>
                </div>
                <div className="text-muted-foreground transition-colors group-hover/btn:text-foreground">
                  {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                </div>
              </button>

              <a 
                href="https://x.com/charan_722" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/btn relative flex w-full items-center justify-between gap-6 overflow-hidden rounded-2xl border border-border bg-background p-4 transition-all hover:bg-accent/50 hover:shadow-md active:scale-95"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 text-foreground transition-colors group-hover/btn:bg-foreground group-hover/btn:text-background">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-foreground">Slide into DMs</span>
                    <span className="text-xs text-muted-foreground">Fastest way to reach me</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
