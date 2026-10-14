import type { ReactNode } from "react";
import RootShell from "@/components/RootShell";
import { buildMetadata } from "@/lib/metadata";

export { viewport } from "@/lib/metadata";
export const metadata = buildMetadata("pt");

export default function RootLayout({ children }: { children: ReactNode }) {
  return <RootShell locale="pt">{children}</RootShell>;
}
