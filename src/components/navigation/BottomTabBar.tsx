"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { IconClipboardText, IconHome, IconListCheck, IconUser } from "@tabler/icons-react";
import { pressable } from "@/lib/ui";

const TABS = [
  { href: "/dashboard", label: "Accueil", icon: IconHome },
  { href: "/bibliotheque", label: "Exercices", icon: IconListCheck },
  { href: "/simulation", label: "Simulation", icon: IconClipboardText },
  { href: "/profil", label: "Profil", icon: IconUser },
];

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <div className="flex border-t border-border bg-surface px-2 pb-2.5 pt-1.5">
      {TABS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={clsx("flex min-h-11 flex-1 flex-col items-center justify-center gap-0.5 py-1.5", pressable)}
          >
            <Icon size={19} className={active ? "text-primary" : "text-ink-400"} />
            <span className={clsx("text-[9.5px] font-semibold", active ? "text-primary" : "text-ink-400")}>
              {label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
