"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import RoughNotation from "@/components/ui/RoughNotation";

export default function DBTBottomCTA() {
  return (
    <section style={{ background: "var(--navy)", padding: "100px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "30%", left: "15%", width: "250px", height: "250px", borderRadius: "50%", background: "rgba(92,138,94,0.08)", filter: "blur(50px)", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "20%", right: "10%", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(200,184,232,0.08)", filter: "blur(50px)", zIndex: 0 }} />

      <div className="container-narrow" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="h2" style={{ color: "var(--text-on-dark)", marginBottom: "16px" }}>
            Skills are only useful
            <br />
            if you <RoughNotation type="highlight" color="rgba(200, 184, 232, 0.32)" viewportDelay={800}>practice</RoughNotation> them.
          </h2>
          <p className="body-lg" style={{ color: "var(--text-on-dark-muted)", marginBottom: "40px" }}>
            Anchorleaf&apos;s DBT Handbook contains all worksheets
            and handouts in a fully searchable format, wherever you are.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/handbook" className="btn-primary">
              Open DBT Handbook <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
            <Link
              href="/dbt/cheatsheet"
              className="btn-ghost"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
              }}
            >
              <Download size={16} strokeWidth={1.5} />
              Open printable cheat sheet
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
