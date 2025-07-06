import {ReactNode} from "react";
import Link from "next/link";
import {ExternalLink} from "lucide-react";

interface CustomLinkProps {
  link: {
    href: string;
    children: ReactNode;
  };
}

export default function CustomLink({ link }: CustomLinkProps) {
  const isExternal = link.href?.startsWith('http://') || link.href?.startsWith('https://');
  const externalAttrs = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Link href={link.href} {...externalAttrs} className="inline-flex items-center">
      {link.children}
      {isExternal && <ExternalLink size={16} />}
    </Link>
  );
}
