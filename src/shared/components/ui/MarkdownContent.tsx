/**
 * MarkdownContent Component
 * Reusable markdown renderer with full features:
 * - GFM (GitHub Flavored Markdown) - tables, strikethrough, task lists
 * - Syntax highlighting for code blocks
 * - Math equations support (KaTeX)
 * - Footnotes
 * - Safe HTML sanitization
 *
 * Usage:
 * <MarkdownContent content={markdownString} />
 */

'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import { cn } from '@/shared/utils/cn';

// Import KaTeX CSS (for math rendering)
import 'katex/dist/katex.min.css';
// Import highlight.js CSS (for code syntax highlighting)
import 'highlight.js/styles/github-dark.css';

export interface MarkdownContentProps {
  /**
   * Markdown content string
   */
  content: string;

  /**
   * Additional CSS classes for the wrapper
   */
  className?: string;

  /**
   * Whether to use compact styling (smaller prose)
   */
  compact?: boolean;
}

export function MarkdownContent({
  content,
  className,
  compact = false,
}: MarkdownContentProps) {
  return (
    <div
      className={cn(
        'prose max-w-none',
        compact ? 'prose-sm' : 'prose-lg',
        'prose-headings:font-bold prose-headings:text-gray-900',
        'prose-p:text-gray-700 prose-p:leading-relaxed',
        'prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline',
        'prose-strong:text-gray-900 prose-strong:font-bold',
        'prose-code:text-primary-600 prose-code:bg-primary-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none',
        'prose-pre:bg-gray-900 prose-pre:text-gray-100',
        'prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:bg-primary-50 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:my-4 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-gray-800',
        'prose-ul:list-disc prose-ol:list-decimal',
        'prose-li:text-gray-700',
        'prose-table:border-collapse prose-th:bg-gray-100 prose-th:font-bold prose-th:p-3 prose-td:p-3 prose-td:border',
        'prose-img:rounded-lg prose-img:shadow-md',
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,
          remarkMath,
        ]}
        rehypePlugins={[
          rehypeKatex,
          rehypeHighlight,
        ]}
        components={{
          img: ({ node, ...props }) => (
            <img
              {...props}
              className="rounded-lg shadow-md max-w-full h-auto mx-auto my-6"
              alt={props.alt || 'Article Image'}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
