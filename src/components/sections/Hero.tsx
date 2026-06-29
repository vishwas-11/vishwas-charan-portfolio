import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import BlurText from "@/components/ui/BlurText";
import { ArrowRight, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-24 md:px-8 space-y-10 relative">
      {/* Subtle ambient background glow */}
      <div className="absolute top-0 left-10 -z-10 h-64 w-64 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      
      <div className="flex flex-col gap-8">
        <Reveal delay={0.1}>
          <div className="flex items-center gap-5">
            <div className="relative h-20 w-20 md:h-24 md:w-24 overflow-hidden rounded-full border border-border shadow-sm ring-4 ring-background">
              <Image
                src="/images/home/avatar.jpg"
                alt="Vishwas's avatar"
                fill
                sizes="(max-width: 768px) 80px, 96px"
                className="object-cover object-[50%_10%] scale-[1.15] transition-transform duration-500 hover:scale-[1.25]"
                priority
              />
            </div>
            
            {/* Professional Status Badge */}
            <div className="inline-flex items-center rounded-full border border-border bg-accent/50 px-4 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground hover:bg-accent/80 cursor-default">
              AI Engineer & Full-Stack Developer
            </div>
          </div>
        </Reveal>
        
        <div className="flex flex-col gap-6 max-w-2xl">
          <SplitText
            text="Hi, I'm Vishwas."
            className="text-4xl tracking-tight md:text-5xl lg:text-6xl font-semibold text-foreground"
            delay={50}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 30, rotationX: -90 }}
            to={{ opacity: 1, y: 0, rotationX: 0 }}
            threshold={0.1}
            tag="h1"
          />
          
          <BlurText
            text="I build smart, scalable web applications by combining modern AI tools with solid full-stack engineering. I love taking complex problems and turning them into simple, elegant digital experiences."
            className="text-muted-foreground text-lg sm:text-xl leading-relaxed"
            delay={30}
            animateBy="words"
            direction="top"
          />
        </div>
        
        <Reveal delay={0.4}>
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a 
              href="#work" 
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-sm"
            >
              Explore My Work
              <ArrowRight className="h-4 w-4" />
            </a>
            
            <a 
              href="mailto:vishwascharan11@gmail.com" 
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-medium text-foreground transition-all hover:bg-accent hover:text-accent-foreground hover:scale-105 active:scale-95 shadow-sm"
            >
              <Mail className="h-4 w-4" />
              Get in Touch
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
