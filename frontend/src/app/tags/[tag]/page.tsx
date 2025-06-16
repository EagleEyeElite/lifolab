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
        <Section bgColor="bg-amber-500">
          <p>This is for a tag like <code>https://lifolab.cargo.site/project</code>. It simply renders all posts from wordpress tag list</p>
        </Section>
      </main>
    </div>
  );
}
