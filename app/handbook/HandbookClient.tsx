"use client";

import dynamic from "next/dynamic";

const PDFReader = dynamic(() => import("@/components/pdf/PDFReader"), {
  ssr: false,
  loading: () => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--text-secondary)" }}>Loading PDF Reader...</p>
    </div>
  ),
});

export default function HandbookClient() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "var(--cream)",
        position: "relative",
      }}
    >
      <PDFReader />
    </main>
  );
}
