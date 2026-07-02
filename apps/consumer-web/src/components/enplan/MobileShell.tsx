import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Ticket, User } from "lucide-react";
import type { ReactNode } from "react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-2xl font-extrabold tracking-tight ${className}`}>
      <span style={{ color: "#CDD917" }}>en</span>
      <span style={{ color: "#2B2B23" }}>plan</span>
      <span
        aria-hidden
        className="ml-0.5 inline-block h-1.5 w-1.5 translate-y-[-2px] rounded-full align-middle"
        style={{ backgroundColor: "#2B2B23" }}
      />
    </span>
  );
}

const TABS = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/beneficios", label: "Beneficios", icon: Ticket },
  { to: "/perfil", label: "Perfil", icon: User },
] as const;

function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 mx-auto flex w-full max-w-[430px] items-stretch justify-around border-t border-[#D6D0C4]/40 bg-white pb-[env(safe-area-inset-bottom)]"
      aria-label="Navegación principal"
    >
      {TABS.map(({ to, label, icon: Icon }) => {
        const active = pathname === to || (to !== "/" && pathname.startsWith(to));
        return (
          <Link
            key={to}
            to={to}
            className="flex flex-1 flex-col items-center gap-1 py-3 transition-colors"
          >
            <Icon
              size={22}
              strokeWidth={2.2}
              className={active ? "text-[#CDD917]" : "text-[#D6D0C4]"}
            />
            <span
              className={`text-[11px] ${
                active ? "font-semibold text-[#2B2B23]" : "text-[#A8A294]"
              }`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileShell({
  children,
  showNav = true,
}: {
  children: ReactNode;
  showNav?: boolean;
}) {
  return (
    <div className="min-h-screen w-full bg-[#FAF8F3]">
      <div className="relative mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-[#FAF8F3]">
        <main className={`flex-1 ${showNav ? "pb-24" : ""}`}>{children}</main>
        {showNav && <BottomNav />}
      </div>
    </div>
  );
}
