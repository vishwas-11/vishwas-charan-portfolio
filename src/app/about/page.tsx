import SplitText from "@/components/ui/SplitText";
import BlurText from "@/components/ui/BlurText";

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

          <div className="flex flex-col gap-6 max-w-3xl mt-4">
            <BlurText
              text="I am a full-stack developer and AI engineer with a deep passion for building intelligent applications and robust backend systems. My work bridges the gap between complex engineering and elegant, user-centric design. Whether I'm wrangling sophisticated GenAI agents, architecting scalable infrastructure in Python and Node.js, or refining front-end experiences, my goal is always to write clean code that delivers real impact."
              className="text-foreground/90 text-lg sm:text-xl leading-relaxed font-light"
              delay={20}
              animateBy="words"
              direction="top"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
