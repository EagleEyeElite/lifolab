import { cacheLife } from 'next/cache';
import About from "@/app/about/about";

export default async function AboutPage() {
  'use cache';
  cacheLife('cms');

  return <About />;
}
