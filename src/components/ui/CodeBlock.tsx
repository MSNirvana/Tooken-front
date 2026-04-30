"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d0d14] p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide text-zinc-400">{language}</span>
        <Button variant="ghost" className="h-7 px-2 text-xs" onClick={onCopy}>
          {copied ? "已复制" : "复制"}
        </Button>
      </div>
      <pre className="overflow-x-auto text-sm leading-6 text-zinc-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}
