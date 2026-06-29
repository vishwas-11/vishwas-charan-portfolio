"use client";

import { Reveal } from "@/components/ui/Reveal";

const stackItems = [
  { name: "TypeScript", icon: "typescript", color: "#3178C6" },
  { name: "Node.js", icon: "nodedotjs", color: "#5FA04E" },
  { name: "MongoDB", icon: "mongodb", color: "#47A248" },
  { name: "Python", icon: "python", color: "#3776AB" },
  { name: "LangChain", icon: "langchain", color: "#1C3C3C", invert: true },
  { name: "FastAPI", icon: "fastapi", color: "#009688" },
  { name: "Docker", icon: "docker", color: "#2496ED" },
  { name: "Git", icon: "git", color: "#F05032" },
  { name: "Next.js", icon: "nextdotjs", color: "#000000", invert: true },
  { name: "Jira", icon: "jira", color: "#0052CC" },
];

export default function MyStack() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12 md:px-8 space-y-10">
      <Reveal delay={0.1}>
        <h2 className="text-2xl font-medium tracking-tight">My stack</h2>
      </Reveal>
      
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {stackItems.map((item, index) => (
          <li key={item.name}>
            <Reveal delay={0.2 + index * 0.05} direction="up" overflow="visible">
              <div 
                className="group relative flex h-28 flex-col items-center justify-center gap-3 rounded-2xl border border-border/50 bg-accent/50 p-4 transition-all duration-500 hover:-translate-y-2 hover:border-border hover:bg-accent hover:shadow-[0_0_1.5rem_var(--brand-color)]"
                style={{ "--brand-color": item.invert ? "rgba(150, 150, 150, 0.2)" : `${item.color}40` } as React.CSSProperties}
              >
                <img 
                  src={`https://cdn.simpleicons.org/${item.icon}/${item.color.replace('#', '')}`}
                  alt={item.name}
                  className={`h-10 w-10 transition-all duration-500 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 ${item.invert ? "dark:invert" : ""}`}
                />
                <span className="text-xs font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                  {item.name}
                </span>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
