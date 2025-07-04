import About from "@/components/sections/about";
import People from "@/components/sections/people";
import Places from "@/components/sections/places";
import Projects from "@/components/sections/projects";

export default function Home() {
  return (
    <div>
      <main>
        <Projects />
        <About />
        <People />
        <Places />
      </main>
    </div>
  );
}
