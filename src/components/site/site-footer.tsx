import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5H16l.5-3H13.5V8.5c0-.9.25-1.5 1.6-1.5H16.5V4.3c-.28-.04-1.25-.12-2.37-.12-2.35 0-3.96 1.44-3.96 4.08V10.5H8v3h2.17V21h3.33Z" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 8.5H4.06V20h2.88V8.5ZM5.5 4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM20 20h-2.88v-5.9c0-1.4-.5-2.36-1.75-2.36-.96 0-1.53.65-1.78 1.28-.09.22-.11.53-.11.84V20H10.6s.04-10.36 0-11.5h2.88v1.63c.38-.59 1.07-1.43 2.6-1.43 1.9 0 3.32 1.24 3.32 3.9V20Z" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.4 7.2c.01.18.01.36.01.54 0 5.48-4.17 11.8-11.8 11.8-2.35 0-4.53-.69-6.36-1.87.33.04.65.05.99.05a8.35 8.35 0 0 0 5.17-1.78 4.16 4.16 0 0 1-3.88-2.89c.26.04.51.07.79.07.38 0 .75-.05 1.1-.14A4.15 4.15 0 0 1 2.98 9v-.05c.56.31 1.2.5 1.88.52A4.15 4.15 0 0 1 3.15 5.5c0-.77.2-1.48.56-2.09a11.8 11.8 0 0 0 8.55 4.33 4.68 4.68 0 0 1-.11-.95 4.15 4.15 0 0 1 7.18-2.84 8.2 8.2 0 0 0 2.63-1 4.16 4.16 0 0 1-1.82 2.3 8.3 8.3 0 0 0 2.39-.65 8.5 8.5 0 0 1-2.13 2.2Z" />
    </svg>
  );
}

const QUICK_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/admissions", label: "Admissions" },
  { href: "/achievements", label: "Achievements" },
  { href: "/alumni", label: "Alumni" },
  { href: "/mandatory-disclosures", label: "Mandatory Disclosures" },
];

export function SiteFooter({
  schoolName,
  logoUrl,
  phone,
  email,
  address,
  facebookUrl,
  linkedinUrl,
  twitterUrl,
}: {
  schoolName: string;
  logoUrl: string;
  phone: string;
  email: string;
  address: string;
  facebookUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
}) {
  return (
    <footer className="bg-navy-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="relative h-12 w-12 overflow-hidden rounded-full bg-white/10 ring-2 ring-gold-400/60">
              <Image src={logoUrl} alt={schoolName} fill sizes="48px" className="object-contain p-1" />
            </span>
            <span className="text-lg font-bold text-white">{schoolName}</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            S.R.M Welkin Higher Secondary School, Sopore — shaping bright futures through
            academic excellence and strong values.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { icon: FacebookIcon, href: facebookUrl },
              { icon: LinkedInIcon, href: linkedinUrl },
              { icon: TwitterIcon, href: twitterUrl },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-300 transition-colors hover:bg-gold-500 hover:text-navy-950"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-400">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-slate-400 transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-400">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/academics" className="text-slate-400 hover:text-white">Academics</Link></li>
            <li><Link href="/gallery" className="text-slate-400 hover:text-white">Gallery</Link></li>
            <li><Link href="/notifications" className="text-slate-400 hover:text-white">Notifications</Link></li>
            <li><Link href="/results" className="text-slate-400 hover:text-white">Results</Link></li>
            <li><Link href="/contact" className="text-slate-400 hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-400">
            Our Contacts
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li className="flex gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /> {address}</li>
            <li className="flex gap-2.5"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /> <a href={`tel:${phone}`} className="hover:text-white">{phone}</a></li>
            <li className="flex gap-2.5"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /> <a href={`mailto:${email}`} className="hover:text-white">{email}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
        Copyright © {new Date().getFullYear()} {schoolName}. All rights reserved.
      </div>
    </footer>
  );
}
