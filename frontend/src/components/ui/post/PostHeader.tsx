import HTMLRenderer from '@/components/ui/htmlRenderer';

interface PostHeaderProps {
  title: string | null | undefined;
  excerpt?: string | null | undefined;
}

export default function PostHeader({ title, excerpt }: PostHeaderProps) {
  return (
    <>
      <h1 className="text-4xl font-normal leading-none mb-8 text-black">
        {title}
      </h1>
      {excerpt && (
        <div className="mb-8">
          <div className="text-base leading-relaxed text-black">
            <HTMLRenderer content={excerpt} />
          </div>
        </div>
      )}
    </>
  );
}