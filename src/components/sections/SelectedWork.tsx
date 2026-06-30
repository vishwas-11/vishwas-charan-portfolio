import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const projects = [
  {
    id: "multi-modal-ai",
    title: "Multi-Modal-AI",
    role: "AI Engineer and Full-Stack Developer",
    description: "A production-grade web application for analyzing images, video, audio, and documents using state-of-the-art AI models. Built with Next.js, Express, TypeScript, and powered by Google Gemini and Groq Whisper.",
    skills: ["Gemini", "Whisper API", "Cloudinary", "Node.js", "FFmpeg"],
    image: "/images/projects/multi-modal.jpg",
    link: "https://multi-modal-ai-seven.vercel.app"
  },
  {
    id: "ai-image-studio",
    title: "AI Image Studio",
    role: "AI Engineer | Full-Stack Developer",
    description: "A full-featured AI Image Generation & Editing Studio built with FastAPI and Next.js 14. Generate images from text prompts using DALL-E 3, edit with an inpainting canvas, remove backgrounds, and manage a gallery.",
    skills: ["FastAPI", "Fabric.js", "DALL-E 3", "PostgreSQL", "Next.js"],
    image: "/images/projects/ai-image-studio.jpg",
    link: "https://image-gen-editing-studio.vercel.app"
  },
  {
    id: "recruitflow",
    title: "RecruitFlow-Autonomous-HR-System",
    role: "AI Developer | Full-Stack Developer",
    description: "An AI-assisted hiring workflow platform with a Next.js frontend and FastAPI backend. Supports role-based authentication, chat-driven workflows, interview scheduling, and employee record lookup.",
    skills: ["LangChain", "Next.js", "FastAPI", "OpenAI API", "MongoDB"],
    image: "/images/projects/recruitflow.jpg",
    link: "https://recruit-flow-autonomous-hr-system.vercel.app"
  },
  {
    id: "fluxfit",
    title: "FluxFit",
    role: "Full-Stack Developer and AI Engineer",
    description: "A fitness, diet, and workout plan RAG-based recommendation platform that provides tailored suggestions based on user input, leveraging the Gemini API and YouTube API for video suggestions.",
    skills: ["Node.js", "ExpressJS", "MongoDB", "React", "Generative AI"],
    image: "/images/projects/fluxfit.png",
    link: "http://65.0.155.225/"
  }
];

export default function SelectedWork() {
  return (
    <section id="work" className="w-full max-w-4xl mx-auto px-4 py-12 md:px-8 space-y-10">
      <Reveal delay={0.1}>
        <h2 className="text-3xl font-heading font-medium tracking-tight">Selected work</h2>
      </Reveal>

      <ul className="grid gap-x-6 gap-y-12 md:grid-cols-2">
        {projects.map((project, index) => (
          <li key={project.id}>
            <Reveal delay={0.2 + index * 0.1} direction="up">
              <Link href={project.link} target={project.link !== "#" ? "_blank" : undefined} rel={project.link !== "#" ? "noopener noreferrer" : undefined} className="group block space-y-6">
                <div className="premium-card flex aspect-video items-center justify-center overflow-hidden p-0 relative">
                  <div className="absolute inset-0 bg-muted/20 flex items-center justify-center -z-10">
                    <span className="text-muted-foreground text-sm">Image not found</span>
                  </div>
                  <div className="relative w-full h-full">
                    {/* Assuming the user adds the images in /public/images/projects/ with the same names */}
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                </div>
                <div className="space-y-3 px-1">
                  <div>
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p className="text-sm font-medium text-primary mt-1">{project.role}</p>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.skills.map(skill => (
                      <span key={skill} className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs font-medium border border-border/50">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
