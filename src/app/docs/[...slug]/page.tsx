interface Props {
  params: Promise<{ slug: string[] }>;
}

export default async function DocsDetailPage({ params }: Props) {
  const resolved = await params;
  const title = resolved.slug.join(" / ");

  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-zinc-300">该章节内容可按产品文档继续扩展为 Markdown 渲染与目录高亮。</p>
    </article>
  );
}
