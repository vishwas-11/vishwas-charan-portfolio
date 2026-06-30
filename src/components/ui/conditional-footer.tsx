"use client";

import { usePathname } from "next/navigation";
import { CinematicFooter } from "./motion-footer";

export function ConditionalFooter() {
  const pathname = usePathname();
  
  if (pathname !== "/") {
    return null;
  }

  return <CinematicFooter />;
}
