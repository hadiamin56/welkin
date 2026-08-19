"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function RouteProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- clear the bar once the route has actually changed
    setLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement)?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;
      if (anchor.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey) return;
      if (href === pathname) return;
      setLoading(true);
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  return (
    <div
      aria-hidden
      className={`fixed left-0 top-0 z-[100] h-[2.5px] bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 transition-all ease-out ${
        loading ? "w-full duration-[3000ms] opacity-100" : "w-0 duration-300 opacity-0"
      }`}
    />
  );
}
