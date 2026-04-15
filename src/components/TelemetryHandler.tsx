"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { GitSageAPI } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

/**
 * TelemetryHandler captures anonymous page views and interactions.
 * It integrates with the GitSage Backend Telemetry engine to track
 * user reach, top countries, and platform usage globally.
 */
export default function TelemetryHandler() {
  const pathname = usePathname();
  const { user } = useAuth();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    // Only track if the path has actually changed to avoid double-counting on hydration
    if (pathname === lastTrackedPath.current) return;
    
    // Capture page view event
    GitSageAPI.trackEvent("page_view", "web", {
      path: pathname,
      timestamp: new Date().toISOString(),
      referrer: typeof document !== "undefined" ? document.referrer : ""
    }, user?.id);

    lastTrackedPath.current = pathname;
  }, [pathname, user?.id]);

  // This component doesn't render anything
  return null;
}
