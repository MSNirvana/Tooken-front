"use client";

import { useState } from "react";

export function DocFeedback() {
  const [submitted, setSubmitted] = useState<null | "up" | "down">(null);

  return (
    <div className="mt-10 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-3">
      {submitted ? (
        <p className="text-sm text-[var(--text-secondary)]">感谢反馈，我们会继续优化文档体验。</p>
      ) : (
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="text-[var(--text-secondary)]">这篇文档是否有帮助？</span>
          <button
            type="button"
            onClick={() => setSubmitted("up")}
            className="rounded-md border border-[var(--border-default)] px-2.5 py-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            👍 有帮助
          </button>
          <button
            type="button"
            onClick={() => setSubmitted("down")}
            className="rounded-md border border-[var(--border-default)] px-2.5 py-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            👎 待改进
          </button>
        </div>
      )}
    </div>
  );
}
