import About from "@/app/about";
import People from "@/app/people";
import Places from "@/app/places";
import Projects from "@/app/projects";

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
