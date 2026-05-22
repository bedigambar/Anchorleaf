"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PillarCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  accent: string;
  bg: string;
  href: string;
}

export default function PillarCard({ icon, title, desc, accent, bg, href }: PillarCardProps) {
  return (
    <Link
      href={href}
      className="pillar-card"
      style={{
        display: "block",
        textDecoration: "none",
        position: "relative",
        overflow: "hidden",
        "--accent-color": accent,
      } as React.CSSProperties}
    >
      <div
        className="pillar-top-stripe"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: accent,
          opacity: 0.18,
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      <div className="pillar-icon" style={{ color: accent, marginBottom: "16px" }}>{icon}</div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 400, color: "var(--text-primary)", marginBottom: "10px" }}>{title}</h3>
      <p className="body-sm" style={{ color: "var(--text-muted)", marginBottom: "16px" }}>{desc}</p>
      <span className="pillar-explore-link" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.85rem", fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
        Explore <span className="pillar-arrow" style={{ display: "inline-flex" }}><ArrowRight size={14} strokeWidth={1.5} /></span>
      </span>
    </Link>
  );
}
