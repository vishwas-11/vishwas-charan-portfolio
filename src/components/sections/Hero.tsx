import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export default function Hero() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-24 md:px-8 space-y-10">
      <Reveal delay={0.1}>
        <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-border shadow-md">
          <Image
            src="/images/home/avatar.jpg"
            alt="Vishwas's avatar"
            fill
            sizes="(max-width: 768px) 100vw, 96px"
            className="object-cover object-[50%_10%] scale-[1.15] transition-transform duration-500 hover:scale-[1.25]"
            priority
          />
        </div>
      </Reveal>
      
      <div className="flex flex-col gap-5">
        <Reveal delay={0.2}>
          <h1 className="text-4xl tracking-tight md:text-5xl font-medium">Hi, I'm Vishwas</h1>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="text-muted-foreground text-xl leading-relaxed max-w-xl">
            Full-stack developer who loves building things from idea to launch.
          </p>
        </Reveal>
      </div>
      
      <Reveal delay={0.4}>
        <div>
          <a className="link-underline text-lg font-medium inline-block" href="mailto:vishwascharan11@gmail.com">
            vishwascharan11@gmail.com 
          </a>
        </div>
      </Reveal>
    </section>
  );
}
