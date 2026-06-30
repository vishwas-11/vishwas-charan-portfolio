import SplitText from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "lucide-react";
import { Polaroid } from "@/components/ui/Polaroid";
import { InteractiveGallery } from "@/components/ui/interactive-gallery";
import RotatingText from "@/components/ui/RotatingText";
import ScrollFloat from "@/components/ui/ScrollFloat";
import fs from "fs";
import path from "path";

function getImagePath(baseName: string) {
  const extensions = ['.png', '.jpg', '.jpeg', '.webp', '.JPG', '.PNG', '.JPEG'];
  const baseDir = path.join(process.cwd(), 'public', 'images', 'about');

  try {
    for (const ext of extensions) {
      const filePath = path.join(baseDir, baseName + ext);
      if (fs.existsSync(filePath)) {
        return `/images/about/${baseName}${ext}`;
      }
    }
  } catch (e) {
    // Ignore fs errors at runtime if deployed
  }
  return `/images/about/${baseName}.png`; // fallback
}

export const metadata = {
  title: "About | Vishwas - Portfolio",
  description: "Learn more about Vishwas, a full-stack developer and AI engineer.",
};

export default function AboutPage() {
  const galleryItems = [
    {
      id: "img1",
      src: getImagePath("music1"),
      alt: "Live performance on stage",
      caption: "Center Stage",
      rotation: "-rotate-3",
      stackedRotation: "-6",
      scatteredClassName: "md:-mt-12 md:ml-4",
      annotation: {
        text: "feeling the crowd",
        className: "-top-6 -left-10 text-xl -rotate-12 hidden md:block"
      }
    },
    {
      id: "img2",
      src: getImagePath("music2"),
      alt: "Live show encore",
      caption: "The Encore",
      rotation: "rotate-2",
      stackedRotation: "4",
      scatteredClassName: "md:mt-16",
      annotation: {
        text: "one more song!",
        className: "-bottom-10 right-0 text-xl rotate-6 hidden md:block"
      }
    },
    {
      id: "img3",
      src: getImagePath("music3"),
      alt: "Lead vocals",
      caption: "Frontman",
      rotation: "-rotate-2",
      stackedRotation: "-4",
      scatteredClassName: "md:-mt-4 md:-ml-8",
      annotation: {
        text: "owning the mic",
        className: "-top-10 right-4 text-xl rotate-12 hidden md:block"
      }
    },
    {
      id: "img4",
      src: getImagePath("music4"),
      alt: "Guitar solos",
      caption: "Loud & Proud",
      rotation: "rotate-[4deg]",
      stackedRotation: "2",
      scatteredClassName: "md:mt-8 md:ml-6",
      annotation: {
        text: "shaking the floor",
        className: "-bottom-10 -left-6 text-xl -rotate-6 hidden md:block"
      }
    },
    {
      id: "img5",
      src: getImagePath("music5"),
      alt: "Live show",
      caption: "The Energy",
      rotation: "-rotate-3",
      stackedRotation: "-8",
      scatteredClassName: "md:mt-24",
      annotation: {
        text: "electric!",
        className: "-bottom-12 right-0 text-2xl rotate-6 hidden md:block"
      }
    },
    {
      id: "img6",
      src: "/images/about/music-six.jpg",
      alt: "Amplifiers and crowd",
      caption: "Heavy Riffs",
      rotation: "rotate-2",
      stackedRotation: "6",
      scatteredClassName: "md:-mt-8 md:-ml-4",
      annotation: {
        text: "max volume",
        className: "-bottom-8 -right-6 text-xl rotate-12 hidden md:block"
      }
    }
  ];

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

          <div className="flex flex-col gap-6 max-w-3xl mt-4 text-foreground/80 text-base sm:text-lg leading-relaxed font-light">
            <Reveal delay={0.2} overflow="visible">
              <p>
                Hi, I'm Vishwas, <RotatingText
                  texts={['a Full-Stack Developer', 'an AI Engineer', 'a Rock Musician']}
                  mainClassName="inline-flex font-medium text-foreground overflow-hidden"
                  staggerFrom="first"
                  initial={{ y: "20%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-20%", opacity: 0 }}
                  staggerDuration={0.05}
                  splitBy="words"
                  splitLevelClassName="overflow-visible"
                  transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
                  rotationInterval={4000}
                /> who enjoys turning ambitious ideas into products people can actually use.
              </p>
            </Reveal>

            <Reveal delay={0.3} overflow="visible">
              <p>
                My work revolves around building scalable web applications with <span className="font-medium text-foreground">Next.js</span>, <span className="font-medium text-foreground">TypeScript</span>, <span className="font-medium text-foreground">Node.js</span>, and <span className="font-medium text-foreground">Python</span>, while specializing in backend engineering, APIs, and AI-powered systems. I work extensively with <span className="font-medium text-foreground">LangChain</span> and <span className="font-medium text-foreground">LangGraph</span> to develop RAG pipelines, multi-agent architectures, and intelligent workflows that go beyond simple chatbot integrations.
              </p>
            </Reveal>

            <Reveal delay={0.4} overflow="visible">
              <p>
                I also enjoy the engineering behind the scenes designing backend services, containerizing applications with <span className="font-medium text-foreground">Docker</span>, and deploying production-ready systems on <span className="font-medium text-foreground">AWS</span>.
              </p>
            </Reveal>

            <Reveal delay={0.5} overflow="visible">
              <p>
                One achievement I'm particularly proud of is publishing a <strong className="font-medium text-foreground">Scopus-indexed IEEE research paper</strong>:{" "}
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
            </Reveal>

            <SplitText splitType="words" delay={30} threshold={0.1} className="font-medium text-foreground">
              For me, great software isn't just about writing code, it's about solving meaningful problems with thoughtful engineering.
            </SplitText>
          </div>
        </div>
      </section>

      {/* Beyond the Code Section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-24 md:px-8 space-y-16 relative">
        <div className="flex flex-col items-center text-center space-y-4">
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
            containerClassName="font-heading text-3xl md:text-5xl font-medium tracking-tight text-foreground"
          >
            Beyond the Code
          </ScrollFloat>
          <SplitText
            className="text-foreground/80 text-lg sm:text-xl max-w-2xl font-light leading-relaxed"
            splitType="words"
            delay={20}
            threshold={0.1}
          >
            When I'm not writing algorithms or architecting backend systems, you'll probably find me with a guitar in my hands. I'm a rock musician at heart, whether it's performing live on stage or laying down tracks in the studio, music is my ultimate creative outlet.
          </SplitText>
        </div>

        <InteractiveGallery items={galleryItems} />

        <div className="max-w-2xl mx-auto pt-16 md:pt-24 space-y-8">
          <Reveal delay={0.2} overflow="visible">
            <p className="font-heading text-2xl md:text-3xl text-foreground italic">
              Hey folks, welcome to the other side of my world. <span className="not-italic"></span>
            </p>
          </Reveal>

          <div className="space-y-6 text-foreground/80 text-lg sm:text-xl leading-[1.8] font-light">
            <SplitText splitType="words" delay={20} threshold={0.1} className="w-full">
              When I'm not building AI agents or architecting backend systems, you'll probably find me on a stage with a microphone in my hand.
            </SplitText>
            <SplitText splitType="words" delay={20} threshold={0.1} className="w-full">
              Music has been part of my life for more than 10 years, and for the last five, I've had the privilege of leading <strong className="font-medium text-foreground">Euphony</strong> as its frontman. It's been an amazing journey filled with late-night rehearsals, unforgettable performances, and countless memories with an incredibly talented group of musicians.
            </SplitText>
            <SplitText splitType="words" delay={20} threshold={0.1} className="w-full">
              Over the years, we've represented our college at festivals across the country, performing in Battle of the Bands competitions at <strong className="font-medium text-foreground">IIT Roorkee (Thomso)</strong>, <strong className="font-medium text-foreground">IIT Kanpur (Antaragni)</strong>, KIET Ghaziabad, and many more. Every stage has taught me something new, not just about music, but about leadership, teamwork, and performing under pressure.
            </SplitText>
            <SplitText splitType="words" delay={20} threshold={0.1} className="w-full">
              A couple of moments I'll always be proud of are winning <strong className="font-medium text-foreground">Western Solo Vocalist</strong> at <strong className="font-medium text-foreground">Thomso '24 (IIT Roorkee)</strong> and <strong className="font-medium text-foreground">Antaragni '25 (IIT Kanpur)</strong>. Those victories weren't just awards, they were years of practice, persistence, and passion coming together.
            </SplitText>
          </div>

          <Reveal delay={0.7} overflow="visible">
            <div className="pl-6 border-l-2 border-red-500/50 mt-10 py-2">
              <p className="font-heading italic text-foreground text-xl sm:text-2xl leading-relaxed">
                Whether I'm writing code or performing on stage, the goal is surprisingly similar: create something that leaves people with an experience they'll remember.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
