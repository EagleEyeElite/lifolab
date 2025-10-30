'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface SelectableCategoryListProps {
  tags: Tag[];
  currentTagSlug?: string;
  primaryColor: string;
  secondaryColor: string;
}

export default function SelectableCategoryList({ tags, currentTagSlug, primaryColor, secondaryColor }: SelectableCategoryListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(currentTagSlug || null);
  const router = useRouter();

  useEffect(() => {
    setSelectedTag(currentTagSlug || null);
  }, [currentTagSlug]);

  const handleTagClick = (tagSlug: string) => {
    if (selectedTag === tagSlug) {
      // Deselect and navigate to /categories/
      setSelectedTag(null);
      router.push('/categories/');
    } else {
      // Select and navigate to /categories/[tag]
      setSelectedTag(tagSlug);
      router.push(`/categories/${tagSlug}`);
    }
  };

  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => {
        const isSelected = selectedTag === tag.slug;
        return (
          <button
            key={tag.id}
            onClick={() => handleTagClick(tag.slug)}
            className="inline-flex items-center px-2 py-1 text-xs font-heading rounded-full border-2 transition-colors text-black border-transparent hover:border-gray-300"
            style={{
              backgroundColor: isSelected ? secondaryColor : primaryColor,
              ...(isSelected && {
                borderColor: 'black',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
              })
            }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                e.currentTarget.style.backgroundColor = secondaryColor;
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.currentTarget.style.backgroundColor = primaryColor;
              }
            }}
          >
            {tag.name}
          </button>
        );
      })}
    </div>
  );
}