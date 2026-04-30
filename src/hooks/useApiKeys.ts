"use client";

import { useQuery } from "@tanstack/react-query";

const mockKeys = [
  { id: "k1", name: "production-agent-001", keyPreview: "sk-...ab12", monthlyUsed: 32000, monthlyLimit: 50000, status: "active" },
  { id: "k2", name: "test-agent-02", keyPreview: "sk-...cd34", monthlyUsed: 9800, monthlyLimit: 20000, status: "active" },
];

export const useApiKeys = () =>
  useQuery({
    queryKey: ["api-keys"],
    queryFn: async () => mockKeys,
  });
