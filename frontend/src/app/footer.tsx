import React from 'react';
import { Mic, FolderClosed } from 'lucide-react';
import LogoTU from '@public/logoTU.png'
import LogoStiftungHochschullehre from '@public/logoStiftungHochschullehre.png'
import Image, {StaticImageData} from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/sectionHeader";



// Contact Person Component
function ContactPerson({ name, email }: {
  name: string;
  email: string;
}) {
  return (
    <div className="space-y-2">
      <p className="font-mono text-sm text-black">{name}</p>
      <Link
        href={`mailto:${email}`}
        className="inline-block px-4 py-2 rounded-full border border-black text-black font-mono text-sm"
      >
        {email}
      </Link>
    </div>
  );
}

// Logo Link Component
function LogoLink({ href, src, alt, className = "" }: {
  href: string;
  src: StaticImageData;
  alt: string;
  className?: string;
}) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <Image
        src={src}
        alt={alt}
        className={`h-12 w-auto object-contain ${className}`}
      />
    </Link>
  );
}

// Contact Component
function Contact() {
  const projectName: string = "Living the Forest Lab | Reallabor Wald";
  const contacts = [
    { name: "Athena Grandis", email: "athena.grandis@tu-berlin.de" },
    { name: "Sara Reichert", email: "s.reichert@tu-berlin.de" }
  ];

  return (
    <div className="flex-[2] space-y-4">
      <SectionHeader icon={Mic}>Contact</SectionHeader>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-4">
          <p className="font-mono text-sm text-black font-medium">
            {projectName}
          </p>
          {contacts.map((contact, index: number) => (
            <ContactPerson
              key={index}
              name={contact.name}
              email={contact.email}
            />
          ))}
        </div>

        <address className="flex-1 font-mono text-sm text-black not-italic">
          Technische Universität Berlin<br />
          Faculty IV Electrical Engineering and Computer Science<br />
          Communication Systems<br />
          EN 1<br />
          Einsteinufer 17<br />
          10587 Berlin
        </address>
      </div>
    </div>
  );
}

// Imprint Component
function Imprint() {
  const logos = [
    { href: "https://www.tu.berlin", src: LogoTU, alt: "TU Berlin Logo" },
    { href: "https://stiftung-hochschullehre.de", src: LogoStiftungHochschullehre, alt: "Stiftung Hochschullehre Logo" }
  ];

  return (
    <div className="flex-1 space-y-4">
      <SectionHeader icon={FolderClosed}>Imprint</SectionHeader>

      <div className="space-y-6">
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {logos.map((logo, index: number) => (
            <LogoLink
              key={index}
              href={logo.href}
              src={logo.src}
              alt={logo.alt}
            />
          ))}
        </div>

        <div className="text-center font-mono text-sm text-black space-y-1">
          <p className="font-medium">Copyright:</p>
          <p>Living the Forest Lab | Reallabor Wald</p>
        </div>
      </div>
    </div>
  );
}

// Main Footer Component
export default function Footer() {
  return (
    <footer className="bg-[rgba(0,255,94,0.91)] rounded-t-3xl border border-black border-b-0 mx-6 p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <Contact />
        <Imprint />
      </div>
    </footer>
  );
}
