import parse, { DOMNode, domToReact, Element } from 'html-react-parser';
import Image from 'next/image';
import CustomLink from "@/components/ui/customLink";
import EmblaCarousel from "@/components/ui/embla-carousel/EmblaCarousel";
import {EmblaOptionsType} from "embla-carousel";



interface GalleryImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

// Helper function to extract images from gallery DOM node
function extractImagesFromGallery(galleryNode: Element): GalleryImage[] {
  const images: GalleryImage[] = [];

  function traverse(node: DOMNode) {
    if (node instanceof Element) {
      if (node.name === 'img') {
        images.push({
          src: node.attribs.src,
          alt: node.attribs.alt || '',
          width: node.attribs.width ? parseInt(node.attribs.width) : undefined,
          height: node.attribs.height ? parseInt(node.attribs.height) : undefined,
        });
      }

      if (node.children) {
        node.children.forEach((child) => traverse(child as DOMNode));
      }
    }
  }

  if (galleryNode.children) {
    galleryNode.children.forEach((child) => traverse(child as DOMNode));
  }

  return images;
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
                mt-2 w-full h-auto max-w-full
                [&.alignfull]:w-full 
                [&.alignwide]:w-full
                [&.alignleft]:float-left [&.alignleft]:mr-4 [&.alignleft]:w-auto [&.alignleft]:max-w-[50%]
                [&.alignright]:float-right [&.alignright]:ml-4 [&.alignright]:w-auto [&.alignright]:max-w-[50%]
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
            // Count the number of wp-block-column children
            const columnCount = domNode.children?.filter(child =>
              child instanceof Element &&
              child.attribs?.class?.includes('wp-block-column')
            ).length || 1;

            return (
              <div
                className="grid gap-6 my-6"
                style={{
                  gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
                  gridTemplateRows: 'auto'
                }}
              >
                {children}
              </div>
            );
          }

          if (classes.includes('wp-block-column')) {
            const children = domToReact(domNode.children as DOMNode[]);
            return (
              <div className="min-w-0 overflow-hidden">
                {children}
              </div>
            );
          }

          // For other divs, let them render normally
          return;
        }

        case 'figure': {
          // Handle WordPress galleries with custom Fancybox gallery
          if (classes.includes('wp-block-gallery')) {
            const images = extractImagesFromGallery(domNode);

            const OPTIONS: EmblaOptionsType = { containScroll: false }

            return (
              <div className="not-prose">
                <EmblaCarousel slides={images} options={OPTIONS} />
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