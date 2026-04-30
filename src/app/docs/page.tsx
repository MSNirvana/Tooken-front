import { ShikiCode } from "@/components/ui/ShikiCode";

const quickStartCode = `import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.TOOKEN_API_KEY,
  baseURL: "https://api.tooken.ai/v1",
});

const completion = await client.chat.completions.create({
  model: "auto",
  messages: [{ role: "user", content: "Hello Tooken" }],
});`;

export default function DocsHomePage() {
  return (
    <article className="space-y-5">
      <h1 className="text-3xl font-bold">文档中心</h1>
      <p className="text-zinc-300">这里提供 Tooken 的快速上手、模型路由、账单和 API 参考文档。</p>
      <ShikiCode code={quickStartCode} lang="ts" />
    </article>
  );
}
