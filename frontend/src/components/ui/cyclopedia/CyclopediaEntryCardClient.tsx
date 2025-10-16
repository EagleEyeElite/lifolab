"use client";

import React, { useState } from "react";
import Image from "next/image";
import HTMLRenderer from "@/components/ui/renderHtml/htmlRenderer";


interface CyclopediaEntryCardProps {
  id: string;
  title?: string | null;
  content?: string | null;
  slug?: string | null;
  featuredImage?: {
    node: {
      sourceUrl?: string | null;
      altText?: string | null;
    };
  } | null;
  backgroundColor: string;
}

// Helper function to truncate HTML content to a specific word count and add inline show more button
function truncateHtmlToWords(html: string, wordLimit: number): { truncated: string; isTruncated: boolean } {
  // Remove HTML tags to count words, but preserve the structure for truncation
  const textContent = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = textContent.split(' ');
  
  if (words.length <= wordLimit) {
    return { truncated: html, isTruncated: false };
  }
  
  // Create truncated version by counting words while preserving HTML structure
  let wordCount = 0;
  let result = '';
  let inTag = false;
  let currentWord = '';
  
  for (let i = 0; i < html.length; i++) {
    const char = html[i];
    
    if (char === '<') {
      if (currentWord.trim()) {
        result += currentWord;
        currentWord = '';
      }
      inTag = true;
      result += char;
    } else if (char === '>') {
      inTag = false;
      result += char;
    } else if (inTag) {
      result += char;
    } else if (char === ' ' || char === '\n' || char === '\t') {
      if (currentWord.trim()) {
        if (wordCount >= wordLimit) break;
        result += currentWord;
        wordCount++;
        currentWord = '';
      }
      result += char;
    } else {
      currentWord += char;
    }
  }
  
  // Add remaining word if we haven't reached the limit
  if (currentWord.trim() && wordCount < wordLimit) {
    result += currentWord;
  }
  
  // Add ellipsis and placeholder for show more button
  result += '... <span class="show-more-placeholder"></span>';
  
  return { truncated: result, isTruncated: true };
}

export default function CyclopediaEntryCardClient({ id, title, content, slug, featuredImage, backgroundColor }: CyclopediaEntryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);
  
  // Use the props directly as entry data
  const entry = {
    id,
    title,
    content,
    slug,
    featuredImage
  };
  
  const { truncated, isTruncated } = entry.content 
    ? truncateHtmlToWords(entry.content, 50)
    : { truncated: '', isTruncated: false };

  // Replace the placeholder with the "Show more" button after render
  React.useEffect(() => {
    if (contentRef.current && isTruncated && !isExpanded) {
      const placeholder = contentRef.current.querySelector('.show-more-placeholder');
      if (placeholder) {
        const button = document.createElement('button');
        button.className = 'text-black font-heading text-sm underline hover:no-underline transition-all ml-1';
        button.textContent = 'Show more';
        button.onclick = () => setIsExpanded(true);
        placeholder.replaceWith(button);
      }
    }
  }, [isExpanded, isTruncated]);

  return (
    <div className="rounded-primary overflow-hidden" style={{ backgroundColor }}>
      {entry.featuredImage?.node?.sourceUrl && (
        <div className="pt-3">
          <div className="relative w-full h-48">
            <Image
              src={entry.featuredImage.node.sourceUrl}
              alt={entry.featuredImage.node.altText || entry.title || 'Cyclopedia entry'}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
      <div className="p-4 space-y-3">
        {entry.title && (
          <h3 className="font-heading text-lg font-medium">
            {entry.title}
          </h3>
        )}
        {entry.content && (
          <div className="text-sm space-y-2">
            <div ref={contentRef}>
              <HTMLRenderer 
                content={isExpanded ? entry.content : truncated} 
                className="text-black text-sm" 
              />
            </div>
            {isTruncated && isExpanded && (
              <button
                onClick={() => setIsExpanded(false)}
                className="text-black font-heading text-sm underline hover:no-underline transition-all"
              >
                Show less
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}