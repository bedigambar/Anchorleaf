import type { Metadata } from "next";
import DBTClient from "./DBTClient";

export const metadata: Metadata = {
  title: "DBT Skills Toolkit | Anchorleaf",
  description: "Explore core Dialectical Behavior Therapy skills across the four modules: Mindfulness, Distress Tolerance, Emotion Regulation, and Interpersonal Effectiveness.",
};

export default function DBTPage() {
  return <DBTClient />;
}
