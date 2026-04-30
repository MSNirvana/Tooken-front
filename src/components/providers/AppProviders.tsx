"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useMemo, useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/lib/web3/config";
import zhMessages from "@/messages/zh.json";
import enMessages from "@/messages/en.json";
import { LocaleContextProvider, useLocaleContext } from "@/components/providers/LocaleContext";

function InnerProviders({ children }: PropsWithChildren) {
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
  const { locale } = useLocaleContext();
  const messages = useMemo(() => (locale === "zh" ? zhMessages : enMessages), [locale]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Shanghai">
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </WagmiProvider>
    </NextIntlClientProvider>
  );
}

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <LocaleContextProvider>
      <InnerProviders>{children}</InnerProviders>
    </LocaleContextProvider>
  );
}
