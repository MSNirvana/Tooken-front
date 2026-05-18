"use client";

import { useState } from "react";

type CodeBlockClientProps = {
  language: string;
  code: string;
  html: string;
};

export function CodeBlockClient({ language, code, html }: CodeBlockClientProps) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="code-block my-6 overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)]">
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)] px-3 py-2 text-xs">
        <span className="uppercase tracking-wide text-[var(--text-secondary)]">{language}</span>
        <button
          type="button"
          onClick={onCopy}
          className="rounded-md border border-[var(--border-default)] px-2 py-0.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          {copied ? "已复制" : "复制"}
        </button>
      </div>
      <div className="code-block-body" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
