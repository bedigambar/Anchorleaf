"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Bookmark,
  BookmarkX,
  Search,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Download,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Loader2,
  ChevronDown,
  Moon,
  Sun,
  Eye,
  BookmarkCheck,
  Columns,
  Square,
} from "lucide-react";

interface OutlineItem {
  title: string;
  pageNumber: number | null;
  children?: OutlineItem[];
}

function getFallbackOutline(): OutlineItem[] {
  return [
    {
      title: "General Skills: Orienting to DBT",
      pageNumber: 1,
      children: [
        { title: "Introduction to DBT Skills", pageNumber: 3 },
        { title: "Goals of Skills Training", pageNumber: 8 },
        { title: "Guidelines for Skills Training", pageNumber: 10 },
        { title: "DBT Skills Training Agreement", pageNumber: 12 },
        { title: "Biosocial Model of Emotion Dysregulation", pageNumber: 16 }
      ]
    },
    {
      title: "Mindfulness Skills",
      pageNumber: 49,
      children: [
        { title: "Core Mindfulness Skills Overview", pageNumber: 51 },
        { title: "Wise Mind (Rational and Emotion Mind)", pageNumber: 53 },
        { title: "What Skills (Observe, Describe, Participate)", pageNumber: 56 },
        { title: "How Skills (Nonjudgmental, One-Mindful, Effective)", pageNumber: 62 },
        { title: "Loving-Kindness Practice", pageNumber: 70 }
      ]
    },
    {
      title: "Interpersonal Effectiveness Skills",
      pageNumber: 111,
      children: [
        { title: "Interpersonal Skills Overview", pageNumber: 113 },
        { title: "DEAR MAN (Obtaining Objectives)", pageNumber: 119 },
        { title: "GIVE (Keeping Relationships)", pageNumber: 125 },
        { title: "FAST (Keeping Self-Respect)", pageNumber: 129 },
        { title: "Evaluating Options (Should I Ask / Say No)", pageNumber: 133 },
        { title: "Troubleshooting Interpersonal Skills", pageNumber: 139 }
      ]
    },
    {
      title: "Emotion Regulation Skills",
      pageNumber: 201,
      children: [
        { title: "Emotion Regulation Overview", pageNumber: 203 },
        { title: "Understanding and Naming Emotions", pageNumber: 206 },
        { title: "Check the Facts", pageNumber: 218 },
        { title: "Opposite Action", pageNumber: 221 },
        { title: "Problem Solving", pageNumber: 228 },
        { title: "Accumulating Positive Emotions (Short/Long Term)", pageNumber: 231 },
        { title: "PLEASE Skills (Taking Care of Your Body)", pageNumber: 238 }
      ]
    },
    {
      title: "Distress Tolerance Skills",
      pageNumber: 321,
      children: [
        { title: "Crisis Survival Skills Overview", pageNumber: 323 },
        { title: "STOP Skill", pageNumber: 325 },
        { title: "TIPP Skills (Temperature, Intense Exercise, Breathing, PMR)", pageNumber: 328 },
        { title: "ACCEPTS (Distracting)", pageNumber: 331 },
        { title: "IMPROVE the Moment", pageNumber: 335 },
        { title: "Sensory Self-Soothing", pageNumber: 341 },
        { title: "Radical Acceptance", pageNumber: 344 },
        { title: "Turning the Mind & Willingness", pageNumber: 348 }
      ]
    }
  ];
}

const DBT_QUOTES = [
  "You cannot stop the waves, but you can learn to surf.",
  "You are doing the best you can, AND you can do better, try harder, and be more motivated.",
  "Wise Mind is the integration of Rational Mind and Emotion Mind.",
  "Pain is not optional; suffering is.",
  "Radical acceptance is accepting reality exactly as it is, without trying to fight it.",
  "Willingness is doing just what is needed in each situation, whole-heartedly."
];

export default function PDFReader() {
  const [libLoaded, setLibLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [zoom, setZoom] = useState(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [readingMode, setReadingMode] = useState<"light" | "sepia" | "dark">("light");
  const [isFitWidth, setIsFitWidth] = useState(false);
  const [isTwoPageView, setIsTwoPageView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsTwoPageView(false);
      }
      if (pdfDoc) {
        if (isFitWidth || window.innerWidth < 640) {
          handleFitWidth(window.innerWidth < 640 ? false : isTwoPageView);
        } else {
          handleFitPage(window.innerWidth < 640 ? false : isTwoPageView);
        }
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [pdfDoc, isFitWidth, isTwoPageView]);

  useEffect(() => {
    if (pdfDoc && !loading) {
      const timer = setTimeout(() => {
        handleFitPage();
        setIsFitWidth(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [pdfDoc, loading]);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, []);
  const [activeTab, setActiveTab] = useState<"toc" | "search" | "bookmarks">("toc");
  const [pdfOutline, setPdfOutline] = useState<OutlineItem[]>([]);
  const [expandedOutlineNodes, setExpandedOutlineNodes] = useState<Record<string, boolean>>({
    "Mindfulness Skills": true,
    "General Skills: Orienting to DBT": true,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [lastSearchedQuery, setLastSearchedQuery] = useState("");

  const [bookmarks, setBookmarks] = useState<number[]>([]);

  const [quote, setQuote] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement>(null);
  const viewportContainerRef = useRef<HTMLDivElement>(null);
  const renderTaskRef = useRef<any>(null);
  const rightRenderTaskRef = useRef<any>(null);

  useEffect(() => {
    const idx = Math.floor(Math.random() * DBT_QUOTES.length);
    setQuote(DBT_QUOTES[idx]);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("anchorleaf-dbt-bookmarks");
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleBookmark = () => {
    let updated;
    if (bookmarks.includes(pageNum)) {
      updated = bookmarks.filter((p) => p !== pageNum);
    } else {
      updated = [...bookmarks, pageNum].sort((a, b) => a - b);
    }
    setBookmarks(updated);
    localStorage.setItem("anchorleaf-dbt-bookmarks", JSON.stringify(updated));
  };

  useEffect(() => {
    if ((window as any).pdfjsLib) {
      setLibLoaded(true);
      initPdf((window as any).pdfjsLib);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.async = true;
    script.onload = () => {
      setLibLoaded(true);
      initPdf((window as any).pdfjsLib);
    };
    script.onerror = () => {
      setError("Failed to load PDF viewer library. Check your internet connection.");
      setLoading(false);
    };
    document.body.appendChild(script);
  }, []);

  const initPdf = (pdfjsLib: any) => {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    const pdfPath = "/DBT Skills, Training, Handouts and Worksheets.pdf";
    const loadingTask = pdfjsLib.getDocument(pdfPath);

    loadingTask.onProgress = (progressData: any) => {
      if (progressData.total > 0) {
        setLoadProgress(Math.round((progressData.loaded / progressData.total) * 100));
      }
    };

    loadingTask.promise.then(
      async (pdf: any) => {
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        setLoading(false);

        const parsedOutline = await parseOutline(pdf);
        setPdfOutline(parsedOutline);
      },
      (err: any) => {
        console.error("Failed to load PDF document:", err);
        setError("Failed to load the DBT handbook PDF. Please verify it is in public folder.");
        setLoading(false);
      }
    );
  };

  const parseOutline = async (pdf: any): Promise<OutlineItem[]> => {
    try {
      const rawOutline = await pdf.getOutline();
      if (!rawOutline || rawOutline.length === 0) {
        return getFallbackOutline();
      }

      const resolveItem = async (item: any): Promise<OutlineItem> => {
        let pageNum = null;
        if (item.dest) {
          try {
            if (typeof item.dest === "string") {
              const destArray = await pdf.getDestination(item.dest);
              if (destArray && destArray.length > 0) {
                pageNum = (await pdf.getPageIndex(destArray[0])) + 1;
              }
            } else if (Array.isArray(item.dest)) {
              pageNum = (await pdf.getPageIndex(item.dest[0])) + 1;
            } else if (typeof item.dest === "object") {
              pageNum = (await pdf.getPageIndex(item.dest)) + 1;
            }
          } catch (e) {
          }
        }

        const children: OutlineItem[] = [];
        if (item.items && item.items.length > 0) {
          for (const child of item.items) {
            children.push(await resolveItem(child));
          }
        }

        return {
          title: item.title,
          pageNumber: pageNum,
          children: children.length > 0 ? children : undefined,
        };
      };

      const resolvedOutline: OutlineItem[] = [];
      for (const item of rawOutline) {
        resolvedOutline.push(await resolveItem(item));
      }
      return resolvedOutline.length > 0 ? resolvedOutline : getFallbackOutline();
    } catch (e) {
      return getFallbackOutline();
    }
  };

  useEffect(() => {
    if (!pdfDoc || loading) return;
    let active = true;

    pdfDoc.getPage(pageNum).then((page: any) => {
      if (!active) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      const viewport = page.getViewport({ scale: zoom });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }

      const renderTask = page.render(renderContext);
      renderTaskRef.current = renderTask;

      renderTask.promise.then(
        () => {
          renderTaskRef.current = null;
        },
        (err: any) => {
          if (err.name !== "RenderingCancelledException") {
            console.error("PDF Render Error:", err);
          }
        }
      );
    });

    return () => {
      active = false;
    };
  }, [pdfDoc, pageNum, zoom, loading]);

  useEffect(() => {
    if (!pdfDoc || loading || !isTwoPageView || pageNum + 1 > numPages) {
      if (rightRenderTaskRef.current) {
        rightRenderTaskRef.current.cancel();
        rightRenderTaskRef.current = null;
      }
      return;
    }
    let active = true;

    pdfDoc.getPage(pageNum + 1).then((page: any) => {
      if (!active) return;

      const canvas = rightCanvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      const viewport = page.getViewport({ scale: zoom });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      if (rightRenderTaskRef.current) {
        rightRenderTaskRef.current.cancel();
      }

      const renderTask = page.render(renderContext);
      rightRenderTaskRef.current = renderTask;

      renderTask.promise.then(
        () => {
          rightRenderTaskRef.current = null;
        },
        (err: any) => {
          if (err.name !== "RenderingCancelledException") {
            console.error("PDF Right Render Error:", err);
          }
        }
      );
    });

    return () => {
      active = false;
    };
  }, [pdfDoc, pageNum, zoom, loading, isTwoPageView, numPages]);

  const handleFitWidth = (forcedTwoPageVal?: boolean) => {
    if (!pdfDoc) return;
    const twoPage = forcedTwoPageVal !== undefined ? forcedTwoPageVal : isTwoPageView;
    pdfDoc.getPage(pageNum).then((page: any) => {
      const container = viewportContainerRef.current;
      if (!container) return;
      const containerWidth = container.clientWidth - 48;
      const viewport = page.getViewport({ scale: 1.0 });
      const scale = twoPage ? (containerWidth / 2 - 12) / viewport.width : containerWidth / viewport.width;
      setZoom(scale);
    });
  };

  const handleFitPage = (forcedTwoPageVal?: boolean) => {
    if (!pdfDoc) return;
    const twoPage = forcedTwoPageVal !== undefined ? forcedTwoPageVal : isTwoPageView;
    pdfDoc.getPage(pageNum).then((page: any) => {
      const container = viewportContainerRef.current;
      if (!container) return;
      const containerWidth = container.clientWidth - 48;
      const containerHeight = container.clientHeight - 48;
      const viewport = page.getViewport({ scale: 1.0 });
      const scaleX = twoPage ? (containerWidth / 2 - 12) / viewport.width : containerWidth / viewport.width;
      const scaleY = containerHeight / viewport.height;
      setZoom(Math.min(scaleX, scaleY));
    });
  };

  const toggleFit = () => {
    if (isFitWidth) {
      handleFitPage();
      setIsFitWidth(false);
    } else {
      handleFitWidth();
      setIsFitWidth(true);
    }
  };

  const toggleTwoPageView = () => {
    const nextMode = !isTwoPageView;
    setIsTwoPageView(nextMode);

    if (isFitWidth) {
      handleFitWidth(nextMode);
    } else {
      handleFitPage(nextMode);
    }
  };

  const runSearch = async (query: string) => {
    if (!pdfDoc || !query.trim()) return;
    setSearching(true);
    setSearchProgress(0);
    setLastSearchedQuery(query);
    const q = query.toLowerCase();
    const results = [];

    for (let i = 1; i <= pdfDoc.numPages; i++) {
      if (i % 25 === 0) {
        setSearchProgress(Math.round((i / pdfDoc.numPages) * 100));
        await new Promise((resolve) => setTimeout(resolve, 15));
      }

      try {
        const page = await pdfDoc.getPage(i);
        const textContent = await page.getTextContent();
        const text = textContent.items.map((item: any) => item.str).join(" ");
        const idx = text.toLowerCase().indexOf(q);

        if (idx !== -1) {
          const start = Math.max(0, idx - 45);
          const end = Math.min(text.length, idx + query.length + 55);
          let snippet = text.slice(start, end);
          if (start > 0) snippet = "..." + snippet;
          if (end < text.length) snippet = snippet + "...";

          results.push({
            pageNumber: i,
            snippet: snippet,
          });
        }
      } catch (err) {
        console.error(`Search error on page ${i}`, err);
      }
    }

    setSearchResults(results);
    setSearchProgress(100);
    setSearching(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT") return;
      const step = isTwoPageView ? 2 : 1;
      if (e.key === "ArrowRight") {
        setPageNum((prev) => Math.min(numPages, prev + step));
      } else if (e.key === "ArrowLeft") {
        setPageNum((prev) => Math.max(1, prev - step));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [numPages, isTwoPageView]);

  useEffect(() => {
    const container = viewportContainerRef.current;
    if (container) {
      container.scrollTop = 0;
    }
  }, [pageNum]);

  useEffect(() => {
    const container = viewportContainerRef.current;
    if (!container || !pdfDoc || loading) return;

    let cooldown = false;
    let cooldownTimer: NodeJS.Timeout | null = null;
    let touchStartY = 0;

    const triggerCooldown = () => {
      cooldown = true;
      if (cooldownTimer) clearTimeout(cooldownTimer);
      cooldownTimer = setTimeout(() => {
        cooldown = false;
      }, 700);
    };

    const handleWheel = (e: WheelEvent) => {
      if (!numPages) return;

      const isAtTop = container.scrollTop <= 5;
      const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 5;
      const step = isTwoPageView ? 2 : 1;

      if (e.deltaY < 0 && isAtTop) {
        if (pageNum > 1) {
          if (cooldown) {
            e.preventDefault();
            return;
          }
          e.preventDefault();
          setPageNum((prev) => Math.max(1, prev - step));
          triggerCooldown();
        }
      } else if (e.deltaY > 0 && isAtBottom) {
        const canGoNext = isTwoPageView ? (pageNum + 1 < numPages) : (pageNum < numPages);
        if (canGoNext) {
          if (cooldown) {
            e.preventDefault();
            return;
          }
          e.preventDefault();
          setPageNum((prev) => Math.min(numPages, prev + step));
          triggerCooldown();
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!numPages || e.touches.length !== 1) return;

      const touchCurrentY = e.touches[0].clientY;
      const diffY = touchCurrentY - touchStartY;

      const isAtTop = container.scrollTop <= 5;
      const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 5;
      const step = isTwoPageView ? 2 : 1;

      if (diffY > 50 && isAtTop) {
        if (pageNum > 1) {
          if (cooldown) {
            e.preventDefault();
            return;
          }
          e.preventDefault();
          setPageNum((prev) => Math.max(1, prev - step));
          triggerCooldown();
        }
      }
      else if (diffY < -50 && isAtBottom) {
        const canGoNext = isTwoPageView ? (pageNum + 1 < numPages) : (pageNum < numPages);
        if (canGoNext) {
          if (cooldown) {
            e.preventDefault();
            return;
          }
          e.preventDefault();
          setPageNum((prev) => Math.min(numPages, prev + step));
          triggerCooldown();
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      if (cooldownTimer) clearTimeout(cooldownTimer);
    };
  }, [pdfDoc, pageNum, numPages, loading, isTwoPageView]);

  const toggleNode = (title: string) => {
    setExpandedOutlineNodes((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewportContainerRef.current?.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  useEffect(() => {
    const change = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", change);
    return () => document.removeEventListener("fullscreenchange", change);
  }, []);

  const renderOutlineNode = (items: OutlineItem[], depth = 0) => {
    return items.map((item, idx) => {
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandedOutlineNodes[item.title];
      const isCurrentPage = item.pageNumber === pageNum;

      return (
        <div key={`${item.title}-${idx}`} style={{ paddingLeft: depth > 0 ? "14px" : "0px" }}>
          <div
            className={`toc-node ${isCurrentPage ? "active" : ""}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 10px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: depth === 0 ? "0.9rem" : "0.82rem",
              fontWeight: depth === 0 ? 600 : 400,
              color: isCurrentPage
                ? "var(--sage-dark)"
                : depth === 0
                ? "var(--text-primary)"
                : "var(--text-secondary)",
              transition: "all 0.15s ease",
              marginBottom: "2px",
            }}
            onClick={() => {
              if (item.pageNumber) {
                setPageNum(item.pageNumber);
              }
              if (hasChildren) {
                toggleNode(item.title);
              }
            }}
          >
            {hasChildren ? (
              <span
                style={{
                  display: "inline-flex",
                  transform: isExpanded ? "rotate(0deg)" : "rotate(-90deg)",
                  transition: "transform 0.2s ease",
                  opacity: 0.6,
                }}
              >
                <ChevronDown size={14} />
              </span>
            ) : (
              <span style={{ width: "14px", height: "14px", display: "inline-block" }} />
            )}
            <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {item.title}
            </span>
            {item.pageNumber && (
              <span
                style={{
                  fontSize: "0.72rem",
                  color: isCurrentPage ? "var(--sage-dark)" : "var(--text-muted)",
                  background: isCurrentPage ? "var(--sage-light)" : "var(--border)",
                  padding: "1px 6px",
                  borderRadius: "4px",
                }}
              >
                p. {item.pageNumber}
              </span>
            )}
          </div>
          {hasChildren && isExpanded && (
            <div style={{ marginTop: "2px", marginBottom: "6px" }}>
              {renderOutlineNode(item.children!, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  const getTheme = () => {
    switch (readingMode) {
      case "sepia":
        return {
          workspaceBg: "#f4ede1",
          canvasContainerBg: "#faf6ef",
          sidebarBg: "rgba(244, 237, 225, 0.95)",
          toolbarBg: "#ebdecb",
          textPrimary: "#433422",
          textSecondary: "#6b5840",
          textMuted: "#8e7b65",
          border: "rgba(164, 136, 99, 0.22)",
          activeItemBg: "#dfd0bc",
          cardBg: "#fcfaf7",
          accent: "#8c6239",
        };
      case "dark":
        return {
          workspaceBg: "#0d111d",
          canvasContainerBg: "#161c2c",
          sidebarBg: "rgba(15, 23, 42, 0.95)",
          toolbarBg: "#0f172a",
          textPrimary: "#f1f5f9",
          textSecondary: "#94a3b8",
          textMuted: "#64748b",
          border: "rgba(255, 255, 255, 0.08)",
          activeItemBg: "rgba(255, 255, 255, 0.12)",
          cardBg: "#1e293b",
          accent: "#5c8a5e",
        };
      default: // light
        return {
          workspaceBg: "#f1ede6",
          canvasContainerBg: "white",
          sidebarBg: "rgba(253, 248, 243, 0.85)",
          toolbarBg: "white",
          textPrimary: "var(--text-primary)",
          textSecondary: "var(--text-secondary)",
          textMuted: "var(--text-muted)",
          border: "rgba(92, 138, 94, 0.12)",
          activeItemBg: "var(--sage-light)",
          cardBg: "white",
          accent: "var(--sage-dark)",
        };
    }
  };

  const theme = getTheme();

  const getFilterStyle = () => {
    switch (readingMode) {
      case "sepia":
        return { filter: "sepia(0.75) contrast(0.92) brightness(0.96) saturate(0.95)" };
      case "dark":
        return { filter: "invert(0.92) hue-rotate(195deg) brightness(0.92) contrast(0.9)" };
      default:
        return {};
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100vh",
          marginTop: "0px",
          background: theme.workspaceBg,
          position: "relative",
          overflow: "hidden",
          ["--cream" as any]: theme.workspaceBg,
          ["--border" as any]: theme.border,
          ["--text-primary" as any]: theme.textPrimary,
          ["--text-secondary" as any]: theme.textSecondary,
          ["--text-muted" as any]: theme.textMuted,
          ["--sage-light" as any]: theme.activeItemBg,
          ["--sage-dark" as any]: theme.accent,
        }}
      >
        {loading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "var(--cream)",
              zIndex: 150,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
            }}
          >
            <div
              style={{
                maxWidth: "460px",
                width: "100%",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "var(--sage-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--sage)",
                  marginBottom: "24px",
                }}
                className="pulse-slow"
              >
                <BookOpen size={28} strokeWidth={1.5} />
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.75rem",
                  color: "var(--text-primary)",
                  marginBottom: "10px",
                  fontWeight: 400,
                }}
              >
                DBT Handbook
              </h2>
              <p
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: "1.3rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.35,
                  minHeight: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "36px",
                }}
              >
                &ldquo;{quote}&rdquo;
              </p>

              <div
                style={{
                  width: "100%",
                  height: "5px",
                  background: "var(--border)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${loadProgress}%`,
                    background: "var(--sage)",
                    transition: "width 0.25s ease-out",
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                }}
              >
                {loadProgress < 100
                  ? `Downloading handouts: ${loadProgress}%`
                  : "Initializing document reader..."}
              </span>
            </div>
          </div>
        )}

        {sidebarOpen && (
          <div
            className="sidebar-backdrop"
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              zIndex: 85,
            }}
          />
        )}

        <aside
          className={`reader-sidebar ${sidebarOpen ? "open" : ""}`}
          style={{
            width: sidebarOpen ? "320px" : "0px",
            opacity: sidebarOpen ? 1 : 0,
            visibility: sidebarOpen ? "visible" : "hidden",
            background: theme.sidebarBg,
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            borderRight: sidebarOpen ? `1px solid ${theme.border}` : "0px solid transparent",
            display: "flex",
            flexDirection: "column",
            zIndex: 90,
            transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease, visibility 0.25s ease, border-right 0.3s ease",
            height: "100%",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 18px",
              borderBottom: `1px solid ${theme.border}`,
              background: "rgba(0, 0, 0, 0.02)",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "var(--text-muted)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Handbook Menu
            </span>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              title="Close Menu"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "var(--text-secondary)",
                padding: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
              }}
              className="toolbar-btn"
            >
              <X size={16} />
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              borderBottom: "1px solid rgba(92, 138, 94, 0.12)",
              background: "rgba(0,0,0,0.01)",
              padding: "4px 8px",
              gap: "4px",
            }}
          >
            {[
              { id: "toc", label: "Outline", icon: BookOpen },
              { id: "search", label: "Search", icon: Search },
              { id: "bookmarks", label: "Saved", icon: Bookmark },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    display: "inline-flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                    padding: "10px 4px 8px",
                    border: "none",
                    background: active ? "var(--sage-light)" : "transparent",
                    color: active ? "var(--sage-dark)" : "var(--text-secondary)",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: active ? 600 : 500,
                    fontSize: "0.72rem",
                    cursor: "pointer",
                    borderRadius: "8px",
                    transition: "all 0.22s ease",
                  }}
                >
                  <TabIcon size={15} strokeWidth={active ? 2 : 1.5} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "18px" }}>
            {activeTab === "toc" && (
              <div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginBottom: "14px",
                  }}
                >
                  Table of Contents
                </p>
                {pdfOutline.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    {renderOutlineNode(pdfOutline)}
                  </div>
                ) : (
                  <div style={{ textAlign: "center", padding: "20px 0", color: "var(--text-muted)" }}>
                    <Loader2 size={20} className="spin" style={{ margin: "0 auto 10px" }} />
                    Loading outline...
                  </div>
                )}
              </div>
            )}

            {activeTab === "search" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      runSearch(searchQuery);
                    }}
                    style={{
                      display: "flex",
                      background: theme.cardBg,
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-full)",
                      padding: "4px 6px 4px 14px",
                      alignItems: "center",
                      gap: "8px",
                      boxShadow: "inset 0 1.5px 3px rgba(0,0,0,0.03)",
                    }}
                  >
                    <Search size={14} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                    <input
                      type="text"
                      placeholder="Search handbook..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        width: "100%",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.85rem",
                        color: "var(--text-primary)",
                      }}
                    />
                    <button
                      type="submit"
                      disabled={searching || !searchQuery.trim()}
                      className="btn-primary"
                      style={{
                        padding: "8px 14px",
                        fontSize: "0.78rem",
                        borderRadius: "var(--radius-full)",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Go
                    </button>
                  </form>
                </div>

                {searching && (
                  <div style={{ textAlign: "center", padding: "24px 0" }}>
                    <Loader2 size={24} className="spin" style={{ color: "var(--sage)", margin: "0 auto 14px" }} />
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "8px" }}>
                      Searching all pages...
                    </p>
                    <div style={{ width: "100%", height: "4px", background: "var(--border)", borderRadius: "10px", overflow: "hidden" }}>
                      <div style={{ width: `${searchProgress}%`, height: "100%", background: "var(--sage)", transition: "width 0.15s ease-out" }} />
                    </div>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "4px", display: "inline-block" }}>
                      {searchProgress}% complete
                    </span>
                  </div>
                )}

                {!searching && lastSearchedQuery && (
                  <div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "14px" }}>
                      Found {searchResults.length} match{searchResults.length === 1 ? "" : "es"} for &ldquo;{lastSearchedQuery}&rdquo;
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {searchResults.map((res, idx) => (
                        <div
                          key={idx}
                          onClick={() => setPageNum(res.pageNumber)}
                          style={{
                            background: theme.cardBg,
                            border: "1px solid var(--border)",
                            borderRadius: "var(--radius-md)",
                            padding: "12px",
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                            fontSize: "0.8rem",
                            textAlign: "left",
                          }}
                          className="search-card"
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                            <span style={{ fontWeight: 600, color: "var(--sage-dark)" }}>Page {res.pageNumber}</span>
                            <ChevronRight size={14} style={{ color: "var(--text-muted)" }} />
                          </div>
                          <p style={{ color: "var(--text-secondary)", lineHeight: 1.45, fontStyle: "italic" }}>
                            {res.snippet}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "bookmarks" && (
              <div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginBottom: "14px",
                  }}
                >
                  Saved Bookmarks
                </p>
                {bookmarks.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px 10px", color: "var(--text-muted)" }}>
                    <Bookmark size={26} strokeWidth={1.2} style={{ opacity: 0.4, margin: "0 auto 12px" }} />
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", lineHeight: 1.5 }}>
                      No bookmarks saved yet. Click the bookmark icon in the toolbar on any page to save it here.
                    </p>
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "8px" }}>
                    {bookmarks.map((pNum) => (
                      <div
                        key={pNum}
                        onClick={() => setPageNum(pNum)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          background: theme.cardBg,
                          border: "1px solid var(--border)",
                          borderRadius: "var(--radius-md)",
                          padding: "10px 14px",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                        className="bookmark-card"
                      >
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "0.88rem",
                            fontWeight: 500,
                            color: "var(--text-primary)",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <BookmarkCheck size={14} style={{ color: "var(--sage)" }} />
                          Page {pNum}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const updated = bookmarks.filter((b) => b !== pNum);
                            setBookmarks(updated);
                            localStorage.setItem("anchorleaf-dbt-bookmarks", JSON.stringify(updated));
                          }}
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color: "var(--text-muted)",
                            padding: "4px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <BookmarkX size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div
            style={{
              padding: "14px 18px",
              borderTop: `1px solid ${theme.border}`,
              background: "rgba(0, 0, 0, 0.02)",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Reading Mode
              </span>
              <div
                style={{
                  display: "flex",
                  background: "var(--cream)",
                  padding: "3px",
                  borderRadius: "var(--radius-full)",
                  border: "1px solid var(--border)",
                }}
              >
                {[
                  { mode: "light", label: "Light", icon: Sun },
                  { mode: "sepia", label: "Sepia", icon: Eye },
                  { mode: "dark", label: "Dark", icon: Moon },
                ].map((item) => {
                  const FilterIcon = item.icon;
                  const active = readingMode === item.mode;
                  return (
                    <button
                      key={item.mode}
                      type="button"
                      onClick={() => setReadingMode(item.mode as any)}
                      style={{
                        flex: 1,
                        border: "none",
                        background: active ? (readingMode === "dark" ? "rgba(255, 255, 255, 0.12)" : "white") : "transparent",
                        color: active ? "var(--sage-dark)" : "var(--text-secondary)",
                        padding: "6px 8px",
                        cursor: "pointer",
                        borderRadius: "var(--radius-full)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        boxShadow: active ? "0 2px 5px rgba(0,0,0,0.06)" : "none",
                        transition: "all 0.2s ease",
                        fontSize: "0.78rem",
                        fontWeight: active ? 600 : 500,
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      <FilterIcon size={14} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Zoom & Page Fit
              </span>
              
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", flex: 1, background: "var(--cream)", borderRadius: "6px", border: "1px solid var(--border)", padding: "2px" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setZoom((z) => Math.max(0.4, z - 0.15));
                      setIsFitWidth(false);
                    }}
                    title="Zoom Out"
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--text-secondary)",
                      padding: "6px",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className="toolbar-btn"
                  >
                    <ZoomOut size={14} />
                  </button>
                  
                  <span
                    style={{
                      fontSize: "0.78rem",
                      fontFamily: "'DM Sans', sans-serif",
                      color: "var(--text-primary)",
                      minWidth: "48px",
                      textAlign: "center",
                      fontWeight: 600,
                    }}
                  >
                    {Math.round(zoom * 100)}%
                  </span>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setZoom((z) => Math.min(2.5, z + 0.15));
                      setIsFitWidth(false);
                    }}
                    title="Zoom In"
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--text-secondary)",
                      padding: "6px",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className="toolbar-btn"
                  >
                    <ZoomIn size={14} />
                  </button>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  background: "var(--cream)",
                  padding: "3px",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (isFitWidth) {
                      handleFitPage();
                      setIsFitWidth(false);
                    }
                  }}
                  style={{
                    flex: 1,
                    border: "none",
                    background: !isFitWidth ? "white" : "transparent",
                    color: !isFitWidth ? "var(--sage-dark)" : "var(--text-secondary)",
                    padding: "6px",
                    fontSize: "0.78rem",
                    fontWeight: !isFitWidth ? 600 : 500,
                    cursor: "pointer",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                    boxShadow: !isFitWidth ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                    transition: "all 0.15s ease",
                  }}
                >
                  Fit Page
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!isFitWidth) {
                      handleFitWidth();
                      setIsFitWidth(true);
                    }
                  }}
                  style={{
                    flex: 1,
                    border: "none",
                    background: isFitWidth ? "white" : "transparent",
                    color: isFitWidth ? "var(--sage-dark)" : "var(--text-secondary)",
                    padding: "6px",
                    fontSize: "0.78rem",
                    fontWeight: isFitWidth ? 600 : 500,
                    cursor: "pointer",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                    boxShadow: isFitWidth ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                    transition: "all 0.15s ease",
                  }}
                >
                  Fit Width
                </button>
              </div>
            </div>

            <div className="hidden-mobile" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Page Layout
              </span>
              <div
                style={{
                  display: "flex",
                  background: "var(--cream)",
                  padding: "3px",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (isTwoPageView) toggleTwoPageView();
                  }}
                  style={{
                    flex: 1,
                    border: "none",
                    background: !isTwoPageView ? "white" : "transparent",
                    color: !isTwoPageView ? "var(--sage-dark)" : "var(--text-secondary)",
                    padding: "6px",
                    fontSize: "0.78rem",
                    fontWeight: !isTwoPageView ? 600 : 500,
                    cursor: "pointer",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    boxShadow: !isTwoPageView ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                    transition: "all 0.15s ease",
                  }}
                >
                  <Square size={11} style={{ opacity: 0.8 }} />
                  <span>1 Page</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!isTwoPageView) toggleTwoPageView();
                  }}
                  style={{
                    flex: 1,
                    border: "none",
                    background: isTwoPageView ? "white" : "transparent",
                    color: isTwoPageView ? "var(--sage-dark)" : "var(--text-secondary)",
                    padding: "6px",
                    fontSize: "0.78rem",
                    fontWeight: isTwoPageView ? 600 : 500,
                    cursor: "pointer",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    boxShadow: isTwoPageView ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                    transition: "all 0.15s ease",
                  }}
                >
                  <Columns size={11} style={{ opacity: 0.8 }} />
                  <span>2 Pages</span>
                </button>
              </div>
            </div>
          </div>
        </aside>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            position: "relative",
            minWidth: 0,
          }}
        >
          <header
            style={{
              height: "56px",
              background: theme.toolbarBg,
              borderBottom: `1px solid ${theme.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 18px",
              zIndex: 80,
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Link
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.85rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  color: "var(--sage-dark)",
                  textDecoration: "none",
                  padding: "6px 12px",
                  borderRadius: "var(--radius-full)",
                  background: "var(--sage-light)",
                  marginRight: "6px",
                }}
                className="back-site-btn"
              >
                <ChevronLeft size={14} />
                <span className="hidden-tablet">Back to Site</span>
              </Link>

              <button
                type="button"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                title="Toggle Sidebar"
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: sidebarOpen ? "var(--sage-dark)" : "var(--text-secondary)",
                  padding: "8px",
                  borderRadius: "var(--radius-sm)",
                  display: "flex",
                  alignItems: "center",
                  transition: "background 0.2s ease",
                }}
                className="toolbar-btn"
              >
                <Menu size={18} />
              </button>
              <h1
                className="hidden-tablet"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1rem",
                  color: "var(--text-primary)",
                  fontWeight: 600,
                  margin: 0,
                }}
              >
                DBT Handbook
              </h1>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                type="button"
                disabled={pageNum <= 1}
                onClick={() => setPageNum((prev) => Math.max(1, prev - (isTwoPageView ? 2 : 1)))}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: pageNum <= 1 ? "var(--text-muted)" : "var(--text-primary)",
                  padding: "6px",
                  display: "inline-flex",
                  borderRadius: "50%",
                }}
                className="pager-btn"
              >
                <ChevronLeft size={18} />
              </button>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "0.82rem",
                  fontFamily: "'DM Sans', sans-serif",
                  color: "var(--text-secondary)",
                }}
              >
                <input
                  type="number"
                  min={1}
                  max={numPages || 1}
                  value={pageNum}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val >= 1 && val <= numPages) {
                      setPageNum(val);
                    }
                  }}
                  style={{
                    width: "44px",
                    textAlign: "center",
                    border: "1px solid var(--border)",
                    borderRadius: "4px",
                    padding: "3px 0",
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    fontWeight: 600,
                  }}
                />
                {isTwoPageView && pageNum + 1 <= numPages && (
                  <>
                    <span>-</span>
                    <span style={{ fontWeight: 600 }}>{pageNum + 1}</span>
                  </>
                )}
                <span>of</span>
                <span style={{ fontWeight: 600 }}>{numPages || "..."}</span>
              </div>

              <button
                type="button"
                disabled={pageNum >= numPages || (isTwoPageView && pageNum + 1 >= numPages)}
                onClick={() => setPageNum((prev) => Math.min(numPages, prev + (isTwoPageView ? 2 : 1)))}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: (pageNum >= numPages || (isTwoPageView && pageNum + 1 >= numPages)) ? "var(--text-muted)" : "var(--text-primary)",
                  padding: "6px",
                  display: "inline-flex",
                  borderRadius: "50%",
                }}
                className="pager-btn"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <div
                style={{
                  display: "flex",
                  background: "var(--cream)",
                  padding: "3px",
                  borderRadius: "var(--radius-full)",
                  border: "1px solid var(--border)",
                  marginRight: "6px",
                }}
                className="hidden-tablet"
              >
                {[
                  { mode: "light", label: "Light", icon: Sun },
                  { mode: "sepia", label: "Sepia", icon: Eye },
                  { mode: "dark", label: "Dark", icon: Moon },
                ].map((item) => {
                  const FilterIcon = item.icon;
                  const active = readingMode === item.mode;
                  return (
                    <button
                      key={item.mode}
                      onClick={() => setReadingMode(item.mode as any)}
                      title={`${item.label} Contrast Mode`}
                      style={{
                        border: "none",
                        background: active ? "white" : "transparent",
                        color: active ? "var(--sage-dark)" : "var(--text-muted)",
                        padding: "5px 8px",
                        cursor: "pointer",
                        borderRadius: "var(--radius-full)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: active ? "0 2px 5px rgba(0,0,0,0.06)" : "none",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <FilterIcon size={12} />
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={toggleBookmark}
                title={bookmarks.includes(pageNum) ? "Remove Bookmark" : "Bookmark Page"}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: bookmarks.includes(pageNum) ? "var(--sage)" : "var(--text-muted)",
                  padding: "8px",
                  borderRadius: "var(--radius-sm)",
                  display: "flex",
                  alignItems: "center",
                }}
                className="toolbar-btn"
              >
                <Bookmark size={16} fill={bookmarks.includes(pageNum) ? "currentColor" : "none"} />
              </button>

              <button
                type="button"
                onClick={() => {
                  setZoom((z) => Math.max(0.4, z - 0.15));
                  setIsFitWidth(false);
                }}
                title="Zoom Out"
                className="toolbar-btn hidden-tablet"
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-secondary)",
                  padding: "8px",
                  borderRadius: "var(--radius-sm)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ZoomOut size={16} />
              </button>

              <span
                style={{
                  fontSize: "0.78rem",
                  fontFamily: "'DM Sans', sans-serif",
                  color: "var(--text-muted)",
                  minWidth: "36px",
                  textAlign: "center",
                }}
                className="hidden-tablet"
              >
                {Math.round(zoom * 100)}%
              </span>

              <button
                type="button"
                onClick={() => {
                  setZoom((z) => Math.min(2.5, z + 0.15));
                  setIsFitWidth(false);
                }}
                title="Zoom In"
                className="toolbar-btn hidden-tablet"
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-secondary)",
                  padding: "8px",
                  borderRadius: "var(--radius-sm)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ZoomIn size={16} />
              </button>

              <div
                style={{
                  display: "flex",
                  background: "var(--cream)",
                  padding: "3px",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  marginRight: "6px",
                }}
                className="hidden-tablet"
              >
                <button
                  type="button"
                  onClick={() => {
                    if (isFitWidth) {
                      handleFitPage();
                      setIsFitWidth(false);
                    }
                  }}
                  title="Fit to Page Height (Full Page)"
                  style={{
                    border: "none",
                    background: !isFitWidth ? "white" : "transparent",
                    color: !isFitWidth ? "var(--sage-dark)" : "var(--text-secondary)",
                    padding: "4px 8px",
                    fontSize: "0.78rem",
                    fontWeight: !isFitWidth ? 600 : 500,
                    cursor: "pointer",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    boxShadow: !isFitWidth ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                    transition: "all 0.15s ease",
                  }}
                >
                  Fit Page
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!isFitWidth) {
                      handleFitWidth();
                      setIsFitWidth(true);
                    }
                  }}
                  title="Fit to Page Width (Stretch)"
                  style={{
                    border: "none",
                    background: isFitWidth ? "white" : "transparent",
                    color: isFitWidth ? "var(--sage-dark)" : "var(--text-secondary)",
                    padding: "4px 8px",
                    fontSize: "0.78rem",
                    fontWeight: isFitWidth ? 600 : 500,
                    cursor: "pointer",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    boxShadow: isFitWidth ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                    transition: "all 0.15s ease",
                  }}
                >
                  Fit Width
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  background: "var(--cream)",
                  padding: "3px",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  marginRight: "6px",
                }}
                className="hidden-tablet"
              >
                <button
                  type="button"
                  onClick={() => {
                    if (isTwoPageView) toggleTwoPageView();
                  }}
                  title="Show one page at a time"
                  style={{
                    border: "none",
                    background: !isTwoPageView ? "white" : "transparent",
                    color: !isTwoPageView ? "var(--sage-dark)" : "var(--text-secondary)",
                    padding: "4px 8px",
                    fontSize: "0.78rem",
                    fontWeight: !isTwoPageView ? 600 : 500,
                    cursor: "pointer",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    boxShadow: !isTwoPageView ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                    transition: "all 0.15s ease",
                  }}
                >
                  <Square size={11} style={{ opacity: 0.8 }} />
                  1 Page
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!isTwoPageView) toggleTwoPageView();
                  }}
                  title="Show two pages side-by-side"
                  style={{
                    border: "none",
                    background: isTwoPageView ? "white" : "transparent",
                    color: isTwoPageView ? "var(--sage-dark)" : "var(--text-secondary)",
                    padding: "4px 8px",
                    fontSize: "0.78rem",
                    fontWeight: isTwoPageView ? 600 : 500,
                    cursor: "pointer",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    boxShadow: isTwoPageView ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                    transition: "all 0.15s ease",
                  }}
                >
                  <Columns size={11} style={{ opacity: 0.8 }} />
                  2 Pages
                </button>
              </div>

              <button
                type="button"
                onClick={toggleFullscreen}
                title="Toggle Fullscreen"
                className="toolbar-btn"
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-secondary)",
                  padding: "8px",
                  borderRadius: "var(--radius-sm)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>

              <a
                href="/DBT Skills, Training, Handouts and Worksheets.pdf"
                download="DBT_Skills_Handouts.pdf"
                title="Download Handbook PDF"
                className="toolbar-btn"
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-secondary)",
                  padding: "8px",
                  borderRadius: "var(--radius-sm)",
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                }}
              >
                <Download size={16} />
              </a>
            </div>
          </header>

          <div
            id="pdf-viewport-container"
            ref={viewportContainerRef}
            style={{
              flex: 1,
              overflow: "auto",
              padding: "24px 16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              background: theme.workspaceBg,
              scrollBehavior: "smooth",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                alignItems: "flex-start",
                flexWrap: "nowrap",
              }}
            >
              <div
                style={{
                  background: theme.canvasContainerBg,
                  boxShadow:
                    readingMode === "dark"
                      ? "0 12px 32px rgba(0,0,0,0.45)"
                      : "0 14px 44px rgba(28, 35, 28, 0.08), 0 3px 8px rgba(0, 0, 0, 0.02)",
                  borderRadius: "6px",
                  overflow: "hidden",
                  display: "inline-block",
                  position: "relative",
                }}
              >
                <canvas
                  ref={canvasRef}
                  id="pdf-canvas"
                  style={{
                    display: "block",
                    ...getFilterStyle(),
                  }}
                />
              </div>

              {isTwoPageView && pageNum + 1 <= numPages && (
                <div
                  style={{
                    background: theme.canvasContainerBg,
                    boxShadow:
                      readingMode === "dark"
                        ? "0 12px 32px rgba(0,0,0,0.45)"
                        : "0 14px 44px rgba(28, 35, 28, 0.08), 0 3px 8px rgba(0, 0, 0, 0.02)",
                    borderRadius: "6px",
                    overflow: "hidden",
                    display: "inline-block",
                    position: "relative",
                  }}
                >
                  <canvas
                    ref={rightCanvasRef}
                    id="pdf-canvas-right"
                    style={{
                      display: "block",
                      ...getFilterStyle(),
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .toolbar-btn:hover, .pager-btn:hover {
          background: var(--border) !important;
          color: var(--sage-dark) !important;
        }
        .back-site-btn {
          transition: all 0.2s ease !important;
        }
        .back-site-btn:hover {
          background: var(--border) !important;
          color: var(--sage-dark) !important;
          transform: translateX(-2px);
        }
        .toc-node:hover {
          background: var(--border);
        }
        .toc-node.active {
          background: var(--sage-light) !important;
        }
        .search-card:hover {
          border-color: var(--sage-dark) !important;
          background: var(--sage-light) !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }
        .bookmark-card:hover {
          border-color: var(--sage-dark) !important;
          background: var(--sage-light) !important;
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .pulse-slow {
          animation: pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .7; transform: scale(1.05); }
        }
        
        @media (max-width: 1024px) {
          .reader-sidebar {
            position: absolute !important;
            top: 0;
            bottom: 0;
            left: 0;
            width: 290px !important;
            opacity: 1 !important;
            visibility: visible !important;
            transform: translateX(-100%) !important;
            box-shadow: 8px 0 24px rgba(0,0,0,0.15);
            transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1) !important;
            z-index: 99 !important;
          }
          .reader-sidebar.open {
            transform: translateX(0) !important;
          }
          .sidebar-backdrop {
            display: block !important;
          }
          .show-mobile-sidebar-close {
            display: flex !important;
          }
        }
        @media (max-width: 1024px) {
          .hidden-tablet {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .hidden-mobile {
            display: none !important;
          }
        }
        @media (min-width: 1025px) {
          .sidebar-backdrop {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
