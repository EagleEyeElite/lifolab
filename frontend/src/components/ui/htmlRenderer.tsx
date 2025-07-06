import parse, { DOMNode, domToReact, Element } from 'html-react-parser';
import {ReactNode} from "react";
import Link from "next/link";
import {ExternalLink} from "lucide-react";
import Image from 'next/image';


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

      const classes = domNode.attribs?.class || '';

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





        case 'div': {
          // Handle WordPress columns
          if (classes.includes('wp-block-columns')) {
            const children = domToReact(domNode.children as DOMNode[]);
            return (
              <div className="flex flex-col md:flex-row gap-6 my-6">
                {children}
              </div>
            );
          }

          if (classes.includes('wp-block-column')) {
            const children = domToReact(domNode.children as DOMNode[]);
            return (
              <div className="flex-1">
                {children}
              </div>
            );
          }

          // For other divs, let them render normally
          return;
        }

        case 'figure': {
          // Handle WordPress galleries
          if (classes.includes('wp-block-gallery')) {
            const children = domToReact(domNode.children as DOMNode[]);
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
                {children}
              </div>
            );
          }

          // Handle individual images within galleries
          if (classes.includes('wp-block-image')) {
            const children = domToReact(domNode.children as DOMNode[]);
            return (
              <div className="overflow-hidden rounded-lg">
                {children}
              </div>
            );
          }

          // For other figures, let them render normally
          return;
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
    <div className={`prose prose-lg max-w-none ${className}`}>
      {processedContent}
    </div>
  );
}
