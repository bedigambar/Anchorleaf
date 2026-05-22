"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Leaf,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  BookOpen,
  Layers,
  Wrench,
  Info,
  CalendarCheck,
  Search,
  type LucideIcon,
} from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  icon: LucideIcon;
  accent?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: "Learn", href: "/learn", icon: BookOpen },
  { label: "DBT Skills", href: "/dbt", icon: Layers },
  { label: "Handbook", href: "/handbook", icon: BookOpen },
  { label: "Tools", href: "/tools", icon: Wrench },
  { label: "Journal", href: "/journal", icon: CalendarCheck },
  { label: "About", href: "/about", icon: Info },
];

const SPRING_SMOOTH = { type: "spring" as const, stiffness: 380, damping: 32, mass: 0.8 };

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const isHome = pathname === "/";
  const showDocked = scrolled || !isHome;

  const isActive = useMemo(
    () => (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname === href || pathname.startsWith(href + "/");
    },
    [pathname]
  );

  function openCommandPalette() {
    window.dispatchEvent(new CustomEvent("anchorleaf:open-palette"));
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.06, delayChildren: reduceMotion ? 0 : 0.18 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
  };

  if (pathname === "/handbook") return null;

  return (
    <>
      <nav
        aria-label="Primary"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          className="nav-inner-dock"
          style={{
            width: showDocked ? "calc(100% - 48px)" : "100%",
            maxWidth: showDocked ? "1100px" : "100%",
            height: showDocked ? "58px" : "70px",
            marginTop: showDocked ? "18px" : "0px",
            background: showDocked ? "rgba(253, 248, 243, 0.78)" : "transparent",
            backdropFilter: showDocked ? "blur(18px) saturate(140%)" : "none",
            WebkitBackdropFilter: showDocked ? "blur(18px) saturate(140%)" : "none",
            borderRadius: showDocked ? "9999px" : "0px",
            border: showDocked
              ? "1px solid rgba(92, 138, 94, 0.18)"
              : "1px solid transparent",
            boxShadow: showDocked
              ? "0 14px 36px rgba(28, 35, 28, 0.10), 0 2px 6px rgba(0, 0, 0, 0.025), inset 0 1px 0 rgba(255,255,255,0.55)"
              : "none",
            transition:
              "width 0.6s cubic-bezier(0.22, 1, 0.36, 1), max-width 0.6s cubic-bezier(0.22, 1, 0.36, 1), height 0.6s cubic-bezier(0.22, 1, 0.36, 1), margin-top 0.6s cubic-bezier(0.22, 1, 0.36, 1), background 0.45s ease, backdrop-filter 0.45s ease, border-radius 0.6s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.45s ease, box-shadow 0.6s cubic-bezier(0.22, 1, 0.36, 1), padding 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            padding: showDocked ? "0 18px" : "0 32px",
            display: "flex",
            alignItems: "center",
            pointerEvents: "auto",
          }}
        >
          <div
            className="container-wide"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Link
              href="/"
              aria-label="Anchorleaf: home"
              className="nav-logo"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
                textDecoration: "none",
                padding: "6px 4px 6px 0",
              }}
            >
              <motion.span
                aria-hidden
                whileHover={reduceMotion ? undefined : { rotate: -14, scale: 1.12 }}
                transition={{ type: "spring", stiffness: 320, damping: 14 }}
                style={{
                  display: "inline-flex",
                  color: "var(--sage)",
                  filter: showDocked ? "none" : "drop-shadow(0 1px 6px rgba(0,0,0,0.3))",
                }}
              >
                <Leaf size={20} strokeWidth={1.5} />
              </motion.span>
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.22rem",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  color: showDocked ? "var(--text-primary)" : "var(--text-on-dark)",
                  textShadow: showDocked ? "none" : "0 1px 8px rgba(0,0,0,0.25)",
                  transition: "color 0.4s ease, text-shadow 0.4s ease",
                }}
              >
                Anchorleaf
              </span>
            </Link>

            <motion.div
              className="hidden-mobile"
              style={{ display: "flex", alignItems: "center", gap: "4px" }}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <motion.div
                    key={link.href}
                    variants={itemVariants}
                    style={{ position: "relative" }}
                  >
                    {active && (
                      <motion.span
                        aria-hidden
                        layoutId="nav-active-pill"
                        transition={SPRING_SMOOTH}
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: showDocked
                            ? "var(--sage-light)"
                            : "rgba(254, 250, 245, 0.18)",
                          border: showDocked
                            ? "1px solid rgba(92, 138, 94, 0.22)"
                            : "1px solid rgba(254, 250, 245, 0.28)",
                          borderRadius: "var(--radius-full)",
                          zIndex: 0,
                        }}
                      />
                    )}
                    <Link
                      href={link.href}
                      className="nav-link"
                      data-accent={link.accent ? "true" : undefined}
                      style={{
                        position: "relative",
                        zIndex: 1,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: active ? 600 : 500,
                        fontSize: "0.88rem",
                        letterSpacing: "0.005em",
                        color: active
                          ? showDocked
                            ? "var(--sage-dark)"
                            : "var(--text-on-dark)"
                          : showDocked
                            ? "var(--text-secondary)"
                            : "rgba(254, 250, 245, 0.85)",
                        textDecoration: "none",
                        padding: "8px 14px",
                        borderRadius: "var(--radius-full)",
                        transition: "color 0.25s ease",
                      }}
                    >
                      {link.label}
                      {link.accent && (
                        <span
                          aria-hidden
                          className="nav-sparkle"
                          style={{
                            display: "inline-flex",
                            color: active
                              ? "var(--sage-dark)"
                              : showDocked
                                ? "var(--sage)"
                                : "var(--gold)",
                            transition: "color 0.25s ease",
                          }}
                        >
                          <Icon size={12} strokeWidth={1.75} />
                        </span>
                      )}
                      <span
                        aria-hidden
                        className="nav-underline"
                        style={{
                          position: "absolute",
                          left: 14,
                          right: 14,
                          bottom: 5,
                          height: "1.5px",
                          background: "currentColor",
                          transform: "scaleX(0)",
                          transformOrigin: "left center",
                          transition: "transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)",
                          opacity: active ? 0 : 0.7,
                          borderRadius: "1px",
                        }}
                      />
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div variants={itemVariants} style={{ marginLeft: "6px" }}>
                <button
                  type="button"
                  onClick={openCommandPalette}
                  className="nav-search"
                  aria-label="Search the site"
                  title="Search (⌘K / Ctrl+K)"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 12px 8px 14px",
                    borderRadius: "var(--radius-full)",
                    border: showDocked
                      ? "1px solid rgba(92, 138, 94, 0.22)"
                      : "1px solid rgba(254, 250, 245, 0.28)",
                    background: showDocked
                      ? "rgba(253, 248, 243, 0.6)"
                      : "rgba(254, 250, 245, 0.08)",
                    color: showDocked ? "var(--text-secondary)" : "rgba(254, 250, 245, 0.85)",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                    transition: "all 0.22s ease",
                  }}
                >
                  <Search size={13} strokeWidth={1.75} />
                  <span className="nav-search-label">Search</span>
                  <kbd
                    style={{
                      fontFamily: "inherit",
                      fontSize: "0.7rem",
                      padding: "1px 6px",
                      borderRadius: "5px",
                      background: showDocked
                        ? "rgba(92, 138, 94, 0.12)"
                        : "rgba(254, 250, 245, 0.14)",
                      border: showDocked
                        ? "1px solid rgba(92, 138, 94, 0.2)"
                        : "1px solid rgba(254, 250, 245, 0.22)",
                      color: showDocked ? "var(--sage-dark)" : "rgba(254, 250, 245, 0.9)",
                    }}
                  >
                    ⌘K
                  </kbd>
                </button>
              </motion.div>
            </motion.div>

            <button
              className="show-mobile"
              onClick={() => setMenuOpen(true)}
              style={{
                background: showDocked ? "var(--sage-light)" : "rgba(254,250,245,0.12)",
                border: showDocked
                  ? "1px solid rgba(92, 138, 94, 0.22)"
                  : "1px solid rgba(254, 250, 245, 0.28)",
                cursor: "pointer",
                color: showDocked ? "var(--sage-dark)" : "var(--text-on-dark)",
                display: "none",
                width: "40px",
                height: "40px",
                borderRadius: "var(--radius-full)",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.25s ease",
              }}
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "linear-gradient(180deg, #16162a 0%, var(--navy) 60%, #20203a 100%)",
              zIndex: 200,
              display: "flex",
              flexDirection: "column",
              padding: "28px 28px 32px",
            }}
          >
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background:
                  "radial-gradient(circle at 20% 25%, rgba(212,232,194,0.10) 0px, transparent 45%), radial-gradient(circle at 80% 80%, rgba(200,184,232,0.08) 0px, transparent 40%)",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "56px",
                position: "relative",
              }}
            >
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                style={{ textDecoration: "none" }}
              >
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.25rem",
                    color: "var(--text-on-dark)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "9px",
                  }}
                >
                  <Leaf size={20} strokeWidth={1.5} style={{ color: "var(--sage-light)" }} />
                  Anchorleaf
                </motion.span>
              </Link>
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                style={{
                  background: "rgba(254, 250, 245, 0.08)",
                  border: "1px solid rgba(254, 250, 245, 0.18)",
                  cursor: "pointer",
                  color: "var(--text-on-dark)",
                  width: "40px",
                  height: "40px",
                  borderRadius: "var(--radius-full)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={20} strokeWidth={1.5} />
              </motion.button>
            </div>

            <motion.nav
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07, delayChildren: 0.18 } },
              }}
              initial="hidden"
              animate="visible"
              style={{ display: "flex", flexDirection: "column", gap: "6px", position: "relative" }}
            >
              {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <motion.div
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
                      },
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "18px 4px",
                        borderBottom: "1px solid rgba(254, 250, 245, 0.08)",
                        textDecoration: "none",
                        color: active ? "var(--sage-light)" : "var(--text-on-dark)",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "14px",
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "1.85rem",
                          fontWeight: active ? 700 : 400,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        <Icon
                          size={18}
                          strokeWidth={1.5}
                          style={{
                            color: active ? "var(--sage-light)" : "rgba(254, 250, 245, 0.55)",
                          }}
                        />
                        {link.label}
                      </span>
                      {active && (
                        <motion.span
                          layoutId="mobile-nav-active"
                          transition={SPRING_SMOOTH}
                          aria-hidden
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: "var(--sage-light)",
                            boxShadow: "0 0 14px rgba(212, 232, 194, 0.6)",
                          }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              style={{ marginTop: "auto", position: "relative" }}
            >
              <p
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "1.1rem",
                  color: "rgba(254, 250, 245, 0.65)",
                  marginBottom: "14px",
                  textAlign: "center",
                }}
              >
                you can be rooted and still grow
              </p>
              <Link
                href="/dbt"
                className="btn-primary"
                onClick={() => setMenuOpen(false)}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "16px 28px",
                  borderRadius: "var(--radius-full)",
                }}
              >
                Begin Journey
                <ArrowRight size={16} strokeWidth={1.75} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 880px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        .nav-link:hover .nav-underline { transform: scaleX(1) !important; }
        .nav-link:focus-visible { outline: 2px solid var(--sage); outline-offset: 3px; border-radius: var(--radius-full); }
        .nav-link[data-accent="true"]:hover .nav-sparkle { transform: rotate(18deg) scale(1.15); }
        .nav-sparkle { transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), color 0.25s ease; transform-origin: center; }
        .nav-cta:hover .nav-cta-arrow { transform: translateX(3px); }
        .nav-search:hover {
          background: var(--sage-light) !important;
          border-color: rgba(92, 138, 94, 0.4) !important;
          color: var(--sage-dark) !important;
        }
        .nav-search:focus-visible {
          outline: 2px solid var(--sage);
          outline-offset: 3px;
        }
        @media (max-width: 1080px) {
          .nav-search-label { display: none; }
        }
        .nav-cta-arrow { transition: transform 0.25s ease; }
        @media (prefers-reduced-motion: reduce) {
          .nav-link .nav-underline,
          .nav-sparkle,
          .nav-cta-arrow {
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
