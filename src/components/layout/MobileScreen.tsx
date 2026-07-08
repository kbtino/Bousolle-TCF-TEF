import type { ReactNode } from "react";

/**
 * The app's shell: edge-to-edge on real phones, a centered
 * phone-width card on wider viewports (desktop preview / demo).
 */
export function MobileScreen({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen justify-center bg-bg sm:py-10 sm:px-3">
      <div className="flex min-h-[100dvh] w-full max-w-[420px] flex-col overflow-hidden bg-bg sm:min-h-[780px] sm:rounded-[22px] sm:border sm:border-border sm:shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
        {children}
      </div>
    </div>
  );
}
