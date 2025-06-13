import { ReactNode } from 'react';
import ScrollAnimatedLogo from "@/app/scrollAnimatedLogo";

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
        <Section bgColor="bg-green-700">
          <p>Explore the wilderness</p>
        </Section>
        <Section bgColor="bg-teal-600">
          <p>Discover nature&apos;s secrets</p>
        </Section>
        <Section bgColor="bg-lime-600">
          <p>Find your wild side</p>
        </Section>
        <Section bgColor="bg-emerald-800">
          <p>Deep forest adventures await</p>
        </Section>
        <Section bgColor="bg-green-600">
          <p>Connect with the earth</p>
        </Section>
      </main>
    </div>
  );
}
