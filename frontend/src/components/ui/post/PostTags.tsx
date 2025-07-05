import TagPill from '@/components/ui/tagPill';

interface PostTagsProps {
  tags?: any;
  collaborators?: any;
}

export default function PostTags({ tags, collaborators }: PostTagsProps) {
  return (
    <div className="mb-8 space-y-2">
      {tags?.edges?.map((tagEdge: any, index: number) => (
        <div key={index}>
          <TagPill
            name={tagEdge.node.name!}
            href={`/tags/${tagEdge.node.slug}`}
          />
        </div>
      ))}
      {collaborators?.referencedCollaborators?.nodes?.map((collaborator: any, index: number) => {
        if (collaborator.__typename === 'Collaborator' && collaborator.title) {
          return (
            <div key={index}>
              <TagPill
                name={collaborator.title}
                href={`/collaborators/${collaborator.slug}`}
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}