"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { RouteProgress } from "@/components/site/route-progress";
import { ServiceWorkerRegister } from "@/components/site/sw-register";
import type { SiteSettings } from "@/types/content";
import type { NavCategory } from "@/types/content";

export function SiteChrome({
  settings,
  navCategories,
  children,
}: {
  settings: SiteSettings;
  navCategories: NavCategory[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <ServiceWorkerRegister />
      <Suspense fallback={null}>
        <RouteProgress />
      </Suspense>
      <SiteHeader
        schoolName={settings.school_name}
        logoUrl={settings.logo_url}
        phone={settings.phone}
        email={settings.email}
        navCategories={navCategories}
      />
      <main key={pathname} className="flex-1 animate-fade-up">
        {children}
      </main>
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
