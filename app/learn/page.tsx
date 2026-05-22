import type { Metadata } from "next";
import LearnClient from "./LearnClient";

export const metadata: Metadata = {
  title: "Educational Hub: BPD & DBT Guides | Anchorleaf",
  description: "Browse articles, compassionate fact-checks on BPD myths, and a friendly DBT glossary to understand emotional intensity.",
};

export default function LearnPage() {
  return <LearnClient />;
}
