import type { ComponentType } from "react";
import { CodeBlock } from "@/components/docs/mdx/CodeBlock";
import { CodeTabs } from "@/components/docs/mdx/CodeTabs";
import { Callout } from "@/components/docs/mdx/Callout";
import { Param, ParamTable } from "@/components/docs/mdx/ParamTable";
import { ChangelogEntry } from "@/components/docs/mdx/ChangelogEntry";

type MdxComponents = Record<string, ComponentType<any>>;

function PreBlock(props: {
  children?: {
    props?: {
      className?: string;
      children?: string;
    };
  };
}) {
  const className = props.children?.props?.className ?? "";
  const language = className.replace("language-", "") || "text";
  const code = props.children?.props?.children ?? "";
  return <CodeBlock language={language}>{code}</CodeBlock>;
}

export const mdxComponents: MdxComponents = {
  ul: (props) => <ul className="list-disc space-y-1 pl-6" {...props} />,
  ol: (props) => <ol className="list-decimal space-y-1 pl-6" {...props} />,
  a: (props) => <a className="text-orange-600 underline underline-offset-4" {...props} />,
  pre: PreBlock,
  CodeBlock,
  CodeTabs,
  Callout,
  ParamTable,
  Param,
  ChangelogEntry,
};
