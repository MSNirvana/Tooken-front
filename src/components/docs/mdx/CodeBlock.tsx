import { codeToHtml } from "shiki";
import { CodeBlockClient } from "@/components/docs/mdx/CodeBlockClient";

type CodeBlockProps = {
  language?: string;
  children?: string | string[];
};

function normalizeCode(code: string | string[] | undefined) {
  if (Array.isArray(code)) {
    return code.join("").replace(/\n$/, "");
  }
  if (typeof code !== "string") {
    return "";
  }
  return code.replace(/\n$/, "");
}

function normalizeLang(language: string) {
  const value = language.toLowerCase();
  if (value === "sh" || value === "shell") {
    return "bash";
  }
  if (value === "text" || value === "txt") {
    return "plaintext";
  }
  return value;
}

export async function CodeBlock({ language = "text", children }: CodeBlockProps) {
  const code = normalizeCode(children);
  const lang = normalizeLang(language);
  let html: string;
  try {
    html = await codeToHtml(code, {
      lang,
      theme: "github-light",
    });
  } catch {
    html = await codeToHtml(code, {
      lang: "plaintext",
      theme: "github-light",
    });
  }

  return <CodeBlockClient language={lang} code={code} html={html} />;
}
