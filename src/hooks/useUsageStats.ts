"use client";

import { useQuery } from "@tanstack/react-query";

const mockData = [
  { date: "04-23", credits: 3200 },
  { date: "04-24", credits: 3600 },
  { date: "04-25", credits: 4200 },
  { date: "04-26", credits: 3900 },
  { date: "04-27", credits: 4700 },
  { date: "04-28", credits: 5200 },
  { date: "04-29", credits: 4980 },
];

export const useUsageStats = (range: "7d" | "30d") =>
  useQuery({
    queryKey: ["usage", range],
    queryFn: async () => mockData,
    refetchInterval: 60_000,
  });
