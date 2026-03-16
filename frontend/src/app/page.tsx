import { cacheLife } from 'next/cache';
import Description from "@/components/sections/description";
import People from "@/components/sections/people";
import Projects from "@/components/sections/projects";
import Places from "@/components/sections/places";

export default async function Home() {
  'use cache';
  cacheLife('cms');

  return <>
    <Description/>
    <Projects />
    <People />
    <Places />
  </>;
}
