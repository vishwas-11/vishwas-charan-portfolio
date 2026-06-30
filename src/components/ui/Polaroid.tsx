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
        "group relative flex flex-col bg-[#f8f8f8] p-3 pb-8 md:p-4 md:pb-12 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:z-50 border border-black/5 dark:bg-[#e0e0e0]",
        rotation,
        className
      )}
    >
      <div className="relative w-full aspect-[4/5] bg-zinc-200 overflow-hidden shadow-inner">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
      {caption && (
        <div className="mt-3 md:mt-4 text-center font-heading text-black/80 font-medium tracking-wide text-lg md:text-xl">
          {caption}
        </div>
      )}
    </div>
  );
}
