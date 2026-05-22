import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Anchorleaf | Our Mission, Ethics & Origin",
  description: "Learn about the mission behind Anchorleaf: a calm, ad-free, scientifically grounded DBT companion for BPD, honoring the work of Dr. Marsha Linehan.",
};

export default function AboutPage() {
  return <AboutClient />;
}
