import type { Metadata } from "next";
import ToolsClient from "./ToolsClient";

export const metadata: Metadata = {
  title: "DBT Crisis & Grounding Tools | Anchorleaf",
  description: "Concrete grounding exercises, box breathing, mammalian dive reflex, and crisis resources for immediate distress tolerance and anxiety relief.",
};

export default function ToolsPage() {
  return <ToolsClient />;
}
