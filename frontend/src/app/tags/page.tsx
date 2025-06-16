import { ReactNode } from 'react';


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

export default function Post() {
  return (
    <div>
      <main>
        <Section bgColor="bg-lime-400">
          <p>This is a overview for all available tags like talk, Laboratory, Workshop, Excursion, Project etc.</p>
        </Section>
      </main>
    </div>
  );
}
