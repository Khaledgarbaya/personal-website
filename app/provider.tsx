// app/provider.tsx
import { useEffect, useState } from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

export function PHProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    posthog.init("phc_NSa5WBz25jF82E0VgXhUaWI6LBMTKHaKeljcOIMMhiL", {
      api_host: "https://us.i.posthog.com",
      capture_pageview: "history_change",
    });
    setHydrated(true);
  }, []);

  if (!hydrated) return <>{children}</>;
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
