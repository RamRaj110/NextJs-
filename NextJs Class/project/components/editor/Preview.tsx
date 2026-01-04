import React from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";

interface Props {
  content: string;
}

const Preview = async ({ content }: Props) => {
  if (!content) return null;

  try {
    const { content: MDXContent } = await compileMDX({
      source: content,
      options: {
        parseFrontmatter: false,
        mdxOptions: {
          rehypePlugins: [rehypeHighlight],
        },
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
      <div className="p-4 border-2 border-red-500 rounded-lg">
        <p className="text-red-600 font-bold">Error rendering content</p>
        <pre className="text-xs bg-red-50 p-2 rounded overflow-auto mt-2">
          {error instanceof Error ? error.message : String(error)}
        </pre>
      </div>
    );
  }
};

export default Preview;
