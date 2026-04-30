"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import dynamic from "next/dynamic";
import { useUsageStats } from "@/hooks/useUsageStats";

const UsageLineChart = dynamic(() => import("@/components/charts/UsageLineChart").then((m) => m.UsageLineChart), { ssr: false });
const UsageBarChart = dynamic(() => import("@/components/charts/UsageBarChart").then((m) => m.UsageBarChart), { ssr: false });

export default function UsagePage() {
  const { data = [] } = useUsageStats("7d");
  const barData = [
    { model: "Auto", calls: 14200 },
    { model: "GPT-5", calls: 8600 },
    { model: "Claude", calls: 6500 },
    { model: "Qwen", calls: 4900 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">用量监控</h2>
        <Button variant="secondary">导出 CSV</Button>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h3 className="mb-3 text-lg font-semibold">每日消耗趋势</h3>
          <UsageLineChart data={data} />
        </Card>
        <Card>
          <h3 className="mb-3 text-lg font-semibold">实时监控</h3>
          <ul className="space-y-3 text-sm text-zinc-300">
            <li>最近 5 分钟 QPS: 22.1</li>
            <li>活跃 Key: 8</li>
            <li>错误率: 0.24%</li>
          </ul>
        </Card>
      </div>
      <Card>
        <h3 className="mb-3 text-lg font-semibold">模型调用分布</h3>
        <UsageBarChart data={barData} />
      </Card>
    </div>
  );
}
