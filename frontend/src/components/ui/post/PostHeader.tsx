import HTMLRenderer from '@/components/ui/renderHtml/htmlRenderer';

interface PostHeaderProps {
  title: string | null | undefined;
  excerpt?: string | null | undefined;
}

export default function PostHeader({ title, excerpt }: PostHeaderProps) {
  return (
    <>
      <h1 className="text-4xl font-body leading-none mb-8">
        {title}
      </h1>
      {excerpt && (
        <div className="mb-8">
          <div className="text-base leading-relaxed">
            <HTMLRenderer content={excerpt} />
          </div>
        </div>
      )}
    </>
  );
}