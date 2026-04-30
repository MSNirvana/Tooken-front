"use client";

import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

type Locale = "zh" | "en";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleContextProvider({ children }: PropsWithChildren) {
  const [locale, setLocaleState] = useState<Locale>("zh");

  useEffect(() => {
    const saved = localStorage.getItem("tooken_locale");
    if (saved === "zh" || saved === "en") {
      setLocaleState(saved);
      return;
    }
    const browser = navigator.language.toLowerCase();
    setLocaleState(browser.startsWith("zh") ? "zh" : "en");
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    localStorage.setItem("tooken_locale", next);
  };

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      toggleLocale: () => setLocale(locale === "zh" ? "en" : "zh"),
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocaleContext() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocaleContext must be used within LocaleContextProvider");
  }
  return context;
}
