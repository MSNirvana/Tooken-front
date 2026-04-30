import { CodeBlock } from "@/components/ui/CodeBlock";

const leftCode = `from openai import OpenAI
client = OpenAI(api_key="sk-xx", base_url="https://api.openai.com/v1")
resp = client.chat.completions.create(model="gpt-5", messages=[...])`;

const rightCode = `from openai import OpenAI
client = OpenAI(api_key="tk-xx", base_url="https://api.tooken.ai/v1")
resp = client.chat.completions.create(model="auto", messages=[...])`;

export function CodeCompare() {
  return (
    <section className="container-shell grid gap-4 pb-20 md:grid-cols-2">
      <CodeBlock code={leftCode} language="python / old" />
      <CodeBlock code={rightCode} language="python / tooken" />
    </section>
  );
}
