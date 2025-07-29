import TagList from '@/components/ui/tags/TagList';

interface PostTagsProps {
  tags?: any;
}

export default function PostTags({ tags }: PostTagsProps) {
  const tagSlugs = tags?.edges?.map((tagEdge: any) => tagEdge.node.slug!) || [];
  
  if (!tagSlugs.length) {
    return null;
  }

  return (
    <div className="mb-8">
      <TagList tagSlugs={tagSlugs} />
    </div>
  );
}
