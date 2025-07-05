import { ReactNode } from 'react';
import parse, { DOMNode, domToReact, Element } from 'html-react-parser';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CustomLinkProps {
  link: {
    href: string;
    children: ReactNode;
  };
}

function CustomLink({ link }: CustomLinkProps) {
  const isExternal = link.href?.startsWith('http://') || link.href?.startsWith('https://');
  const externalAttrs = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Link href={link.href} {...externalAttrs} className="inline-flex items-center">
      {link.children}
      {isExternal && <ExternalLink size={16} />}
    </Link>
  );
}

interface HTMLRendererProps {
  content: string | null | undefined;
  className?: string;
}

export default function HTMLRenderer({ content, className = '' }: HTMLRendererProps) {
  if (!content) {
    return null;
  }

  const processedContent = parse(content, {
    replace(domNode) {
      if (!(domNode instanceof Element)) {
        return;
      }
      switch (domNode.name) {
        case 'img': {
          const { src, alt, width, height } = domNode.attribs;
          const alignmentClass = (domNode.parent as Element)?.attribs?.class?.match(/align(left|right|center|wide|full)/)?.[0] || '';

          return (
            <Image
              src={src}
              width={Number.parseInt(width)}
              height={Number.parseInt(height)}
              alt={alt || 'image'}
              style={{ objectFit: 'cover' }}
              className={`
                mt-2 
                [&.alignfull]:w-full 
                [&.alignwide]:w-full
                [&.alignleft]:float-left [&.alignleft]:mr-4
                [&.alignright]:float-right [&.alignright]:ml-4
                [&.aligncenter]:mx-auto
                ${alignmentClass}
              `}
            />
          );
        }

        case 'a': {
          const children = domToReact(domNode.children as DOMNode[]);
          return <CustomLink link={{ children, href: domNode.attribs.href }} />;
        }

        default:
          return;
      }
    }
  });

  return (
    <div className={`
      text-lg leading-relaxed text-black text-justify
      [&_p]:mb-6
      [&_h1]:text-4xl [&_h1]:font-normal [&_h1]:leading-tight [&_h1]:my-8 [&_h1]:text-black
      [&_h2]:text-3xl [&_h2]:font-normal [&_h2]:leading-tight [&_h2]:my-6 [&_h2]:text-black
      [&_h3]:text-2xl [&_h3]:font-normal [&_h3]:leading-tight [&_h3]:my-4 [&_h3]:text-black
      [&_br]:block [&_br]:my-3
      [&_strong]:font-medium
      [&_em]:italic
      [&_ul]:my-4 [&_ul]:pl-8
      [&_ol]:my-4 [&_ol]:pl-8
      [&_li]:mb-2
      [&_blockquote]:border-l-4 [&_blockquote]:border-[rgba(0,255,94,0.91)] [&_blockquote]:pl-6 [&_blockquote]:my-6 [&_blockquote]:italic
      [&_a]:text-black [&_a]:underline [&_a]:decoration-[rgba(0,255,94,0.91)] [&_a]:underline-offset-2 [&_a:hover]:bg-[rgba(0,255,94,0.2)]
      [&_img]:rounded-lg [&_img]:my-8
      ${className}
    `}>
      {processedContent}
    </div>
  );
}