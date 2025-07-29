import Link from "next/link";

interface TagPillProps {
  name: string;
  href: string;
}

export default function TagPill({ name, href }: TagPillProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center px-[7px] py-[3px] text-xs font-mono leading-[1.2] text-black bg-primary border border-black rounded-full no-underline"
    >
      {name}
    </Link>
  );
}