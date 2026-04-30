"use client";

import { Card } from "@/components/ui/Card";
import dynamic from "next/dynamic";
import { useUsageStats } from "@/hooks/useUsageStats";

const UsageLineChart = dynamic(() => import("@/components/charts/UsageLineChart").then((m) => m.UsageLineChart), { ssr: false });
const ModelPieChart = dynamic(() => import("@/components/charts/ModelPieChart").then((m) => m.ModelPieChart), { ssr: false });

const kpis = [
  { title: "本月消耗", value: "¥245.80", sub: "+12.3%" },
  { title: "Credits 余额", value: "128,400", sub: "≈ ¥898" },
  { title: "调用次数", value: "34,821", sub: "+8.1%" },
  { title: "节省金额", value: "¥1,204", sub: "vs 直接调用" },
];

export default function DashboardPage() {
  const { data = [] } = useUsageStats("7d");
  const pieData = [
    { name: "Auto", value: 42 },
    { name: "GPT-5", value: 26 },
    { name: "Claude", value: 18 },
    { name: "Qwen", value: 14 },
  ];

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold">Overview</h2>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => (
          <Card key={item.title}>
            <p className="text-sm text-zinc-400">{item.title}</p>
            <p className="mt-2 text-2xl font-bold">{item.value}</p>
            <p className="mt-1 text-xs text-amber-300">{item.sub}</p>
          </Card>
        ))}
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="mb-4 text-lg font-semibold">用量趋势（7天）</h3>
          <UsageLineChart data={data} />
        </Card>
        <Card>
          <h3 className="mb-4 text-lg font-semibold">模型分布</h3>
          <ModelPieChart data={pieData} />
        </Card>
      </section>
    </div>
  );
}
