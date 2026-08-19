"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, FileText, Compass } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Item = { label: string; href: string; group: string };

const STATIC_ITEMS: Item[] = [
  { label: "Home", href: "/", group: "Pages" },
  { label: "About Us", href: "/about", group: "Pages" },
  { label: "Academics", href: "/academics", group: "Pages" },
  { label: "Admissions", href: "/admissions", group: "Pages" },
  { label: "Achievements", href: "/achievements", group: "Pages" },
  { label: "Gallery", href: "/gallery", group: "Pages" },
  { label: "Events Calendar", href: "/events", group: "Pages" },
  { label: "Notifications", href: "/notifications", group: "Pages" },
  { label: "Results", href: "/results", group: "Pages" },
  { label: "Alumni", href: "/alumni", group: "Pages" },
  { label: "Mandatory Disclosures", href: "/mandatory-disclosures", group: "Pages" },
  { label: "Contact Us", href: "/contact", group: "Pages" },
];

const SUPABASE_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [dynamicItems, setDynamicItems] = useState<Item[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset search UI when the palette opens
    setQuery("");
    setActiveIndex(0);
    setTimeout(() => inputRef.current?.focus(), 10);

    if (!SUPABASE_CONFIGURED || dynamicItems.length > 0) return;
    const supabase = createClient();
    Promise.all([
      supabase.from("notifications").select("title").eq("is_published", true).limit(15),
      supabase.from("results").select("title").eq("is_published", true).limit(15),
      supabase.from("achievements").select("title").eq("is_published", true).limit(15),
    ]).then(([notifications, results, achievements]) => {
      const items: Item[] = [
        ...(notifications.data ?? []).map((n) => ({ label: n.title, href: "/notifications", group: "Notifications" })),
        ...(results.data ?? []).map((r) => ({ label: r.title, href: "/results", group: "Results" })),
        ...(achievements.data ?? [])
          .filter((a) => a.title)
          .map((a) => ({ label: a.title, href: "/achievements", group: "Achievements" })),
      ];
      setDynamicItems(items);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const allItems = useMemo(() => [...STATIC_ITEMS, ...dynamicItems], [dynamicItems]);

  const filtered = useMemo(() => {
    if (!query.trim()) return STATIC_ITEMS;
    const q = query.toLowerCase();
    return allItems.filter((item) => item.label.toLowerCase().includes(q)).slice(0, 20);
  }, [query, allItems]);

  function go(item: Item) {
    setOpen(false);
    router.push(item.href);
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && filtered[activeIndex]) {
        go(filtered[activeIndex]);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, filtered, activeIndex]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs text-slate-300 transition-colors hover:bg-white/10 lg:flex"
      >
        <Search className="h-3.5 w-3.5" />
        Search
        <kbd className="ml-1 rounded border border-white/15 bg-white/5 px-1.5 py-0.5 font-sans text-[10px]">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-[300] flex items-start justify-center bg-navy-950/70 px-4 pt-24 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div
            className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
              <Search className="h-4.5 w-4.5 text-slate-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                placeholder="Search pages, notifications, results..."
                className="flex-1 text-sm text-navy-950 outline-none placeholder:text-slate-400"
              />
              <kbd className="rounded border border-slate-200 px-1.5 py-0.5 text-[10px] text-slate-400">Esc</kbd>
            </div>

            <div className="max-h-96 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-slate-400">No results found.</p>
              )}
              {filtered.map((item, i) => (
                <button
                  key={`${item.href}-${item.label}-${i}`}
                  onClick={() => go(item)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors ${
                    i === activeIndex ? "bg-navy-900 text-white" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {item.group === "Pages" ? (
                    <Compass className={`h-4 w-4 shrink-0 ${i === activeIndex ? "text-gold-400" : "text-slate-400"}`} />
                  ) : (
                    <FileText className={`h-4 w-4 shrink-0 ${i === activeIndex ? "text-gold-400" : "text-slate-400"}`} />
                  )}
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  <span className={`shrink-0 text-[10px] uppercase tracking-wide ${i === activeIndex ? "text-slate-300" : "text-slate-400"}`}>
                    {item.group}
                  </span>
                  {i === activeIndex && <ArrowRight className="h-3.5 w-3.5 shrink-0 text-gold-400" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
