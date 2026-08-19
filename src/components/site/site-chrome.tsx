"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import type { SiteSettings } from "@/types/content";

export function SiteChrome({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <SiteHeader
        schoolName={settings.school_name}
        logoUrl={settings.logo_url}
        phone={settings.phone}
        email={settings.email}
      />
      <main className="flex-1">{children}</main>
      <SiteFooter
        schoolName={settings.school_name}
        logoUrl={settings.logo_url}
        phone={settings.phone}
        email={settings.email}
        address={settings.address}
        facebookUrl={settings.facebook_url}
        linkedinUrl={settings.linkedin_url}
        twitterUrl={settings.twitter_url}
      />
    </>
  );
}
