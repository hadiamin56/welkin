"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail } from "lucide-react";
import { NotificationBell } from "@/components/site/notification-bell";
import { CommandPalette } from "@/components/site/command-palette";
import { LanguageToggle } from "@/components/site/language-toggle";
import { useLanguage } from "@/components/site/language-provider";
import type { DictKey } from "@/lib/i18n";

const NAV_LINKS: { href: string; key: DictKey }[] = [
  { href: "/", key: "nav_home" },
  { href: "/about", key: "nav_about" },
  { href: "/academics", key: "nav_academics" },
  { href: "/admissions", key: "nav_admissions" },
  { href: "/achievements", key: "nav_achievements" },
  { href: "/gallery", key: "nav_gallery" },
  { href: "/events", key: "nav_events" },
  { href: "/notifications", key: "nav_notifications" },
  { href: "/alumni", key: "nav_alumni" },
  { href: "/contact", key: "nav_contact" },
];

export function SiteHeader({
  schoolName,
  logoUrl,
  phone,
  email,
}: {
  schoolName: string;
  logoUrl: string;
  phone: string;
  email: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-navy-950 text-navy-100 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2 text-xs text-slate-300">
          <div className="flex items-center gap-6">
            <a href={`tel:${phone}`} className="flex items-center gap-1.5 hover:text-gold-400">
              <Phone className="h-3.5 w-3.5" /> {phone}
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-1.5 hover:text-gold-400">
              <Mail className="h-3.5 w-3.5" /> {email}
            </a>
          </div>
          <LanguageToggle />
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
                {t("higher_secondary_school")}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-gold-500/15 text-gold-400"
                      : "text-slate-200 hover:bg-white/5 hover:text-gold-400"
                  }`}
                >
                  {t(link.key)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <CommandPalette />
            <NotificationBell />
            <Link
              href="/admissions"
              className="hidden rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-5 py-2.5 text-sm font-semibold text-navy-950 shadow-lg shadow-gold-500/20 transition-transform hover:scale-105 md:inline-block"
            >
              {t("apply_now")}
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
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-gold-400"
              >
                {t(link.key)}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between">
              <LanguageToggle />
            </div>
            <Link
              href="/admissions"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-5 py-2.5 text-center text-sm font-semibold text-navy-950"
            >
              {t("apply_now")}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
