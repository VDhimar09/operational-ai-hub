import { createFileRoute } from "@tanstack/react-router";
import { PageContainer, PageHeader } from "@/components/app/shell";
import { Panel, StatusBadge } from "@/components/app/ui";
import { notifications } from "@/lib/mock/data";
import { AlertOctagon, AlertTriangle, CheckCircle2, Info, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_layout/notifications")({
  component: NotificationsPage,
});

const iconMap = {
  critical: AlertOctagon,
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle2,
  ai: Sparkles,
} as const;

function NotificationsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Notifications"
        title="Everything that needs your attention"
        description="Grouped, prioritised, and enriched by AI. Never miss what matters."
        actions={
          <button className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium hover:bg-accent/40">Mark all read</button>
        }
      />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Panel className="lg:col-span-2 p-0 overflow-hidden">
          {notifications.map((n, i) => {
            const Icon = iconMap[n.kind];
            return (
              <div key={n.id} className={`flex items-start gap-3 px-5 py-4 border-b border-border last:border-0 hover:bg-accent/30 ${i === 0 ? "bg-destructive/[0.03]" : ""}`}>
                <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${
                  n.kind === "critical" ? "bg-destructive/10 text-destructive" :
                  n.kind === "warning" ? "bg-[oklch(0.96_0.06_80)] text-[oklch(0.5_0.16_75)]" :
                  n.kind === "success" ? "bg-[oklch(0.95_0.06_155)] text-[oklch(0.42_0.13_155)]" :
                  n.kind === "ai" ? "bg-gradient-to-br from-primary to-[oklch(0.62_0.19_275)] text-primary-foreground" :
                  "bg-primary/10 text-primary"
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <StatusBadge kind={n.kind}>{n.kind}</StatusBadge>
                    <span className="text-[11px] text-muted-foreground">{n.time} ago</span>
                  </div>
                  <div className="text-sm font-medium mt-1">{n.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{n.detail}</div>
                </div>
                <button className="text-xs font-medium text-primary hover:underline">Open</button>
              </div>
            );
          })}
        </Panel>

        <Panel>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Channels</div>
          <ul className="space-y-2 text-sm">
            {["Email · digest 15m", "Microsoft Teams", "Slack (SecOps)", "PagerDuty", "SMS on-call"].map((c) => (
              <li key={c} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <span>{c}</span>
                <span className="h-4 w-7 rounded-full bg-primary/80 relative">
                  <span className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full bg-white" />
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </PageContainer>
  );
}