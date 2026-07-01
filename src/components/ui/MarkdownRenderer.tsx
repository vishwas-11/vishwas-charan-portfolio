"use client";

import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function MarkdownRenderer({ content }: { content: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text elements (headings, paragraphs, lists)
      const textElements = gsap.utils.toArray<HTMLElement>('.gsap-reveal-text');
      
      textElements.forEach((el) => {
        gsap.fromTo(el, 
          { y: 30, opacity: 0 }, 
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // Animate images separately
      const images = gsap.utils.toArray<HTMLElement>('.gsap-reveal-image');
      
      images.forEach((el) => {
        gsap.fromTo(el, 
          { y: 50, opacity: 0, scale: 0.95 }, 
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 1.2, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [content]);

  return (
    <div ref={containerRef} className="max-w-[70ch] mx-auto w-full text-lg">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({node, ...props}) => <h1 className="gsap-reveal-text text-4xl md:text-5xl font-semibold mt-12 mb-6 tracking-tight text-foreground" {...props} />,
          h2: ({node, ...props}) => <h2 className="gsap-reveal-text text-2xl md:text-3xl font-semibold mt-16 mb-4 tracking-tight text-foreground" {...props} />,
          h3: ({node, ...props}) => <h3 className="gsap-reveal-text text-xl md:text-2xl font-semibold mt-8 mb-4 tracking-tight text-foreground" {...props} />,
          p: ({node, ...props}) => {
            // Let the image handle its own layout if it's the only child
            // Note: In react-markdown v9, node types might differ, but this is a rough heuristic
            // Actually, we can just apply styling to paragraphs
            return <p className="gsap-reveal-text text-foreground/80 leading-relaxed mb-6" {...props} />
          },
          ul: ({node, ...props}) => <ul className="gsap-reveal-text space-y-2 mb-6 ml-6 list-disc text-foreground/80 marker:text-foreground/40" {...props} />,
          ol: ({node, ...props}) => <ol className="gsap-reveal-text space-y-2 mb-6 ml-6 list-decimal text-foreground/80 marker:text-foreground/40" {...props} />,
          li: ({node, ...props}) => <li className="pl-2" {...props} />,
          hr: ({node, ...props}) => <hr className="gsap-reveal-text border-t border-border/40 my-16" {...props} />,
          strong: ({node, ...props}) => <strong className="font-semibold text-foreground" {...props} />,
          a: ({node, ...props}) => <a className="text-foreground border-b border-foreground/30 hover:border-foreground transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
          img: ({src, alt, ...props}) => {
            return (
              <span className="gsap-reveal-image block my-16 group relative max-w-full">
                <span className="absolute -inset-2 bg-gradient-to-tr from-foreground/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl block"></span>
                <span className="relative rounded-xl overflow-hidden border border-border/30 bg-background/50 shadow-2xl p-4 md:p-8 backdrop-blur-sm flex justify-center w-full">
                  <img src={src} alt={alt} className="max-w-full h-auto object-contain dark:invert mix-blend-normal" loading="lazy" />
                </span>
                {alt && <span className="block text-center text-sm text-foreground/50 mt-4 italic">{alt}</span>}
              </span>
            );
          },
          blockquote: ({node, ...props}) => (
            <blockquote className="gsap-reveal-text border-l-2 border-foreground/30 pl-6 py-1 my-8 text-foreground/70 italic text-xl" {...props} />
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
