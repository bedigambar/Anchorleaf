import type { Metadata } from "next";
import JournalClient from "./JournalClient";

export const metadata: Metadata = {
  title: "Daily DBT Skill Journal | Anchorleaf",
  description: "Track your emotional intensity, log daily emotions, and record the DBT skills you used in a private, local-first mood journal.",
};

export default function JournalPage() {
  return <JournalClient />;
}
