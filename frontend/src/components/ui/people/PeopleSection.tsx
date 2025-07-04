import React from "react";
import PersonRow from "./PersonRow";

interface Person {
  name: string;
  role: string;
  href: string;
  hasLink: boolean;
  content?: string;
}

interface PeopleSectionProps {
  title: string;
  people: Person[];
  keyPrefix: string;
}

export default function PeopleSection({ title, people, keyPrefix }: PeopleSectionProps) {
  return (
    <div className="space-y-0">
      <div className="mb-4">
        <span className="text-black text-sm font-mono tracking-wide">
          {title}
        </span>
      </div>
      <div className="space-y-1">
        {people.map((person, index) => (
          <PersonRow 
            key={`${keyPrefix}-${index}`} 
            person={person} 
          />
        ))}
      </div>
    </div>
  );
}