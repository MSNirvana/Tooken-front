import { DocsNavbar } from "@/components/docs/layout/DocsNavbar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="docs-theme min-h-screen">
      <DocsNavbar />
      <div>{children}</div>
    </div>
  );
}
