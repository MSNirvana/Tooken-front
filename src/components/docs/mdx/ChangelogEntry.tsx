import type { ReactNode } from "react";

type ChangelogEntryProps = {
  version: string;
  date: string;
  children?: ReactNode;
};

export function ChangelogEntry({ version, date, children }: ChangelogEntryProps) {
  return (
    <article className="my-4 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-4">
      <div className="text-xs text-[var(--text-muted)]">
        {version} · {date}
      </div>
      <div className="mt-1 text-sm text-[var(--text-secondary)]">{children}</div>
    </article>
  );
}
