import Link from "next/link";
import React from "react";
import SectionHeader from "@/components/ui/sectionHeader";
import { Globe, Plus } from "lucide-react";

interface Place {
  name: string;
  href: string;
}

export default function Places() {
  const places: Place[] = [
    {
      name: "Berlin Open Lab",
      href: "berlin-open-lab"
    }
  ];

  const PlaceRow = ({ place }: { place: Place }) => (
    <>
      <div className="h-px bg-black/75 w-full"></div>
      <div className="grid grid-cols-12 gap-4 py-0">
        <div className="col-span-11">
          <span className="text-lg leading-tight text-black opacity-85 font-normal text-justify">
            {place.name}
          </span>
        </div>
        <div className="col-span-1 text-right">
          <Link
            href={place.href}
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
          <SectionHeader icon={Globe}>
            Places
          </SectionHeader>

          {/* Places section */}
          <div className="space-y-0">
            {/* Places */}
            <div className="space-y-0">
              {places.map((place, index) => (
                <PlaceRow key={index} place={place} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
