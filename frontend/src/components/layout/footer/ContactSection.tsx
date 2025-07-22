import React from 'react';
import { Mic } from 'lucide-react';
import Link from "next/link";
import SectionHeader from "@/components/ui/sectionHeader";
import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import { GetContactContentQuery, GetContactContentQueryVariables } from "@/graphql/generatedTypes";
import HTMLRenderer from "@/components/ui/htmlRenderer";

const GetContactContent = gql`
    query GetContactContent {
        frontendContentSettings {
            frontendContent {
                contact {
                    info1
                    infosContactPerson {
                        contactName
                        contactEmail
                    }
                    address
                }
            }
        }
    }
`;

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

export default async function ContactSection() {
  const { frontendContentSettings } = await graphqlClient.request<GetContactContentQuery, GetContactContentQueryVariables>(
    GetContactContent,
  );

  const contactData = frontendContentSettings?.frontendContent?.contact;
  
  if (!contactData) {
    throw new Error('Contact data not found');
  }

  const projectName = contactData.info1 || "Living the Forest Lab | Reallabor Wald";

  if (!contactData.infosContactPerson || contactData.infosContactPerson.length === 0) {
    throw new Error('No contact persons found');
  }
  
  const contacts = contactData.infosContactPerson
    .map(contact => ({
      name: contact?.contactName,
      email: contact?.contactEmail
    })).filter(contact => contact.email);

  return (
    <div className="flex-[2] space-y-4">
      <SectionHeader icon={Mic}>Contact</SectionHeader>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-4">
          <p className="font-mono text-sm text-black font-medium">
            {projectName}
          </p>
          {contacts.map((contact, index: number) => {
            if (!contact.name || !contact.email) {
              throw new Error(`Contact at index ${index} not defined`);
            }
            return (
              <ContactPerson
                key={index}
                name={contact.name}
                email={contact.email}
              />
            );
          })}
        </div>

        <address className="flex-1 font-mono text-sm text-black not-italic">
          <HTMLRenderer content={contactData.address || "Address not available"} />
        </address>
      </div>
    </div>
  );
}