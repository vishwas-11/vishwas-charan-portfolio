import Hero from "@/components/sections/Hero";
import SelectedWork from "@/components/sections/SelectedWork";
import MyStack from "@/components/sections/MyStack";
import About from "@/components/sections/About";
import GithubGrid from "@/components/GithubGrid";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 pb-20">
      <Hero />
      <SelectedWork />
      <MyStack />
      <About />
      <GithubGrid />
    </div>
  );
}
