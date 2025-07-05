import TagPill from '@/components/ui/tagPill';

interface PostTagsProps {
  tags?: any;
}

export default function PostTags({ tags }: PostTagsProps) {
  return (
    <div className="mb-8 space-y-2">
      {tags?.edges?.map((tagEdge: any, index: number) => (
        <TagPill
          name={tagEdge.node.name!}
          href={`/tags/${tagEdge.node.slug}`}
          key={index}
          />
      ))}
    </div>
  );
}
