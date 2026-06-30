'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function RockBackgroundTransition() {
  useGSAP(() => {
    const pageWrapper = document.getElementById('about-page-wrapper');
    const triggerSection = document.getElementById('beyond-code-section');

    if (!pageWrapper || !triggerSection) return;

    gsap.to(pageWrapper, {
      backgroundColor: '#0a1128', // The rich midnight royal blue that looks best
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: triggerSection,
        start: 'top 20%', // Starts fading when the title is near the top of the screen (scrolling past it)
        end: 'center center', // Reaches full rock-red when the gallery/music text is centered
        scrub: 1.5, // Adds a 1.5s smoothing delay so it doesn't snap instantly with scroll
      }
    });
  }, []);

  return null;
}
