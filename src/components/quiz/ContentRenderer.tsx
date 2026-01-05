'use client';

import Image from 'next/image';
import katex from 'katex';

interface ImageObject {
  url: string;
  width: number;
  height: number;
  alt: string;
}

interface ContentRendererProps {
  content: string | ImageObject | null | undefined;
}

function isImageObject(content: any): content is ImageObject {
  return (
    content &&
    typeof content === 'object' &&
    'url' in content &&
    'width' in content &&
    'height' in content
  );
}

/**
 * Render LaTeX math expressions using KaTeX
 * Supports both inline ($...$) and block ($$...$$) math
 * Includes security and accessibility mitigations
 */
function renderLatex(content: string): string {
  // MITIGATION #2: Early return for performance - skip if no math delimiters
  if (!content.includes('$')) {
    return content;
  }

  // MITIGATION #5: Process block math $$...$$ FIRST (before inline)
  let result = content.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), {
        displayMode: true,
        throwOnError: false,        // MITIGATION #3, #11: No crashes on invalid LaTeX
        trust: false,               // MITIGATION #9: XSS prevention
        output: 'htmlAndMathml',    // MITIGATION #14: Accessibility for screen readers
      });
    } catch {
      // Fallback: return original if rendering fails
      return `$$${math}$$`;
    }
  });

  // MITIGATION #4, #6, #10: Inline math with safe regex
  // Requires non-digit after $ to exclude prices like $50
  // Uses non-greedy match to handle nested expressions correctly
  result = result.replace(/\$([^$\d][^$]*?)\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), {
        displayMode: false,
        throwOnError: false,
        trust: false,
        output: 'htmlAndMathml',
      });
    } catch {
      // Fallback: return original if rendering fails
      return `$${math}$`;
    }
  });

  return result;
}

export function ContentRenderer({ content }: ContentRendererProps) {
  if (isImageObject(content)) {
    return (
      <div className="my-2">
        <Image
          src={content.url}
          width={content.width}
          height={content.height}
          alt={content.alt || 'Quiz image'}
          className="max-w-full rounded-lg"
        />
      </div>
    );
  }

  if (typeof content === 'string') {
    // Render LaTeX math expressions before setting HTML
    const rendered = renderLatex(content);
    return <span dangerouslySetInnerHTML={{ __html: rendered }} />;
  }

  return null;
}
