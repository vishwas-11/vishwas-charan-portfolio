"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatedSocialButton } from "@/components/ui/AnimatedSocialButton";
import { InstagramIcon, YoutubeIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const CinematicFooter = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !imageRef.current || !overlayRef.current || !cardRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom", // when the top of footer hits the bottom of viewport
        end: "bottom bottom", // when footer is fully in view
        scrub: 1, // smooth scrubbing
      }
    });

    // Initial state: Image zoomed in and blurred
    gsap.set(imageRef.current, { scale: 1.3, filter: "blur(12px)" });
    gsap.set(overlayRef.current, { opacity: 0.8 }); // Dark overlay fades out slightly
    gsap.set(cardRef.current, { y: 100, opacity: 0 });

    tl.to(imageRef.current, {
      scale: 1,
      filter: "blur(0px)",
      duration: 1,
      ease: "power2.out"
    }, 0)
    .to(overlayRef.current, {
      opacity: 0.4, // Keep some darkness for contrast
      duration: 1,
      ease: "power2.out"
    }, 0)
    .to(cardRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out"
    }, 0.2);
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden flex items-center justify-center">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full [mask-image:linear-gradient(to_bottom,transparent,black_15%,black)]">
        <Image
          ref={imageRef}
          src="/images/about/collage.png"
          alt="Musical Journey Collage"
          fill
          className="object-cover object-center origin-center"
          priority
        />
        {/* Dark Vignette / Overlay for Contrast - toned down */}
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"
        />
      </div>

      {/* Glassmorphism Card for Content */}
      <div 
        ref={cardRef}
        className="relative z-10 flex flex-col items-center justify-center p-10 md:p-16 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden"
      >
        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        
        <Reveal delay={0.2} overflow="visible">
          <h3 className="text-sm md:text-base font-medium tracking-[0.2em] uppercase text-white/90 mb-10 text-center">
            Catch me jamming here
          </h3>
        </Reveal>
        
        <div className="flex items-center gap-8 md:gap-12">
          <Reveal delay={0.3} overflow="visible">
            <AnimatedSocialButton 
              href="https://www.instagram.com/vishwascharan_official?igsh=MWRyZXE5Y3JraDhkdA=="
              label="Instagram"
              icon={<InstagramIcon className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={1.5} />}
              hoverColorClass="group-hover:text-pink-400"
            />
          </Reveal>
          
          <Reveal delay={0.4} overflow="visible">
            <AnimatedSocialButton 
              href="https://www.youtube.com/@vishwascharanofficial"
              label="YouTube"
              icon={<YoutubeIcon className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={1.5} />}
              hoverColorClass="group-hover:text-red-500"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
};
