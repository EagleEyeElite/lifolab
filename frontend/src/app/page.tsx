import About from "@/components/sections/about";
import People from "@/components/sections/people";
import Projects from "@/components/sections/projects";

export default function Home() {
  return (
    <div>
      <main>
        <About />
        <Projects />
        <People />
      </main>
    </div>
  );
}
