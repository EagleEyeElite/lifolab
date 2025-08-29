import TagList from '@/components/ui/tags/TagList';

interface PostTagsProps {
  tags: string[];
}

export default function PostTags({ tags }: PostTagsProps) {
  if (!tags.length) {
    return null;
  }

  return (
    <div className="mb-8">
      <TagList tagIds={tags} />
    </div>
  );
}
