"use client";

import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export default function Resume() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12 md:px-8 space-y-16">
      {/* Work Experience */}
      <div className="flex min-h-0 flex-col gap-y-3">
        <Reveal delay={0.1}>
          <h2 className="text-xl font-bold">Work Experience</h2>
        </Reveal>
        
        <Reveal delay={0.2}>
          <a className="block cursor-pointer" href="https://www.excellencetechnologies.in/" target="_blank" rel="noopener noreferrer">
            <div className="rounded-lg bg-card text-card-foreground flex p-3 hover:bg-muted/50 transition-colors">
              <div className="flex-none">
                <span className="relative flex shrink-0 overflow-hidden rounded-full border size-12 m-auto bg-white dark:bg-white">
                  <img src="/images/experience/excellence.jpeg" alt="Excellence Technologies Logo" className="object-contain h-full w-full p-1" />
                </span>
              </div>
              <div className="flex-grow ml-4 items-center flex-col group">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
                      Excellence Technologies Pvt. Ltd.
                      <span className="inline-flex gap-x-1"></span>
                      <ChevronRight className="size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100 rotate-0 ml-1" />
                    </h3>
                    <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right whitespace-nowrap">Mar 2026 - Present</div>
                  </div>
                  <div className="font-sans text-xs mt-1">AI Engineer & Full Stack Developer</div>
                </div>
                <div className="mt-2 text-xs sm:text-sm text-muted-foreground">
                  Spearheaded full-stack development initiatives leveraging Python and FastAPI to construct high-performance APIs. Drove on-site cross-functional collaboration to deliver robust, scalable AI-integrated web applications.
                </div>
              </div>
            </div>
          </a>
        </Reveal>

        <Reveal delay={0.25}>
          <a className="block cursor-pointer" href="https://www.attechglobal.com" target="_blank" rel="noopener noreferrer">
            <div className="rounded-lg bg-card text-card-foreground flex p-3 hover:bg-muted/50 transition-colors mt-2">
              <div className="flex-none">
                <span className="relative flex shrink-0 overflow-hidden rounded-full border size-12 m-auto bg-white dark:bg-white">
                  <img src="/images/experience/attech.jpg" alt="AT Tech Global Logo" className="object-contain h-full w-full p-1" />
                </span>
              </div>
              <div className="flex-grow ml-4 items-center flex-col group">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
                      AT Tech Global
                      <span className="inline-flex gap-x-1"></span>
                      <ChevronRight className="size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100 rotate-0 ml-1" />
                    </h3>
                    <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right whitespace-nowrap">Nov 2025 - Feb 2026</div>
                  </div>
                  <div className="font-sans text-xs mt-1">Full-Stack developer</div>
                </div>
                <div className="mt-2 text-xs sm:text-sm text-muted-foreground">
                  Remote Internship. Engineered scalable architectures and integrated real-time capabilities leveraging Node.js, Express.js, MongoDB, and WebRTC.
                </div>
              </div>
            </div>
          </a>
        </Reveal>

        <Reveal delay={0.3}>
          <a className="block cursor-pointer" href="https://zidio.in/" target="_blank" rel="noopener noreferrer">
            <div className="rounded-lg bg-card text-card-foreground flex p-3 hover:bg-muted/50 transition-colors mt-2">
              <div className="flex-none">
                <span className="relative flex shrink-0 overflow-hidden rounded-full border size-12 m-auto bg-white dark:bg-white">
                  <img src="/images/experience/zidio.jpeg" alt="Zidio Development Logo" className="object-contain h-full w-full p-1" />
                </span>
              </div>
              <div className="flex-grow ml-4 items-center flex-col group">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
                      Zidio Development
                      <span className="inline-flex gap-x-1"></span>
                      <ChevronRight className="size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100 rotate-0 ml-1" />
                    </h3>
                    <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right whitespace-nowrap">Jul 2025 - Oct 2025</div>
                  </div>
                  <div className="font-sans text-xs mt-1">Full Stack Developer</div>
                </div>
                <div className="mt-2 text-xs sm:text-sm text-muted-foreground">
                  Architected and deployed robust server-side solutions using Node.js. Collaborated in a remote agile environment to optimize backend performance and streamline data workflows.
                </div>
              </div>
            </div>
          </a>
        </Reveal>
      </div>

      {/* Education */}
      <div className="flex min-h-0 flex-col gap-y-3">
        <Reveal delay={0.5}>
          <h2 className="text-xl font-bold">Education</h2>
        </Reveal>
        
        <Reveal delay={0.7}>
          <a className="block cursor-pointer" href="https://www.akgec.ac.in" target="_blank" rel="noopener noreferrer">
            <div className="rounded-lg bg-card text-card-foreground flex p-3 hover:bg-muted/50 transition-colors mt-2">
              <div className="flex-none">
                <span className="relative flex shrink-0 overflow-hidden rounded-full border size-12 m-auto bg-white dark:bg-white">
                  <img src="/images/education/akgec.png" alt="AKGEC Logo" className="object-contain h-full w-full p-1" />
                </span>
              </div>
              <div className="flex-grow ml-4 items-center flex-col group">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
                      Ajay Kumar Garg Engineering College
                      <ChevronRight className="size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100 rotate-0 ml-1" />
                    </h3>
                    <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right whitespace-nowrap">2022 - 2026</div>
                  </div>
                  <div className="font-sans text-xs mt-1">Bachelor's of Technology (Information Technology)</div>
                </div>
              </div>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
