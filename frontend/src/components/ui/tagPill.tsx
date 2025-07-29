import Link from "next/link";

interface TagPillProps {
  name: string;
  href: string;
}

export default function TagPill({ name, href }: TagPillProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center px-2 py-1 text-xs font-heading bg-secondary border border-black rounded-full"
    >
      {name}
    </Link>
  );
}
