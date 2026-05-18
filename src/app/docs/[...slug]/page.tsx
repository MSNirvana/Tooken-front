import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocFeedback } from "@/components/docs/DocFeedback";
import { FooterNav } from "@/components/docs/layout/FooterNav";
import { Sidebar } from "@/components/docs/layout/Sidebar";
import { TableOfContents } from "@/components/docs/layout/TableOfContents";
import { getPrevNextDoc } from "@/docs/navigation";
import { getDocBySlug } from "@/lib/docs/mdx";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await params;
  const doc = await getDocBySlug(resolved.slug);
  return {
    title: doc ? `${doc.title} | Tooken 文档` : "Tooken 文档",
    description: doc?.description ?? "Tooken 官方文档",
  };
}

export default async function DocsDetailPage({ params }: Props) {
  const resolved = await params;
  const doc = await getDocBySlug(resolved.slug);
  if (!doc) {
    notFound();
  }

  const currentHref = `/docs/${resolved.slug.join("/")}`;
  const { prev, next } = getPrevNextDoc(currentHref);

  return (
    <div className="docs-container flex gap-8 py-8">
      <Sidebar />
      <article className="prose-docs w-full max-w-[720px] min-w-0">
        <header className="mb-8 border-b border-[var(--border-subtle)] pb-5">
          <h1>{doc.title}</h1>
          {doc.description ? <p className="mt-2 text-[var(--text-secondary)]">{doc.description}</p> : null}
          <div className="mt-3 text-xs text-[var(--text-muted)]">最后更新：{doc.updatedAt}</div>
        </header>
        <div>{doc.content}</div>
        <DocFeedback />
        <FooterNav prev={prev} next={next} />
      </article>
      <TableOfContents items={doc.toc} />
    </div>
  );
}
