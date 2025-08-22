import About from "@/app/about/about";

export const revalidate = 10;


export default async function AboutPage() {
  return <About />;
}
