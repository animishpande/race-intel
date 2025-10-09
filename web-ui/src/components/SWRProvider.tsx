"use client";
import { SWRConfig } from "swr";
import { swrConfig } from "@/swrConfig";

export default function SWRProvider({ children }: { children: React.ReactNode }) {
  return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
}
    