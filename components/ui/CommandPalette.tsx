"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Command,
  Home,
  BookHeart,
  BookOpen,
  Layers,
  Sparkles,
  Wrench,
  Info,
  Search,
  CalendarCheck,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { SKILLS } from "@/lib/companion/skills";

interface PaletteItem {
  id: string;
  label: string;
  detail?: string;
  href: string;
  icon: LucideIcon;
  group: string;
  accent?: string;
  keywords?: string;
}

const PAGES: PaletteItem[] = [
  { id: "page-home", label: "Home", href: "/", icon: Home, group: "Pages" },
  { id: "page-learn", label: "Learn", detail: "Articles, myths & facts, glossary", href: "/learn", icon: BookHeart, group: "Pages" },
  { id: "page-dbt", label: "DBT Skills", detail: "All four pillars", href: "/dbt", icon: Layers, group: "Pages" },
  { id: "page-tools", label: "Tools", detail: "Grounding & crisis quick links", href: "/tools", icon: Wrench, group: "Pages" },
  { id: "page-handbook", label: "DBT Handbook", detail: "Read and search the DBT Skills Handbook", href: "/handbook", icon: BookOpen, group: "Pages" },
  { id: "page-journal", label: "Journal", detail: "Daily diary card", href: "/journal", icon: CalendarCheck, group: "Pages" },
  { id: "page-about", label: "About", detail: "What this is and isn't", href: "/about", icon: Info, group: "Pages" },
  { id: "page-cheatsheet", label: "Printable cheat sheet", href: "/dbt/cheatsheet", icon: Layers, group: "Pages" },
];

const ARTICLES: PaletteItem[] = [
  {
    id: "art-bpd",
    label: "What does BPD actually feel like?",
    href: "/learn/what-does-bpd-feel-like",
    icon: BookHeart,
    group: "Articles",
    accent: "#c87a5a",
  },
  {
    id: "art-marsha",
    label: "Who is Marsha Linehan?",
    href: "/learn/who-is-marsha-linehan",
    icon: BookHeart,
    group: "Articles",
    accent: "#5c8a5e",
  },
  {
    id: "art-intensity",
    label: "Understanding your emotional intensity",
    href: "/learn/understanding-emotional-intensity",
    icon: BookHeart,
    group: "Articles",
    accent: "#7a6eb8",
  },
  {
    id: "art-abandon",
    label: "Fear of abandonment, and how to work with it",
    href: "/learn/fear-of-abandonment",
    icon: BookHeart,
    group: "Articles",
    accent: "#5a8ab0",
  },
];

const SKILL_ITEMS: PaletteItem[] = SKILLS.map((s) => ({
  id: `skill-${s.id}`,
  label: s.name,
  detail: s.subtitle,
  href: s.pillar === "distress" ? "/dbt#distress-tolerance" : "/dbt#emotion-regulation",
  icon: Layers,
  group: "Skills",
  accent: s.pillar === "distress" ? "#c87a5a" : "#7a6eb8",
  keywords: s.when_to_use.join(" "),
}));

const ALL_ITEMS: PaletteItem[] = [...PAGES, ...SKILL_ITEMS, ...ARTICLES];

function fuzzyMatch(item: PaletteItem, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  const haystack = `${item.label} ${item.detail ?? ""} ${item.group} ${item.keywords ?? ""}`.toLowerCase();
  let i = 0;
  for (const ch of haystack) {
    if (ch === q[i]) i++;
    if (i === q.length) return true;
  }
  return haystack.includes(q);
}

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => ALL_ITEMS.filter((it) => fuzzyMatch(it, query)), [query]);

  const grouped = useMemo(() => {
    const map = new Map<string, PaletteItem[]>();
    for (const it of results) {
      const arr = map.get(it.group) ?? [];
      arr.push(it);
      map.set(it.group, arr);
    }
    return Array.from(map.entries());
  }, [results]);

  const flat = useMemo(() => grouped.flatMap(([, items]) => items), [grouped]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const cmdKey = isMac ? e.metaKey : e.ctrlKey;
      if (cmdKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    }
    function onOpenEvent() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("anchorleaf:open-palette", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("anchorleaf:open-palette", onOpenEvent);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 60);
      setQuery("");
      setActiveIdx(0);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  useEffect(() => {
    if (activeIdx >= flat.length) setActiveIdx(Math.max(0, flat.length - 1));
  }, [flat.length, activeIdx]);

  function commit(item: PaletteItem) {
    setOpen(false);
    router.push(item.href);
  }

  function onInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(flat.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = flat[activeIdx];
      if (item) commit(item);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(26, 26, 46, 0.45)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            zIndex: 250,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "120px 24px 24px",
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              width: "100%",
              maxWidth: "620px",
              background: "var(--warm-white)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-xl)",
              boxShadow: "0 24px 56px rgba(0,0,0,0.22), 0 4px 14px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px 22px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <Search size={18} strokeWidth={1.5} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIdx(0);
                }}
                onKeyDown={onInputKey}
                placeholder="Search skills, articles, pages..."
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1rem",
                  color: "var(--text-primary)",
                }}
              />
              <kbd
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.72rem",
                  color: "var(--text-muted)",
                  background: "var(--cream)",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  padding: "2px 8px",
                }}
              >
                Esc
              </kbd>
            </div>

            <div style={{ maxHeight: "60vh", overflowY: "auto", padding: "8px 0" }}>
              {flat.length === 0 ? (
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.92rem",
                    color: "var(--text-muted)",
                    textAlign: "center",
                    padding: "48px 20px",
                  }}
                >
                  Nothing matches &ldquo;{query}&rdquo;.
                </p>
              ) : (
                grouped.map(([groupName, items]) => (
                  <div key={groupName} style={{ padding: "8px 0" }}>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        padding: "4px 22px",
                      }}
                    >
                      {groupName}
                    </p>
                    {items.map((item) => {
                      const Icon = item.icon;
                      const flatIndex = flat.indexOf(item);
                      const active = flatIndex === activeIdx;
                      return (
                        <button
                          key={item.id}
                          onClick={() => commit(item)}
                          onMouseEnter={() => setActiveIdx(flatIndex)}
                          style={{
                            width: "100%",
                            background: active ? "var(--sage-light)" : "transparent",
                            border: "none",
                            padding: "10px 22px",
                            display: "flex",
                            alignItems: "center",
                            gap: "14px",
                            cursor: "pointer",
                            textAlign: "left",
                            transition: "background 0.12s ease",
                          }}
                        >
                          <span
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "var(--radius-sm)",
                              background: item.accent ? `${item.accent}1a` : "var(--cream)",
                              border: `1px solid ${item.accent ? item.accent + "33" : "var(--border)"}`,
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: item.accent ?? "var(--text-secondary)",
                              flexShrink: 0,
                            }}
                          >
                            <Icon size={14} strokeWidth={1.5} />
                          </span>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p
                              style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "0.92rem",
                                fontWeight: 500,
                                color: "var(--text-primary)",
                                lineHeight: 1.3,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {item.label}
                            </p>
                            {item.detail && (
                              <p
                                style={{
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontSize: "0.78rem",
                                  color: "var(--text-muted)",
                                  lineHeight: 1.4,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {item.detail}
                              </p>
                            )}
                          </div>
                          {active && (
                            <ArrowRight size={14} strokeWidth={1.5} style={{ color: "var(--sage-dark)", flexShrink: 0 }} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 22px",
                borderTop: "1px solid var(--border)",
                background: "var(--cream)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem",
                color: "var(--text-muted)",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                <Command size={11} strokeWidth={1.5} /> Command palette
              </span>
              <span>
                <kbd style={kbdStyle}>↑↓</kbd> navigate · <kbd style={kbdStyle}>↵</kbd> open
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const kbdStyle: React.CSSProperties = {
  background: "var(--warm-white)",
  border: "1px solid var(--border)",
  borderRadius: "4px",
  padding: "1px 6px",
  fontFamily: "inherit",
  fontSize: "0.72rem",
};
