import SplitText from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "lucide-react";
import { Polaroid } from "@/components/ui/Polaroid";

export const metadata = {
  title: "About | Vishwas - Portfolio",
  description: "Learn more about Vishwas, a full-stack developer and AI engineer.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col pb-20">
      <section className="w-full max-w-4xl mx-auto px-4 py-32 md:px-8 space-y-10 relative min-h-[60vh]">
        {/* Subtle ambient background glow */}
        <div className="absolute top-20 left-10 -z-10 h-64 w-64 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

        <div className="flex flex-col gap-8">
          <SplitText
            text="About Me"
            className="font-heading text-4xl md:text-6xl font-medium tracking-tight text-foreground"
            delay={50}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 30, rotationX: -90 }}
            to={{ opacity: 1, y: 0, rotationX: 0 }}
            threshold={0.1}
            tag="h1"
            textAlign="left"
          />

          <Reveal delay={0.2}>
            <div className="flex flex-col gap-6 max-w-3xl mt-4 text-foreground/80 text-base sm:text-lg leading-relaxed font-light">
              <p>
                Hi, I'm Vishwas, a <span className="font-medium text-foreground">Full-Stack Developer</span> and <span className="font-medium text-foreground">AI Engineer</span> who enjoys turning ambitious ideas into products people can actually use.
              </p>
              
              <p>
                My work revolves around building scalable web applications with <span className="font-medium text-foreground">Next.js</span>, <span className="font-medium text-foreground">TypeScript</span>, <span className="font-medium text-foreground">Node.js</span>, and <span className="font-medium text-foreground">Python</span>, while specializing in backend engineering, APIs, and AI-powered systems. I work extensively with <span className="font-medium text-foreground">LangChain</span> and <span className="font-medium text-foreground">LangGraph</span> to develop RAG pipelines, multi-agent architectures, and intelligent workflows that go beyond simple chatbot integrations.
              </p>
              
              <p>
                I also enjoy the engineering behind the scenes designing backend services, containerizing applications with <span className="font-medium text-foreground">Docker</span>, and deploying production-ready systems on <span className="font-medium text-foreground">AWS</span>.
              </p>
              
              <p>
                One achievement I'm particularly proud of is publishing a Scopus-indexed IEEE research paper:{" "}
                <a 
                  href="https://ieeexplore.ieee.org/abstract/document/11468597"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-heading italic font-medium text-amber-300/90 hover:text-amber-300 transition-colors border-b border-amber-300/30 hover:border-amber-300"
                >
                  "Trusture: A Blockchain-Based Decentralized Framework for Secure, Transparent, and Auditable NGO Transactions."
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>{" "}
                (You can also check it out on Google Scholar). Through this research, I explored how blockchain can be used to build more transparent and auditable systems for NGOs, reinforcing my passion for creating technology that delivers measurable impact.
              </p>
              
              <p className="font-medium text-foreground">
                For me, great software isn't just about writing code, it's about solving meaningful problems with thoughtful engineering.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Beyond the Code Section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-24 md:px-8 space-y-16 relative">
        <Reveal>
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="font-heading text-3xl md:text-5xl font-medium tracking-tight text-foreground">
              Beyond the Code
            </h2>
            <p className="text-foreground/80 text-lg sm:text-xl max-w-2xl font-light leading-relaxed">
              When I'm not writing algorithms or architecting backend systems, you'll probably find me with a guitar in my hands. I'm a rock musician at heart—whether it's performing live on stage or laying down tracks in the studio, music is my ultimate creative outlet.
            </p>
          </div>
        </Reveal>

        {/* Polaroids Container */}
        <div className="relative w-full h-[800px] md:h-[600px] flex items-center justify-center mt-12 py-10 overflow-hidden md:overflow-visible">
          
          {/* Polaroid 1 */}
          <div className="absolute z-20 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-[10%] top-[5%] md:top-[5%] w-64 md:w-72">
            <Polaroid 
              src="/images/about/music1.png" 
              alt="Live performance on stage"
              caption="Live on Stage"
              rotation="-rotate-6"
            />
            {/* Hand-written annotation */}
            <div className="absolute -bottom-6 -right-16 font-heading italic text-red-500/90 text-2xl md:text-3xl rotate-12 hidden md:block">
              built it. won it.
            </div>
          </div>

          {/* Polaroid 2 */}
          <div className="absolute z-30 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-[35%] top-[35%] md:top-[15%] w-72 md:w-80">
            <Polaroid 
              src="/images/about/music2.png" 
              alt="Studio sessions"
              caption="Studio Sessions"
              rotation="rotate-2"
            />
            <div className="absolute -top-10 -right-8 font-heading italic text-red-500/90 text-2xl md:text-3xl -rotate-6 hidden md:block">
              always in the room
            </div>
          </div>

          {/* Polaroid 3 */}
          <div className="absolute z-10 left-1/2 -translate-x-1/2 md:translate-x-0 md:right-[10%] md:left-auto top-[65%] md:top-[30%] w-56 md:w-64">
            <Polaroid 
              src="/images/about/music3.png" 
              alt="Vintage microphone"
              caption="Vocals"
              rotation="rotate-[8deg]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
