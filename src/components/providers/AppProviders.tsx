"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/lib/web3/config";
import zhMessages from "@/messages/zh.json";

export function AppProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <NextIntlClientProvider locale="zh" messages={zhMessages} timeZone="Asia/Shanghai">
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </WagmiProvider>
    </NextIntlClientProvider>
  );
}
