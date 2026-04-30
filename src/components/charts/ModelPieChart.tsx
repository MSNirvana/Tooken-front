"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface PieItem {
  name: string;
  value: number;
}

const COLORS = ["#fbbf24", "#f59e0b", "#60a5fa", "#34d399", "#a78bfa"];

interface ModelPieChartProps {
  data: PieItem[];
}

export function ModelPieChart({ data }: ModelPieChartProps) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={90} innerRadius={56} paddingAngle={3}>
            {data.map((item, index) => (
              <Cell key={item.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: "#111118", border: "1px solid rgba(251,191,36,0.2)" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
