"use client";

import PDFReader from "@/components/pdf/PDFReader";

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
