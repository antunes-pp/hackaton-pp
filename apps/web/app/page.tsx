import type { Metadata } from "next";

import { FlowBuilder } from "@/components/builder/flow-builder";

export const metadata: Metadata = {
  title: "AI Chat Copilot Builder",
  description: "Build custom AI chat flows with a visual node editor",
};

export default function HomePage() {
  return (
    <section className="w-full min-h-screen">
      <FlowBuilder />
    </section>
  );
}
