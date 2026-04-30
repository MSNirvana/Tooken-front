"use client";

import dynamic from "next/dynamic";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";

const WalletConnectButton = dynamic(
  () => import("@/components/wallet/WalletConnectButton").then((m) => m.WalletConnectButton),
  { ssr: false },
);

export default function WalletPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Agent 钱包</h2>
        <WalletConnectButton />
      </div>
      <Card>
        <p className="text-sm text-zinc-400">钱包地址</p>
        <p className="mt-2 font-mono text-sm text-zinc-200">0x1a2b...cd4e</p>
      </Card>
      <Card>
        <h3 className="mb-2 text-lg font-semibold">预算使用率</h3>
        <ProgressBar value={62} />
        <p className="mt-2 text-sm text-zinc-400">62,000 / 100,000 Credits</p>
      </Card>
    </div>
  );
}
