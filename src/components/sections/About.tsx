import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export default function About() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12 md:px-8 space-y-16">
      <div className="space-y-10 max-w-3xl">
        <Reveal delay={0.1}>
          <h2 className="text-2xl font-medium tracking-tight">About</h2>
        </Reveal>
        <div className="text-muted-foreground space-y-8 text-lg">
          <Reveal delay={0.2}>
            <p>
              I started coding out of curiosity — building small browser games and landing pages — and over time grew into developing complete products that balance design and engineering.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p>
              My stack includes TypeScript, React, Next.js, Node, and PostgreSQL, but I love exploring new technologies that make the web better.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <p>
              Outside of coding, I enjoy writing, contributing to open source, and teaching others what I've learned.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="relative pt-10 w-full overflow-visible">
        <ul className="flex flex-row justify-center gap-4 sm:gap-8">
          <Reveal delay={0.3} direction="up" className="w-1/3 max-w-[250px]">
            <li className="relative w-full aspect-square">
              <div className="relative w-full h-full overflow-hidden rounded-3xl rotate-[4.6deg] border border-border/50 shadow-xl transition-transform hover:rotate-0 hover:scale-105 duration-500">
                <Image
                  src="/images/about/coding.svg"
                  alt="Person coding on laptop"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-background absolute flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-border shadow-md -top-2 -right-2 sm:-top-4 sm:-right-4 z-10">
                <span className="text-xl sm:text-2xl">💻</span>
              </div>
            </li>
          </Reveal>
          
          <Reveal delay={0.4} direction="up" className="w-1/3 max-w-[250px]">
            <li className="relative w-full aspect-square">
              <div className="relative w-full h-full overflow-hidden rounded-3xl -rotate-[4deg] border border-border/50 shadow-xl transition-transform hover:rotate-0 hover:scale-105 duration-500">
                <Image
                  src="/images/about/bridge.svg"
                  alt="Golden Gate Bridge"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-background absolute flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-border shadow-md bottom-0 translate-y-1/2 -right-2 sm:-right-4 z-10">
                <span className="text-xl sm:text-2xl">🏔️</span>
              </div>
            </li>
          </Reveal>

          <Reveal delay={0.5} direction="up" className="w-1/3 max-w-[250px]">
            <li className="relative w-full aspect-square">
              <div className="relative w-full h-full overflow-hidden rounded-3xl rotate-[3.6deg] border border-border/50 shadow-xl transition-transform hover:rotate-0 hover:scale-105 duration-500">
                <Image
                  src="/images/about/dog.svg"
                  alt="Dog"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-background absolute flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-border shadow-md -top-2 left-4 sm:-top-4 sm:left-8 z-10">
                <span className="text-xl sm:text-2xl">🐶</span>
              </div>
            </li>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
