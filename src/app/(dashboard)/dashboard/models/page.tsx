"use client";

import { useMemo } from "react";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useModelsStore } from "@/store/useModelsStore";

export default function ModelsPage() {
  const { models, searchQuery, setSearch } = useModelsStore();
  const filtered = useMemo(
    () =>
      models.filter(
        (m) => m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.provider.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [models, searchQuery],
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">模型市场</h2>
      <Input placeholder="搜索模型或厂商..." value={searchQuery} onChange={(e) => setSearch(e.target.value)} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((model) => (
          <Card key={model.id}>
            <p className="text-xs text-zinc-400">{model.provider}</p>
            <h3 className="mt-1 text-lg font-semibold">{model.name}</h3>
            <p className="mt-2 text-sm text-zinc-300">上下文：{model.context}</p>
            <p className="text-sm text-amber-300">{model.creditsPer1k} Credits / 1K Tokens</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
