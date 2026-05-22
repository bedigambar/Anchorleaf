import type { Metadata } from "next";
import HandbookClient from "./HandbookClient";

export const metadata: Metadata = {
  title: "DBT Skills Handbook | Anchorleaf",
  description: "Read the comprehensive Dialectical Behavior Therapy (DBT) Skills Handbook, featuring mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness.",
};

export default function HandbookPage() {
  return <HandbookClient />;
}
