import { Reveal } from "@/components/ui/Reveal";
import { 
  Terminal, 
  Database, 
  Server, 
  Code2, 
  Layers, 
  Cpu, 
  Box, 
  Wrench 
} from "lucide-react";

const stackItems = [
  { id: "ts", icon: Code2, color: "#3178C6" },
  { id: "next", icon: Layers, color: "#ffffff" },
  { id: "js", icon: Terminal, color: "#F7DF1E" },
  { id: "db", icon: Database, color: "#336791" },
  { id: "backend", icon: Server, color: "#000000" },
  { id: "docker", icon: Box, color: "#2496ED" },
  { id: "infra", icon: Cpu, color: "#844FBA" },
  { id: "tools", icon: Wrench, color: "#FF4785" },
];

export default function MyStack() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12 md:px-8 space-y-10">
      <Reveal delay={0.1}>
        <h2 className="text-2xl font-medium tracking-tight">My stack</h2>
      </Reveal>
      
      <ul className="flex flex-wrap items-center gap-4 lg:justify-between">
        {stackItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <Reveal delay={0.2 + index * 0.05} direction="up">
                <div 
                  className="group flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-accent transition-all hover:-translate-y-1 hover:shadow-lg"
                  style={{ "--brand-color": item.color } as React.CSSProperties}
                >
                  <Icon 
                    className="h-10 w-10 text-muted-foreground transition-colors group-hover:text-[var(--brand-color)]" 
                    strokeWidth={1.5}
                  />
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
