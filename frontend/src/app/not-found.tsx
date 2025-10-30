import Link from 'next/link';
import Section from '@/components/ui/Section';
import { AlertTriangle } from 'lucide-react';
import { strings } from '@/config/siteConfig';
import SubHeading from "@/components/ui/SubHeading";
import { getLifoIndexColors } from '@/lib/getSiteColors';

export default async function NotFound() {
  const { primaryColor } = await getLifoIndexColors();

  return (
    <Section title={strings.notFound.title} icon={AlertTriangle}>
      <div className="flex flex-col items-center pt-6 text-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="text-6xl font-bold text-gray-300">404</div>
            <SubHeading>
              {strings.notFound.title}
            </SubHeading>
          </div>
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 text-sm font-heading text-gray-800 rounded-primary"
              style={{ backgroundColor: primaryColor }}
            >
              {strings.notFound.backToHome}
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}