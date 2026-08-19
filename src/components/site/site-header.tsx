"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { NotificationBell } from "@/components/site/notification-bell";
import { CommandPalette } from "@/components/site/command-palette";
import type { NavCategory } from "@/types/content";

export function SiteHeader({
  schoolName,
  logoUrl,
  phone,
  email,
  navCategories,
}: {
  schoolName: string;
  logoUrl: string;
  phone: string;
  email: string;
  navCategories: NavCategory[];
}) {
  const [open, setOpen] = useState(false);
  const [openMobileCategory, setOpenMobileCategory] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-navy-950 text-navy-100 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-6 px-6 py-2 text-xs text-slate-300">
          <a href={`tel:${phone}`} className="flex items-center gap-1.5 hover:text-gold-400">
            <Phone className="h-3.5 w-3.5" /> {phone}
          </a>
          <a href={`mailto:${email}`} className="flex items-center gap-1.5 hover:text-gold-400">
            <Mail className="h-3.5 w-3.5" /> {email}
          </a>
        </div>
      </div>

      <div className="border-b border-white/10 bg-navy-900/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-3">
            <span className="relative h-11 w-11 overflow-hidden rounded-full bg-white/10 ring-2 ring-gold-400/60">
              <Image src={logoUrl} alt={schoolName} fill sizes="44px" className="object-contain p-1" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-white">{schoolName}</span>
              <span className="text-[11px] uppercase tracking-wider text-gold-400">
                Higher Secondary School
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navCategories.map((cat) =>
              cat.items.length === 0 ? (
                <Link
                  key={cat.id}
                  href={cat.href || "#"}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    pathname === cat.href
                      ? "bg-gold-500/15 text-gold-400"
                      : "text-slate-200 hover:bg-white/5 hover:text-gold-400"
                  }`}
                >
                  {cat.label}
                </Link>
              ) : (
                <div key={cat.id} className="group relative">
                  <button
                    className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                      cat.items.some((i) => i.href === pathname)
                        ? "bg-gold-500/15 text-gold-400"
                        : "text-slate-200 hover:bg-white/5 hover:text-gold-400"
                    }`}
                  >
                    {cat.label}
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                  </button>
                  <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                    <div className="min-w-48 overflow-hidden rounded-2xl bg-white p-1.5 shadow-2xl ring-1 ring-black/5">
                      {cat.items.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          className={`block rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                            pathname === item.href
                              ? "bg-navy-900 text-gold-400"
                              : "text-navy-900 hover:bg-slate-50"
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <CommandPalette />
            <NotificationBell />
            <Link
              href="/admissions"
              className="hidden rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-5 py-2.5 text-sm font-semibold text-navy-950 shadow-lg shadow-gold-500/20 transition-transform hover:scale-105 md:inline-block"
            >
              Apply Now
            </Link>
            <button
              aria-label="Toggle menu"
              className="rounded-lg p-2 text-white lg:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="flex flex-col gap-1 border-t border-white/10 bg-navy-900 px-6 py-4 lg:hidden">
            {navCategories.map((cat) =>
              cat.items.length === 0 ? (
                <Link
                  key={cat.id}
                  href={cat.href || "#"}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-gold-400"
                >
                  {cat.label}
                </Link>
              ) : (
                <div key={cat.id}>
                  <button
                    onClick={() =>
                      setOpenMobileCategory((c) => (c === cat.id ? null : cat.id))
                    }
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-gold-400"
                  >
                    {cat.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${
                        openMobileCategory === cat.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openMobileCategory === cat.id && (
                    <div className="ml-3 flex flex-col gap-1 border-l border-white/10 pl-3">
                      {cat.items.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-gold-400"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
            <Link
              href="/admissions"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-5 py-2.5 text-center text-sm font-semibold text-navy-950"
            >
              Apply Now
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
