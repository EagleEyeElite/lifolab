import { ReactNode } from 'react';
import About from "@/app/about";
import People from "@/app/people";


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
        <Section bgColor="bg-emerald-600">
          <p>Welcome to <code className="bg-white/20 px-2 py-1 rounded">Living the Forest Lab!</code></p>
        </Section>
        <About />
        <People />
      </main>
    </div>
  );
}
