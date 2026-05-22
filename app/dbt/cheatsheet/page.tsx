import type { Metadata } from "next";
import CheatsheetClient from "./CheatsheetClient";

export const metadata: Metadata = {
  title: "DBT Skills Cheatsheet | Anchorleaf",
  description: "A quick-reference, printable cheatsheet for all standard DBT acronyms and skills.",
};

export default function CheatsheetPage() {
  return <CheatsheetClient />;
}
