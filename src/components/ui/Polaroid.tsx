import { cn } from "@/lib/utils";

interface PolaroidProps {
  src: string;
  alt: string;
  caption?: string;
  rotation?: string;
  className?: string;
}

export function Polaroid({ src, alt, caption, rotation = "-rotate-2", className }: PolaroidProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col bg-[#fcfbf8] p-3 pb-10 md:p-4 md:pb-14 shadow-xl hover:shadow-2xl transition-all duration-300 border border-zinc-200",
        rotation,
        className
      )}
    >
      {/* Authentic Washi Tape */}
      <svg 
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 z-20 -rotate-2 opacity-90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]" 
        viewBox="0 0 100 30" 
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="tape-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.05)" />
          </linearGradient>
          <filter id="paper-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.1 0" in="noise" result="coloredNoise" />
            <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" />
          </filter>
        </defs>
        <path d="M 4 0 L 96 0 Q 100 5 97 10 T 99 20 T 95 30 L 5 30 Q 0 25 3 20 T 1 10 T 4 0 Z" fill="#e8e5dc" filter="url(#paper-texture)" />
        <path d="M 4 0 L 96 0 Q 100 5 97 10 T 99 20 T 95 30 L 5 30 Q 0 25 3 20 T 1 10 T 4 0 Z" fill="url(#tape-gradient)" />
      </svg>
      <div className="relative w-full aspect-[4/5] bg-zinc-200 overflow-hidden">
        {/* Inner shadow overlay over the image to simulate recessed photo paper */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_2px_8px_rgba(0,0,0,0.15)] ring-1 ring-inset ring-black/5 z-10 mix-blend-overlay"></div>
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>
      {caption && (
        <div className="mt-4 md:mt-5 text-center font-heading text-black/80 font-medium tracking-wide text-lg md:text-xl">
          {caption}
        </div>
      )}
    </div>
  );
}
