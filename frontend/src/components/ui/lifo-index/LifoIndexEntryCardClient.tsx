"use client";

import React, { useState } from "react";
import Image from "next/image";
import HTMLRenderer from "@/components/ui/renderHtml/htmlRenderer";
import { strings } from '@/config/siteConfig';


interface LifoIndexEntryCardProps {
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

// Helper function to truncate HTML content to a specific word count
function truncateHtmlToWords(html: string, wordLimit: number): { truncated: string; isTruncated: boolean } {
  const textContent = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = textContent.split(' ');

  if (words.length <= wordLimit) {
    return { truncated: html, isTruncated: false };
  }

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

  if (currentWord.trim() && wordCount < wordLimit) {
    result += currentWord;
  }

  // Close any open tags and add ellipsis with a placeholder for the inline show-more button
  result += '… <button data-show-more="true"></button>';

  return { truncated: result, isTruncated: true };
}

const indexProseClassName = "text-black text-sm [&_h2]:text-base [&_h2]:font-heading [&_h2]:font-semibold [&_h2]:mt-3 [&_h2]:mb-1";

export default function LifoIndexEntryCardClient({ id, title, content, slug, featuredImage, backgroundColor }: LifoIndexEntryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { truncated, isTruncated } = content
    ? truncateHtmlToWords(content, 50)
    : { truncated: '', isTruncated: false };

  return (
    <div className="rounded-primary overflow-hidden break-words overflow-wrap-anywhere" style={{ backgroundColor }}>
      {featuredImage?.node?.sourceUrl && (
        <div className="pt-3">
          <div className="relative w-full h-48">
            <Image
              src={featuredImage.node.sourceUrl}
              alt={featuredImage.node.altText || title || strings.altText.indexEntry}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
      <div className="p-4 space-y-3">
        {title && (
          <h3 className="font-heading text-lg font-medium">
            {title}
          </h3>
        )}
        {content && (
          <div className="text-sm space-y-2">
            <HTMLRenderer
              content={isExpanded ? content : truncated}
              className={indexProseClassName}
              style={{ '--tw-prose-bullets': 'black', '--tw-prose-counters': 'black' } as React.CSSProperties}
              onShowMore={isTruncated && !isExpanded ? () => setIsExpanded(true) : undefined}
            />
            {isTruncated && isExpanded && (
              <button
                onClick={() => setIsExpanded(false)}
                className="text-black font-heading text-sm underline hover:no-underline transition-all"
              >
                {strings.ui.showLess}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}