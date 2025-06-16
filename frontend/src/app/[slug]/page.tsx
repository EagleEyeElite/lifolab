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
        <Section bgColor="bg-emerald-600">
          <p>This is for posts like <code>https://lifolab.cargo.site/co2ntrol</code> but rendered from wordpress</p>
        </Section>
      </main>
    </div>
  );
}
