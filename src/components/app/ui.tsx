import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function Panel({
  className,
  children,
  padded = true,
}: {
  className?: string;
  children: ReactNode;
  padded?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]",
        padded && "p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PanelHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
        {subtitle ? <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Metric({
  label,
  value,
  delta,
  positive,
  hint,
  icon,
}: {
  label: string;
  value: string | number;
  delta?: string;
  positive?: boolean;
  hint?: string;
  icon?: ReactNode;
}) {
  return (
    <Panel className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="text-xs font-medium text-muted-foreground">{label}</div>
        {icon ? (
          <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            {icon}
          </div>
        ) : null}
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 flex items-center gap-2 text-xs">
        {delta ? (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-medium",
              positive ? "text-[oklch(0.55_0.15_155)]" : "text-destructive",
            )}
          >
            {positive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {delta}
          </span>
        ) : null}
        {hint ? <span className="text-muted-foreground">{hint}</span> : null}
      </div>
    </Panel>
  );
}

export function StatusBadge({
  kind,
  children,
}: {
  kind:
    | "critical"
    | "high"
    | "medium"
    | "low"
    | "active"
    | "monitoring"
    | "contained"
    | "resolved"
    | "online"
    | "idle"
    | "info"
    | "success"
    | "warning"
    | "ai";
  children: ReactNode;
}) {
  const styles: Record<string, string> = {
    critical: "bg-destructive/10 text-destructive ring-destructive/20",
    high: "bg-[oklch(0.95_0.06_35)] text-[oklch(0.5_0.18_35)] ring-[oklch(0.5_0.18_35)/0.2]",
    medium: "bg-[oklch(0.96_0.06_80)] text-[oklch(0.5_0.16_75)] ring-[oklch(0.5_0.16_75)/0.2]",
    low: "bg-muted text-muted-foreground ring-border",
    active: "bg-destructive/10 text-destructive ring-destructive/20",
    monitoring:
      "bg-[oklch(0.95_0.06_235)] text-[oklch(0.45_0.13_235)] ring-[oklch(0.45_0.13_235)/0.2]",
    contained:
      "bg-[oklch(0.95_0.06_155)] text-[oklch(0.42_0.13_155)] ring-[oklch(0.42_0.13_155)/0.2]",
    resolved: "bg-muted text-muted-foreground ring-border",
    online: "bg-[oklch(0.95_0.06_155)] text-[oklch(0.42_0.13_155)] ring-[oklch(0.42_0.13_155)/0.2]",
    idle: "bg-muted text-muted-foreground ring-border",
    info: "bg-primary/10 text-primary ring-primary/20",
    success:
      "bg-[oklch(0.95_0.06_155)] text-[oklch(0.42_0.13_155)] ring-[oklch(0.42_0.13_155)/0.2]",
    warning: "bg-[oklch(0.96_0.06_80)] text-[oklch(0.5_0.16_75)] ring-[oklch(0.5_0.16_75)/0.2]",
    ai: "bg-gradient-to-r from-primary/10 to-[oklch(0.22_0.09_335)/0.1] text-primary ring-primary/20",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset capitalize",
        styles[kind],
      )}
    >
      {children}
    </span>
  );
}
