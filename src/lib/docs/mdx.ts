import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import type { ReactNode } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { mdxComponents } from "@/components/docs/mdx/mdx-components";

type Frontmatter = {
  title?: string;
  description?: string;
  updatedAt?: string;
};

export type TocItem = {
  id: string;
  title: string;
  level: 2 | 3;
};

export type DocRecord = {
  title: string;
  description: string;
  updatedAt: string;
  toc: TocItem[];
  content: ReactNode;
};

function resolveDocFileCandidates(slug: string[]) {
  const root = path.join(process.cwd(), "content", "zh");
  if (slug.length === 0) {
    return [path.join(root, "intro.mdx")];
  }

  const target = path.join(root, ...slug);
  return [`${target}.mdx`, path.join(target, "index.mdx")];
}

function extractToc(content: string): TocItem[] {
  const lines = content.split("\n");
  const toc: TocItem[] = [];
  const slugger = new GithubSlugger();
  let inCode = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCode = !inCode;
      continue;
    }

    if (inCode) {
      continue;
    }

    const matched = line.match(/^(##|###)\s+(.+)$/);
    if (!matched) {
      continue;
    }

    const [, marker, rawTitle] = matched;
    const title = rawTitle.trim();
    toc.push({
      id: slugger.slug(title),
      title,
      level: marker === "##" ? 2 : 3,
    });
  }

  return toc;
}

export async function getDocBySlug(slug: string[]): Promise<DocRecord | null> {
  const candidates = resolveDocFileCandidates(slug);

  for (const filePath of candidates) {
    try {
      const raw = await fs.readFile(filePath, "utf8");
      const parsed = matter(raw);
      const toc = extractToc(parsed.content);
      const { content } = await compileMDX({
        source: parsed.content,
        components: mdxComponents,
        options: {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [
                rehypeAutolinkHeadings,
                {
                  behavior: "append",
                  properties: { className: ["heading-anchor"] },
                  content: { type: "text", value: " #" },
                },
              ],
            ],
          },
        },
      });

      const frontmatter = parsed.data as Frontmatter;
      return {
        title: frontmatter.title ?? "未命名文档",
        description: frontmatter.description ?? "",
        updatedAt: frontmatter.updatedAt ?? "2026-05",
        toc,
        content,
      };
    } catch {
      // Try next candidate path.
    }
  }

  return null;
}
