import Image from 'next/image';
import { strings } from '@/config/siteConfig';

interface PostImageProps {
  image?: any;
  title: string | null | undefined;
}

export default function PostImage({ image, title }: PostImageProps) {
  if (!image?.node?.sourceUrl) {
    return (
      <div className="mb-8 p-4 bg-gray-100 rounded-primary text-center text-gray-500">
        No featured image available
      </div>
    );
  }

  return (
    <div className="mb-8 relative w-full max-h-[500px] overflow-hidden rounded-primary flex items-center justify-center">
      <Image
        src={image.node.sourceUrl}
        alt={image.node.altText || title || strings.altText.featuredImage}
        width={800}
        height={400}
        className="w-full min-h-full object-cover rounded-primary"
        style={{ objectPosition: 'center center' }}
        priority
      />
    </div>
  );
}
