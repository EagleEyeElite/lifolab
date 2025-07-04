import React from "react";
import SectionHeader from "@/components/ui/sectionHeader";
import { Command } from "lucide-react";
import PeopleSection from "./PeopleSection";

interface Person {
  name: string;
  role: string;
  href: string;
  hasLink: boolean;
  content?: string;
}

export default function PeopleClient({ teamMembers, collaborators }: { teamMembers: Person[], collaborators: Person[] }) {
  return (
    <div className="px-[1.6rem] py-[1.6rem] space-y-6">
      <SectionHeader icon={Command}>
        People
      </SectionHeader>
      
      <PeopleSection 
        title="Living the Forest Lab Team" 
        people={teamMembers} 
        keyPrefix="team" 
      />
      
      <PeopleSection 
        title="Collaborations" 
        people={collaborators} 
        keyPrefix="collab" 
      />
    </div>
  );
}