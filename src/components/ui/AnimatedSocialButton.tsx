'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface AnimatedSocialButtonProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  hoverColorClass: string;
}

export function AnimatedSocialButton({ href, label, icon, hoverColorClass }: AnimatedSocialButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const { contextSafe } = useGSAP({ scope: buttonRef });

  const handleMouseEnter = contextSafe(() => {
    // Sleek, subtle scale and lift
    gsap.to(buttonRef.current, {
      scale: 1.02,
      y: -4,
      duration: 0.4,
      ease: "power2.out",
    });
    
    // Gentle icon highlight
    gsap.to(iconRef.current, {
      scale: 1.08,
      y: -2,
      duration: 0.4,
      ease: "power2.out"
    });
  });

  const handleMouseLeave = contextSafe(() => {
    // Smooth, elegant reset
    gsap.to(buttonRef.current, {
      scale: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    });
    
    gsap.to(iconRef.current, {
      scale: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out"
    });
  });

  return (
    <a 
      ref={buttonRef}
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col items-center justify-center gap-3 w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.08] transition-colors duration-300 backdrop-blur-sm"
    >
      <div ref={iconRef} className={`text-foreground/60 ${hoverColorClass} transition-colors duration-300`}>
        {icon}
      </div>
      <span ref={textRef} className="text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase text-foreground/40 group-hover:text-foreground/90 transition-colors duration-300">
        {label}
      </span>
    </a>
  );
}
