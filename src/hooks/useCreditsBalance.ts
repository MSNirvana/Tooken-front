"use client";

import { useQuery } from "@tanstack/react-query";

export const useCreditsBalance = () =>
  useQuery({
    queryKey: ["credits-balance"],
    queryFn: async () => ({ credits: 128400 }),
    refetchInterval: 30_000,
  });
