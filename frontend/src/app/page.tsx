import About from "@/components/sections/about";
import People from "@/components/sections/people";
import Projects from "@/components/sections/projects";

export const revalidate = 10;

export default function Home() {
  return <>
    <About/>
    <Projects />
    <People />
  </>;
}
