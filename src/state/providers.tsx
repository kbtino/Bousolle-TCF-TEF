"use client";

import type { ReactNode } from "react";
import { OnboardingProvider } from "@/state/onboarding-context";
import { UserProgressProvider } from "@/state/user-progress-context";

/** Single place to stack every app-wide provider — add new ones here as
 * the app grows instead of nesting them ad hoc in layout.tsx. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <OnboardingProvider>
      <UserProgressProvider>{children}</UserProgressProvider>
    </OnboardingProvider>
  );
}
