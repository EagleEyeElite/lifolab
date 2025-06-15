import { ReactNode } from 'react';
import About from "@/app/about";
import People from "@/app/people";
import Places from "@/app/places";
import News from "@/app/news";


interface SectionProps {
  bgColor: string;
  children: ReactNode;
}

function Section({ bgColor, children }: SectionProps) {
  return (
    <div className={`h-screen ${bgColor} flex items-center justify-center p-8 text-white text-2xl`}>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <main>
        <News />
        <About />
        <People />
        <Places />
      </main>
    </div>
  );
}
