const KEYS = {
  bookmarks: "anchorleaf.bookmarks.skills.v1",
  journal: "anchorleaf.journal.entries.v1",
  heroSeen: "anchorleaf.hero.seen.v1",
  skillsRead: "anchorleaf.skills.read.v1",
} as const;

function isClient(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function read<T>(key: string, fallback: T): T {
  if (!isClient()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (!isClient()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage full or blocked: silently no-op
  }
}

export function getBookmarks(): string[] {
  return read<string[]>(KEYS.bookmarks, []);
}

export function isBookmarked(skillId: string): boolean {
  return getBookmarks().includes(skillId);
}

export function toggleBookmark(skillId: string): string[] {
  const current = getBookmarks();
  const next = current.includes(skillId)
    ? current.filter((id) => id !== skillId)
    : [...current, skillId];
  write(KEYS.bookmarks, next);
  return next;
}

export interface JournalEntry {
  id: string;
  date: string; // YYYY-MM-DD
  intensity: number; // 1-5
  emotions: string[];
  skillsUsed: string[];
  note?: string;
  createdAt: number; // epoch ms
}

export function getJournalEntries(): JournalEntry[] {
  return read<JournalEntry[]>(KEYS.journal, []);
}

export function saveJournalEntry(entry: Omit<JournalEntry, "id" | "createdAt">): JournalEntry[] {
  const current = getJournalEntries();
  const today = entry.date;
  const filtered = current.filter((e) => e.date !== today);
  const newEntry: JournalEntry = {
    ...entry,
    id: `je_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
    createdAt: Date.now(),
  };
  const next = [newEntry, ...filtered];
  write(KEYS.journal, next);
  return next;
}

export function deleteJournalEntry(id: string): JournalEntry[] {
  const next = getJournalEntries().filter((e) => e.id !== id);
  write(KEYS.journal, next);
  return next;
}

export function exportJournalEntries(): void {
  if (!isClient()) return;
  const entries = getJournalEntries();
  const json = JSON.stringify(entries, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `anchorleaf-journal-${new Date().toISOString().split("T")[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function todayKey(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function hasSeenHero(): boolean {
  if (!isClient()) return false;
  try {
    return window.sessionStorage.getItem(KEYS.heroSeen) === "true";
  } catch {
    return false;
  }
}

export function markHeroSeen(): void {
  if (!isClient()) return;
  try {
    window.sessionStorage.setItem(KEYS.heroSeen, "true");
  } catch {}
}

// Skill progress tracking — counts only top-level named skills read
export function getReadSkills(): string[] {
  return read<string[]>(KEYS.skillsRead, []);
}

export function markSkillRead(skillId: string): void {
  const current = getReadSkills();
  if (current.includes(skillId)) return;
  write(KEYS.skillsRead, [...current, skillId]);
}

export function isSkillRead(skillId: string): boolean {
  return getReadSkills().includes(skillId);
}
