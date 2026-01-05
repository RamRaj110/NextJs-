
import React from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Code } from "bright";

Code.theme = {
  light: "github-light",
  dark: "github-dark",
};

interface Props {
  content: string;
}

function sanitizeForMDX(content: string): string {
  const codeBlockRegex = /(```[\s\S]*?```|`[^`\n]+`)/g;
  const parts = content.split(codeBlockRegex);
  
  return parts.map((part, index) => {
    if (index % 2 === 1) return part;
    
    return part
      .replace(/\{/g, '\\{')
      .replace(/\}/g, '\\}')
      .replace(/^import\s/gm, '\\import ')
      .replace(/^export\s/gm, '\\export ')
      .replace(/<(?![a-z]+;)/gi, '\\<');
  }).join('');
}

const Preview = async ({ content }: Props) => {
  if (!content?.trim()) {
    return <p className="text-sm text-muted-foreground italic">No content provided</p>;
  }

  try {
    const sanitizedContent = sanitizeForMDX(content);
    
    const { content: MDXContent } = await compileMDX({
      source: sanitizedContent,
      options: {
        parseFrontmatter: false,
        mdxOptions: {
          format: 'md',
          remarkPlugins: [remarkGfm],
        },
      },
      components: {
        code: Code,
      },
    });

    return (
      <article className="prose prose-stone dark:prose-invert max-w-none">
        {MDXContent}
      </article>
    );
  } catch (error) {
    console.error("=== MDX Compilation Error ===");
    console.error("Error:", error);
    console.error("Content preview:", content.substring(0, 300));

    return (
      <div className="p-4 border-2 border-red-500 rounded-lg bg-red-50/50">
        <p className="text-red-600 font-bold text-sm">Error rendering content</p>
        <pre className="mt-2 text-xs overflow-auto max-h-32 bg-red-100 p-2 rounded">
          {error instanceof Error ? error.message : String(error)}
        </pre>
      </div>
    );
  }
};

export default Preview;
