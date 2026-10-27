import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  AlertTriangle,
  Bot,
  Workflow,
  BarChart3,
  BookOpen,
  Users,
  Bell,
  Settings,
  Search,
  Command as CommandIcon,
  Sparkles,
  ChevronsUpDown,
  Plus,
  CircleDot,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CommandPalette } from "./command-palette";
import { FloatingAssistant } from "./floating-assistant";

type NavItem = {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
  badge?: number;
};
const nav: NavItem[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/events", label: "Events", icon: AlertTriangle, badge: 4 },
  { to: "/ai-operations", label: "AI Operations", icon: Sparkles },
  { to: "/ai-agents", label: "AI Agents", icon: Bot },
  { to: "/workflows", label: "Workflows", icon: Workflow },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/knowledge", label: "Knowledge Hub", icon: BookOpen },
  { to: "/teams", label: "Teams", icon: Users },
  { to: "/notifications", label: "Notifications", icon: Bell, badge: 3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function AppShell() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <div className="flex min-h-screen w-full">
        <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-border bg-sidebar">
          <div className="flex items-center gap-2 px-5 h-16 border-b border-border">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-[oklch(0.22_0.09_335)] flex items-center justify-center text-primary-foreground shadow-sm">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">Operational AI Hub</span>
              <span className="text-[11px] text-muted-foreground">
                Operational Intelligence Platform
              </span>
            </div>
          </div>

          <button className="mx-3 mt-4 flex items-center justify-between rounded-xl border border-border bg-card px-3 py-2 text-left text-sm shadow-[var(--shadow-card)] hover:bg-accent/40 transition-colors">
            <div className="flex items-center gap-2 min-w-0">
              <div className="h-7 w-7 rounded-md bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                EM
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-medium truncate">East Midlands Council</div>
                <div className="text-[11px] text-muted-foreground truncate">
                  Local Government · Production
                </div>
              </div>
            </div>
            <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground" />
          </button>

          <nav className="mt-4 px-2 flex-1 space-y-0.5">
            {nav.map((item) => {
              const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to as "/"}
                  className={cn(
                    "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                    active
                      ? "bg-primary/10 text-primary font-medium shadow-[inset_0_0_0_1px_oklch(0.32_0.10_335_/_0.15)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/60",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      active ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                    )}
                  />
                  <span className="flex-1 truncate">{item.label}</span>
                  {"badge" in item && item.badge ? (
                    <span className="inline-flex items-center justify-center rounded-full bg-primary/15 text-primary text-[10px] font-semibold h-5 min-w-5 px-1.5">
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="p-3 border-t border-border">
            <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-3">
              <div className="flex items-center gap-2 text-xs font-medium text-primary">
                <CircleDot className="h-3 w-3" /> System nominal
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                All 7 operational agents online. Last sync 2s ago.
              </p>
            </div>
          </div>
        </aside>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-20 h-16 flex items-center gap-3 border-b border-border bg-background/80 backdrop-blur-xl px-4 md:px-8">
            <button
              onClick={() => setPaletteOpen(true)}
              className="flex-1 max-w-xl flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm text-muted-foreground hover:bg-accent/40 transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>Search events, agents, docs…</span>
              <span className="ml-auto inline-flex items-center gap-1 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                <CommandIcon className="h-3 w-3" /> K
              </span>
            </button>
            <div className="ml-auto flex items-center gap-2">
              <button className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-accent/40 transition">
                <Plus className="h-3.5 w-3.5" /> New event
              </button>
              <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card hover:bg-accent/40 transition">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
              </button>
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[oklch(0.22_0.09_335)] to-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                AO
              </div>
            </div>
          </header>

          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <FloatingAssistant />
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
  eyebrow,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-6 border-b border-border">
      <div>
        {eyebrow ? (
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/80 mb-2">
            {eyebrow}
          </div>
        ) : null}
        <h1 className="text-2xl md:text-[28px] font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        {description ? (
          <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function PageContainer({ children }: { children: ReactNode }) {
  return <div className="px-4 md:px-8 py-6 md:py-8 max-w-[1600px] mx-auto">{children}</div>;
}
