import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export default function Hero() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-24 md:px-8 space-y-10">
      <Reveal delay={0.1}>
        <div className="relative h-20 w-20 overflow-hidden rounded-full border border-border">
          <Image
            src="/images/home/avatar.svg"
            alt="John's avatar"
            fill
            className="object-cover"
            priority
          />
        </div>
      </Reveal>
      
      <div className="flex flex-col gap-5">
        <Reveal delay={0.2}>
          <h1 className="text-4xl tracking-tight md:text-5xl font-medium">Hi, I'm John</h1>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="text-muted-foreground text-xl leading-relaxed max-w-xl">
            Full-stack developer who loves building things from idea to launch.
          </p>
        </Reveal>
      </div>
      
      <Reveal delay={0.4}>
        <div>
          <a className="link-underline text-lg font-medium inline-block" href="mailto:hi@john.me">
            hi@john.me
          </a>
        </div>
      </Reveal>
    </section>
  );
}
