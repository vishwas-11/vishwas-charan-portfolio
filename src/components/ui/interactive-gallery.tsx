"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Polaroid } from "./Polaroid";
import { cn } from "@/lib/utils";
import { MousePointerClick } from "lucide-react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip);
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  rotation: string;
  stackedRotation: string;
  scatteredClassName?: string;
  annotation?: {
    text: string;
    className: string;
  };
}

interface InteractiveGalleryProps {
  items: GalleryItem[];
}

export function InteractiveGallery({ items }: InteractiveGalleryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<Flip.FlipState | null>(null);

  const toggleLayout = () => {
    if (!containerRef.current) return;
    stateRef.current = Flip.getState(".gallery-item");
    setIsExpanded(!isExpanded);
  };

  useLayoutEffect(() => {
    if (stateRef.current) {
      Flip.from(stateRef.current, {
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.05,
      });

      // Animate the 3D card flip concurrently
      gsap.fromTo(".gallery-item", 
        { rotateY: isExpanded ? 0 : 360 }, 
        { rotateY: isExpanded ? 360 : 0, duration: 1.2, ease: "power3.inOut", stagger: 0.05 }
      );

      stateRef.current = null;
    }
  }, [isExpanded]);

  const getRot = (rotClass: string) => {
    const match = rotClass.match(/-?rotate-(\d+)/);
    if (!match) return 0;
    const val = parseInt(match[1]);
    return rotClass.startsWith('-') ? -val : val;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-20 flex flex-col items-center min-h-[600px] md:min-h-[800px]" ref={containerRef}>
      
      {/* Container switches between flex/center (stacked) and grid (expanded) */}
      <div 
        className={cn(
          "w-full transition-all duration-700 ease-in-out relative",
          isExpanded 
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-x-12 md:gap-y-16 items-center" 
            : "flex justify-center items-center h-[400px]"
        )}
      >
        {/* Decorative String Overlays */}
        <AnimatePresence>
          {isExpanded && (
            <>
              {/* Shared SVG Filters for Pencil Effect */}
              <svg className="hidden">
                <defs>
                  <filter id="pencil-texture-base" x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                  <filter id="pencil-texture-core" x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="4" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
              </svg>

              {/* Desktop String (3 columns) */}
              <motion.svg viewBox="0 0 1200 800" className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" preserveAspectRatio="xMidYMid slice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <defs>
                  <mask id="desktop-mask">
                    <motion.path
                      d="M -300,50 Q -50,0 200,100 C 400,0 400,200 600,100 C 800,0 800,200 1000,100 C 1100,200 100,300 200,500 C 400,600 400,400 600,500 C 800,600 800,400 1000,500 Q 1200,600 1500,500"
                      fill="none"
                      stroke="white"
                      strokeWidth="10"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 3, delay: 1.0, ease: "easeInOut" }}
                    />
                  </mask>
                </defs>
                <path
                  d="M -300,50 Q -50,0 200,100 C 400,0 400,200 600,100 C 800,0 800,200 1000,100 C 1100,200 100,300 200,500 C 400,600 400,400 600,500 C 800,600 800,400 1000,500 Q 1200,600 1500,500"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="5"
                  strokeDasharray="4 16"
                  strokeLinecap="round"
                  opacity="0.3"
                  filter="url(#pencil-texture-base)"
                  mask="url(#desktop-mask)"
                />
                <path
                  d="M -300,50 Q -50,0 200,100 C 400,0 400,200 600,100 C 800,0 800,200 1000,100 C 1100,200 100,300 200,500 C 400,600 400,400 600,500 C 800,600 800,400 1000,500 Q 1200,600 1500,500"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2.5"
                  strokeDasharray="4 16"
                  strokeLinecap="round"
                  opacity="0.7"
                  filter="url(#pencil-texture-core)"
                  mask="url(#desktop-mask)"
                />
                <path
                  d="M -300,50 Q -50,0 200,100 C 400,0 400,200 600,100 C 800,0 800,200 1000,100 C 1100,200 100,300 200,500 C 400,600 400,400 600,500 C 800,600 800,400 1000,500 Q 1200,600 1500,500"
                  fill="none"
                  stroke="#991b1b"
                  strokeWidth="1"
                  strokeDasharray="4 16"
                  strokeLinecap="round"
                  opacity="0.6"
                  mask="url(#desktop-mask)"
                />
              </motion.svg>

              {/* Tablet String (2 columns) */}
              <motion.svg viewBox="0 0 800 1200" className="hidden sm:block md:hidden absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" preserveAspectRatio="xMidYMid slice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <defs>
                  <mask id="tablet-mask">
                    <motion.path
                      d="M -200,50 Q 0,0 200,100 C 400,0 400,200 600,100 C 700,200 100,300 200,500 C 400,600 400,400 600,500 C 700,600 100,700 200,900 C 400,1000 400,800 600,900 Q 800,1000 1000,950"
                      fill="none"
                      stroke="white"
                      strokeWidth="10"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 3, delay: 1.0, ease: "easeInOut" }}
                    />
                  </mask>
                </defs>
                <path
                  d="M -200,50 Q 0,0 200,100 C 400,0 400,200 600,100 C 700,200 100,300 200,500 C 400,600 400,400 600,500 C 700,600 100,700 200,900 C 400,1000 400,800 600,900 Q 800,1000 1000,950"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="5"
                  strokeDasharray="4 16"
                  strokeLinecap="round"
                  opacity="0.3"
                  filter="url(#pencil-texture-base)"
                  mask="url(#tablet-mask)"
                />
                <path
                  d="M -200,50 Q 0,0 200,100 C 400,0 400,200 600,100 C 700,200 100,300 200,500 C 400,600 400,400 600,500 C 700,600 100,700 200,900 C 400,1000 400,800 600,900 Q 800,1000 1000,950"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2.5"
                  strokeDasharray="4 16"
                  strokeLinecap="round"
                  opacity="0.7"
                  filter="url(#pencil-texture-core)"
                  mask="url(#tablet-mask)"
                />
                <path
                  d="M -200,50 Q 0,0 200,100 C 400,0 400,200 600,100 C 700,200 100,300 200,500 C 400,600 400,400 600,500 C 700,600 100,700 200,900 C 400,1000 400,800 600,900 Q 800,1000 1000,950"
                  fill="none"
                  stroke="#991b1b"
                  strokeWidth="1"
                  strokeDasharray="4 16"
                  strokeLinecap="round"
                  opacity="0.6"
                  mask="url(#tablet-mask)"
                />
              </motion.svg>

              {/* Mobile String (1 column) */}
              <motion.svg viewBox="0 0 400 1800" className="block sm:hidden absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" preserveAspectRatio="xMidYMid slice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <defs>
                  <mask id="mobile-mask">
                    <motion.path
                      d="M 100,-200 Q 300,-50 200,100 C 0,200 0,300 200,400 C 400,500 400,600 200,700 C 0,800 0,900 200,1000 C 400,1100 400,1200 200,1300 C 0,1400 0,1500 200,1600 Q 300,1850 100,2000"
                      fill="none"
                      stroke="white"
                      strokeWidth="10"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 3, delay: 1.0, ease: "easeInOut" }}
                    />
                  </mask>
                </defs>
                <path
                  d="M 100,-200 Q 300,-50 200,100 C 0,200 0,300 200,400 C 400,500 400,600 200,700 C 0,800 0,900 200,1000 C 400,1100 400,1200 200,1300 C 0,1400 0,1500 200,1600 Q 300,1850 100,2000"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="5"
                  strokeDasharray="4 16"
                  strokeLinecap="round"
                  opacity="0.3"
                  filter="url(#pencil-texture-base)"
                  mask="url(#mobile-mask)"
                />
                <path
                  d="M 100,-200 Q 300,-50 200,100 C 0,200 0,300 200,400 C 400,500 400,600 200,700 C 0,800 0,900 200,1000 C 400,1100 400,1200 200,1300 C 0,1400 0,1500 200,1600 Q 300,1850 100,2000"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2.5"
                  strokeDasharray="4 16"
                  strokeLinecap="round"
                  opacity="0.7"
                  filter="url(#pencil-texture-core)"
                  mask="url(#mobile-mask)"
                />
                <path
                  d="M 100,-200 Q 300,-50 200,100 C 0,200 0,300 200,400 C 400,500 400,600 200,700 C 0,800 0,900 200,1000 C 400,1100 400,1200 200,1300 C 0,1400 0,1500 200,1600 Q 300,1850 100,2000"
                  fill="none"
                  stroke="#991b1b"
                  strokeWidth="1"
                  strokeDasharray="4 16"
                  strokeLinecap="round"
                  opacity="0.6"
                  mask="url(#mobile-mask)"
                />
              </motion.svg>
            </>
          )}
        </AnimatePresence>

        {/* Items */}
        {items.map((item, index) => (
          <div
            key={item.id}
            onClick={() => !isExpanded && toggleLayout()}
            className={cn(
              "gallery-item relative cursor-pointer justify-self-center z-10",
              !isExpanded && "absolute",
              isExpanded && item.scatteredClassName
            )}
            style={{
              zIndex: isExpanded ? 1 : items.length - index,
              left: !isExpanded ? "50%" : "auto",
              top: !isExpanded ? "50%" : "auto",
              transform: isExpanded 
                ? `rotate(${getRot(item.rotation)}deg)` 
                : `translate(-50%, calc(-50% + ${index * 12}px)) scale(${1 - index * 0.02}) rotate(${item.stackedRotation}deg)`,
            }}
          >
            <div className={cn("transition-transform duration-300", isExpanded && "hover:-translate-y-2 hover:scale-[1.02]")}>
              <Polaroid
                src={item.src}
                alt={item.alt}
                caption={item.caption}
                rotation=""
                className={cn("w-64 sm:w-60 md:w-72 shadow-2xl", !isExpanded && "hover:shadow-3xl")}
              />
            </div>
            
            {/* Render annotations only when expanded */}
            <AnimatePresence>
              {isExpanded && item.annotation && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + (index * 0.1) }}
                  className={cn(
                    "absolute font-heading italic text-red-500/90 pointer-events-none z-10",
                    item.annotation.className
                  )}
                >
                  {item.annotation.text}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Floating prompt to click */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
            transition={{ delay: 0.5 }}
            className="absolute top-1/2 mt-[220px] left-1/2 -translate-x-1/2 z-10 pointer-events-none"
          >
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-foreground/5 border border-foreground/10 backdrop-blur-md shadow-xl dark:bg-white/5 dark:border-white/10"
            >
              <MousePointerClick className="w-4 h-4 text-amber-500" />
              <span className="text-foreground/90 dark:text-white/90 text-xs md:text-sm font-semibold tracking-[0.15em] uppercase">
                Click stack to reveal
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button to collapse back to stack */}
      <AnimatePresence>
        {isExpanded && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.8 }}
            onClick={toggleLayout}
            className="mt-16 px-6 py-2 rounded-full border border-foreground/10 hover:bg-foreground/5 hover:border-foreground/20 text-foreground/70 transition-all font-light text-sm"
          >
            Stack photos
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
