import CategoryList from '@/components/ui/categories/CategoryList';

interface PostTagsProps {
  tags: string[];
}

export default function PostTags({ tags }: PostTagsProps) {
  if (!tags.length) {
    return null;
  }

  return (
    <div className="pb-responsive">
      <CategoryList tagIds={tags} />
    </div>
  );
}
