import Description from "@/components/sections/description";
import People from "@/components/sections/people";
import Projects from "@/components/sections/projects";
import Places from "@/components/sections/places";

export const revalidate = 10;

export default function Home() {
  return <>
    <Description/>
    <Projects />
    <People />
    <Places />
  </>;
}
