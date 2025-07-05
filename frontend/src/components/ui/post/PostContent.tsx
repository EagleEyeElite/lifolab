import HTMLRenderer from '@/components/ui/htmlRenderer';

interface PostContentProps {
  content?: string | null;
}

export default function PostContent({ content }: PostContentProps) {
  return (
    <div className="text-lg leading-relaxed text-black prose-custom">
      <HTMLRenderer content={content} />
    </div>
  );
}