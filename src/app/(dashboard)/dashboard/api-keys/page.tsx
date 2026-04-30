"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiKeys } from "@/hooks/useApiKeys";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";

const schema = z.object({
  name: z.string().min(3, "Key 名称至少 3 位"),
  monthlyLimit: z.number().min(0, "不能小于 0"),
});

type FormValues = z.infer<typeof schema>;

export default function ApiKeysPage() {
  const { data } = useApiKeys();
  const [newKey, setNewKey] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", monthlyLimit: 0 },
  });

  const onCreate = handleSubmit((values) => {
    setNewKey(`tk-${values.name.slice(0, 4)}-${Math.random().toString(36).slice(2, 10)}`);
    reset();
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">API Keys</h2>
        <Modal trigger={<Button>+ 创建新 Key</Button>} title="创建新 API Key" description="完整 Key 仅显示一次，请及时保存。">
          <form onSubmit={onCreate} className="space-y-3">
            <div>
              <Input placeholder="agent-001" {...register("name")} />
              {errors.name ? <p className="mt-1 text-xs text-red-300">{errors.name.message}</p> : null}
            </div>
            <div>
              <Input type="number" placeholder="月上限 Credits（0=无上限）" {...register("monthlyLimit", { valueAsNumber: true })} />
              {errors.monthlyLimit ? <p className="mt-1 text-xs text-red-300">{errors.monthlyLimit.message}</p> : null}
            </div>
            <Button type="submit" className="w-full">
              创建
            </Button>
          </form>
          {newKey ? (
            <div className="mt-4 rounded-xl border border-amber-300/30 bg-black/20 p-3">
              <p className="text-xs text-zinc-400">新 Key（仅此一次）</p>
              <p className="mt-1 break-all font-mono text-sm text-amber-200">{newKey}</p>
            </div>
          ) : null}
        </Modal>
      </div>
      <div className="space-y-3">
        {data?.map((key) => {
          const pct = key.monthlyLimit ? (key.monthlyUsed / key.monthlyLimit) * 100 : 0;
          return (
            <Card key={key.id}>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold">{key.name}</h3>
                <span className="text-sm text-zinc-400">{key.keyPreview}</span>
              </div>
              <ProgressBar value={pct} />
              <p className="mt-2 text-xs text-zinc-400">
                {key.monthlyUsed} / {key.monthlyLimit} Credits
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
