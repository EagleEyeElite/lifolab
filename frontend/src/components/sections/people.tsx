import Link from "next/link";
import React from "react";
import SectionHeader from "@/components/ui/sectionHeader";
import { Command, Plus } from "lucide-react";

interface Person {
  name: string;
  role: string;
  href: string;
  hasLink: boolean;
}

export default function People() {
  const teamMembers: Person[] = [
    {
      name: "Athena Grandis",
      role: "research associate | designer",
      href: "#",
      hasLink: true
    },
    {
      name: "Sara Reichert",
      role: "research associate | maker",
      href: "#",
      hasLink: false
    },
    {
      name: "Linhtan Tranguyenn",
      role: "student assistant",
      href: "#",
      hasLink: false
    },
    {
      name: "Karl Schmitz",
      role: "student assistant",
      href: "#",
      hasLink: false
    }
  ];

  const collaborators: Person[] = [
    {
      name: "Jakob Kukula",
      role: "designer",
      href: "#",
      hasLink: true
    },
    {
      name: "Ines Weigand",
      role: "research associate",
      href: "#",
      hasLink: false
    },
    {
      name: "Pensament Salvatge aka Eric Estevez",
      role: "artist",
      href: "#",
      hasLink: false
    },
    {
      name: "Lennard Feger",
      role: "student",
      href: "#",
      hasLink: false
    },
    {
      name: "Mustafa Erdenay Gürol",
      role: "student",
      href: "#",
      hasLink: false
    },
    {
      name: "Hasan Bahadir Savas",
      role: "student",
      href: "#",
      hasLink: false
    },
    {
      name: "Karim Nicolae Costan",
      role: "student",
      href: "#",
      hasLink: false
    }
  ];

  const PersonRow = ({ person }: { person: Person }) => (
    <>
      <div className="h-px bg-black/75 w-full"></div>
      <div className="grid grid-cols-12 gap-4 py-0">
        <div className="col-span-6">
          {person.hasLink ? (
            <Link
              href={person.href}
              className="text-lg leading-tight text-black opacity-85 font-normal text-justify no-underline hover:opacity-75 transition-opacity"
            >
              {person.name}
            </Link>
          ) : (
            <span className="text-lg leading-tight text-black opacity-85 font-normal text-justify">
              {person.name}
            </span>
          )}
        </div>
        <div className="col-span-5">
          <span className="text-black text-sm font-mono tracking-wide">
            {person.role}
          </span>
        </div>
        <div className="col-span-1 text-right">
          <Link
            href="#"
            className="text-black no-underline hover:opacity-75 transition-opacity"
          >
            <Plus size={16} />
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex justify-start w-full">
      <div className="max-w-[67%] w-full">
        <div className="px-[1.6rem] py-[1.6rem] space-y-6">
          {/* Page title */}
          <SectionHeader icon={Command}>
            People
          </SectionHeader>

          {/* Team section */}
          <div className="space-y-0">
            <div className="mb-4">
              <span className="text-black text-sm font-mono tracking-wide">
                Living the Forest Lab Team
              </span>
            </div>

            {/* Team members */}
            <div className="space-y-0">
              {teamMembers.map((person, index) => (
                <PersonRow key={index} person={person} />
              ))}
            </div>
          </div>

          {/* Collaborations section */}
          <div className="space-y-0">
            <div className="mb-4">
              <span className="text-black text-sm font-mono tracking-wide">
                Collaborations
              </span>
            </div>

            {/* Collaborators */}
            <div className="space-y-0">
              {collaborators.map((person, index) => (
                <PersonRow key={index} person={person} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}