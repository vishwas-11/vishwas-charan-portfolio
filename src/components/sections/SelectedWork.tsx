import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const projects = [
  {
    id: "echo-ui",
    title: "Echo UI v3",
    description: "Component library & design system",
    image: "/images/projects/echo-ui/cover.svg",
    link: "#"
  },
  {
    id: "justos",
    title: "JustOS",
    description: "Productivity OS for Creators",
    image: "/images/projects/justos/cover.svg",
    link: "#"
  },
  {
    id: "happy-stats",
    title: "Happy Stats",
    description: "Lightweight analytics dashboard",
    image: "/images/projects/happy-stats/cover.svg",
    link: "#"
  },
  {
    id: "cactus-plant",
    title: "Cactus Plant",
    description: "Realtime collaboration framework",
    image: "/images/projects/cactus-plant/cover.svg",
    link: "#"
  }
];

export default function SelectedWork() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12 md:px-8 space-y-10">
      <Reveal delay={0.1}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium tracking-tight">Selected work</h2>
          <Link href="/projects" className="link-underline text-lg">
            View all
          </Link>
        </div>
      </Reveal>

      <ul className="grid gap-x-6 gap-y-12 md:grid-cols-2">
        {projects.map((project, index) => (
          <li key={project.id}>
            <Reveal delay={0.2 + index * 0.1} direction="up">
              <Link href={project.link} className="group block space-y-6">
                <div className="premium-card flex h-64 md:h-80 items-center justify-center overflow-hidden p-0">
                  <div className="relative w-full h-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="space-y-2 px-1">
                  <h3 className="text-xl font-medium">{project.title}</h3>
                  <p className="text-muted-foreground text-lg">{project.description}</p>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
