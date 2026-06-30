'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function RockBackgroundTransition() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    if (!mounted || !resolvedTheme) return;

    const pageWrapper = document.getElementById('about-page-wrapper');
    const triggerSection = document.getElementById('beyond-code-section');

    if (!pageWrapper || !triggerSection) return;

    // Always force-wipe the inline background color immediately on theme toggle
    pageWrapper.style.backgroundColor = '';

    // Manually search and destroy any rogue ScrollTriggers attached to this section
    ScrollTrigger.getAll().forEach(t => {
      if (t.trigger === triggerSection) t.kill();
    });

    const isDark = resolvedTheme === 'dark';
    
    // If it's light mode, the inline style is already wiped, so we safely exit
    if (!isDark) return;

    const anim = gsap.fromTo(pageWrapper, 
      { backgroundColor: '#000000' }, // Hardcode pure black start so it never interpolates an alpha/transparent channel
      {
        keyframes: [
          { backgroundColor: '#020617' }, // Very dark slate/blue
          { backgroundColor: '#060b20' }, // Darker blue
          { backgroundColor: '#0a1128' }  // Target midnight blue
        ],
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: triggerSection,
          start: 'top 20%', 
          end: 'center center', 
          scrub: 1.5, 
        }
      }
    );

    // Provide explicit manual cleanup
    return () => {
      if (anim.scrollTrigger) {
        anim.scrollTrigger.kill();
      }
      anim.kill();
      if (pageWrapper) {
        pageWrapper.style.backgroundColor = '';
      }
    };
  }, { dependencies: [theme, resolvedTheme, mounted] });

  return null;
}
