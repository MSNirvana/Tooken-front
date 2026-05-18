import type { ReactNode } from "react";
import { Badge } from "@/components/docs/mdx/Badge";

type ParamTableProps = {
  children: ReactNode;
};

type ParamProps = {
  name: string;
  type: string;
  required?: boolean;
  children?: ReactNode;
};

export function ParamTable({ children }: ParamTableProps) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-[var(--border-default)]">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-[var(--bg-subtle)] text-left">
          <tr>
            <th className="px-3 py-2">参数</th>
            <th className="px-3 py-2">类型</th>
            <th className="px-3 py-2">说明</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function Param({ name, type, required, children }: ParamProps) {
  return (
    <tr className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] align-top">
      <td className="px-3 py-2">
        <div className="font-mono text-[var(--text-primary)]">{name}</div>
        <div className="mt-1">
          <Badge type={required ? "required" : "optional"}>{required ? "必填" : "可选"}</Badge>
        </div>
      </td>
      <td className="px-3 py-2 font-mono text-xs text-[var(--text-secondary)]">{type}</td>
      <td className="px-3 py-2 text-[var(--text-secondary)]">{children}</td>
    </tr>
  );
}
