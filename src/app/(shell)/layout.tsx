import type { ReactNode } from "react";
import { MobileScreen } from "@/components/layout/MobileScreen";
import { BottomTabBar } from "@/components/navigation/BottomTabBar";

/** Shared shell for the tabbed screens (Accueil/Exercices/Simulation/Profil) —
 * session screens (diagnostic, exercice, écriture, oral, paywall) render
 * full-screen instead and provide their own MobileScreen. */
export default function ShellLayout({ children }: { children: ReactNode }) {
  return (
    <MobileScreen>
      <div className="flex flex-1 flex-col overflow-y-auto">{children}</div>
      <BottomTabBar />
    </MobileScreen>
  );
}
