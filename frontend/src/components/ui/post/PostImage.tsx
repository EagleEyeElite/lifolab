import Image from 'next/image';

interface PostImageProps {
  image?: any;
  title: string | null | undefined;
}

export default function PostImage({ image, title }: PostImageProps) {
  if (!image?.node?.sourceUrl) {
    return (
      <div className="mb-8 p-4 bg-gray-100 rounded-lg text-center text-gray-500">
        No featured image available
      </div>
    );
  }

  return (
    <div className="mb-8">
      <Image
        src={image.node.sourceUrl}
        alt={image.node.altText || title || 'Featured image'}
        width={800}
        height={600}
        className="w-full h-auto rounded-lg"
        priority
      />
    </div>
  );
}