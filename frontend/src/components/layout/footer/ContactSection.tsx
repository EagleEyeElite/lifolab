import React from 'react';
import { Mic } from 'lucide-react';
import Link from "next/link";
import { graphqlClient } from '@/graphql/client';
import { gql } from 'graphql-request';
import { GetContactContentQuery, GetContactContentQueryVariables } from "@/graphql/generatedTypes";
import HTMLRenderer from "@/components/ui/renderHtml/htmlRenderer";

const GetContactContent = gql`
    query GetContactContent {
        footerSettings {
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
    <div className="space-y-responsive-sm">
      <p className="font-heading text-responsive-xs">{name}</p>
      <Link
        href={`mailto:${email}`}
        className="inline-block px-responsive py-responsive rounded-primary border border-black font-heading text-responsive-xs break-all overflow-wrap-anywhere"
      >
        {email}
      </Link>
    </div>
  );
}

export default async function ContactSection() {
  const { footerSettings } = await graphqlClient.request<GetContactContentQuery, GetContactContentQueryVariables>(
    GetContactContent,
  );

  const contactData = footerSettings?.frontendContent?.contact;
  
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
    <div className="flex-2 space-y-responsive">
      <div className={`border-y border-black py-responsive-sm`}>
        <h2 className={`text-responsive-xs pl-responsive font-heading tracking-wide flex items-center gap-2`}>
          Contact <Mic size={16} />
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-responsive">
        <div className="flex-1 space-y-responsive">
          <p className="font-heading text-responsive-xs font-medium">
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

        <address className="flex-1 font-heading text-responsive-xs not-italic">
          <HTMLRenderer content={contactData.address || "Adresse nicht verfügbar"} className="text-black text-responsive-xs"/>
        </address>
      </div>
    </div>
  );
}