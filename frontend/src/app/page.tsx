import { ReactNode } from 'react';
import Image from 'next/image';
import Match from '@public/match.svg'

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
    <main className="min-h-screen">
      <Section bgColor="bg-emerald-500">
        <Image
          src={Match}
          alt="Match"
          width={96}
          height={96}
        />
      </Section>
      <Section bgColor="bg-violet-600">
        <p>Welcome to <code className="bg-white/20 px-2 py-1 rounded">Living the Forest Lab!</code></p>
      </Section>
      <Section bgColor="bg-rose-500">
        <p>Explore the wilderness</p>
      </Section>
      <Section bgColor="bg-indigo-700">
        <p>Discover nature&apos;s secrets</p>
      </Section>
    </main>
  );
}
