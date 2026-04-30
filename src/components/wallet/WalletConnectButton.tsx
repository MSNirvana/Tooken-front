"use client";

import { useMemo } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/Button";

function formatAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function WalletConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const injectedConnector = useMemo(() => connectors.find((item) => item.id === "injected"), [connectors]);

  if (isConnected && address) {
    return (
      <Button variant="secondary" onClick={() => disconnect()}>
        {formatAddress(address)} · 断开
      </Button>
    );
  }

  return (
    <Button
      variant="secondary"
      onClick={() => {
        if (injectedConnector) {
          connect({ connector: injectedConnector });
        }
      }}
      disabled={isPending || !injectedConnector}
    >
      {isPending ? "连接中..." : "Connect Wallet"}
    </Button>
  );
}
