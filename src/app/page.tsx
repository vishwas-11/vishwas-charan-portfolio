import Hero from "@/components/sections/Hero";
import Resume from "@/components/sections/Resume";
import SelectedWork from "@/components/sections/SelectedWork";
import MyStack from "@/components/sections/MyStack";
import GithubGrid from "@/components/GithubGrid";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 pb-20">
      <Hero />
      <Resume />
      <SelectedWork />
      <MyStack />
      <GithubGrid />
      <Contact />
    </div>
  );
}
