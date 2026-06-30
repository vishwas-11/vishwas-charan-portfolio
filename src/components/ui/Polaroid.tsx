import Image from "next/image";
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
      {/* Skeuomorphic Pin */}
      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-md border border-red-800 z-20 flex items-center justify-center">
         <div className="w-2 h-2 rounded-full bg-red-900/40 translate-y-0.5" />
         <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-white/40" />
      </div>
      <div className="relative w-full aspect-[4/5] bg-zinc-200 overflow-hidden">
        {/* Inner shadow overlay over the image to simulate recessed photo paper */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_2px_8px_rgba(0,0,0,0.15)] ring-1 ring-inset ring-black/5 z-10 mix-blend-overlay"></div>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          sizes="(max-width: 768px) 100vw, 400px"
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
