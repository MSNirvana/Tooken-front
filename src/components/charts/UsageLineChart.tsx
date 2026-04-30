"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface UsagePoint {
  date: string;
  credits: number;
}

interface UsageLineChartProps {
  data: UsagePoint[];
}

export function UsageLineChart({ data }: UsageLineChartProps) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey="date" tick={{ fill: "#a1a1b5", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#a1a1b5", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: "#111118", border: "1px solid rgba(251,191,36,0.2)" }} />
          <Area type="monotone" dataKey="credits" stroke="#fbbf24" strokeWidth={2} fill="url(#usageGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
