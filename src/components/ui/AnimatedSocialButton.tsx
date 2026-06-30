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
  const glowRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: buttonRef });

  const handleMouseMove = contextSafe((e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Magnetic effect for the button
    gsap.to(buttonRef.current, {
      x: x * 0.15,
      y: y * 0.15,
      duration: 0.6,
      ease: "power3.out",
    });

    // Parallax effect for the icon
    gsap.to(iconRef.current, {
      x: x * 0.08,
      y: y * 0.08,
      duration: 0.4,
      ease: "power3.out",
    });
    
    // Interactive glow tracking the cursor
    gsap.to(glowRef.current, {
      x: x,
      y: y,
      opacity: 1,
      duration: 0.3,
    });
  });

  const handleMouseLeave = contextSafe(() => {
    // Elegant magnetic snap back
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
    });
    
    gsap.to(iconRef.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
    });

    gsap.to(glowRef.current, {
      opacity: 0,
      duration: 0.5,
    });
  });

  return (
    <a 
      ref={buttonRef}
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col items-center justify-center gap-4 w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-foreground/[0.03] border border-foreground/[0.05] hover:border-foreground/[0.15] dark:bg-white/[0.03] dark:border-white/[0.05] dark:hover:border-white/[0.15] transition-colors duration-500 backdrop-blur-md overflow-hidden shadow-sm hover:shadow-2xl"
    >
      <div 
        ref={glowRef} 
        className="absolute w-24 h-24 bg-primary/20 rounded-full blur-2xl opacity-0 pointer-events-none z-0" 
      />
      <div ref={iconRef} className={`relative z-10 text-foreground/40 ${hoverColorClass} transition-colors duration-500`}>
        {icon}
      </div>
      <span className="relative z-10 text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase text-foreground/40 group-hover:text-foreground/90 transition-colors duration-500">
        {label}
      </span>
    </a>
  );
}
