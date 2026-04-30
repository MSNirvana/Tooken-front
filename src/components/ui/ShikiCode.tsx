import { codeToHtml } from "shiki";

interface ShikiCodeProps {
  code: string;
  lang: string;
}

export async function ShikiCode({ code, lang }: ShikiCodeProps) {
  const html = await codeToHtml(code, {
    lang,
    theme: "github-dark",
  });

  return <div className="overflow-x-auto rounded-2xl border border-white/10" dangerouslySetInnerHTML={{ __html: html }} />;
}
