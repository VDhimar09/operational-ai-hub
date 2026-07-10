import { createFileRoute } from "@tanstack/react-router";
import { PageContainer, PageHeader } from "@/components/app/shell";
import { Panel, StatusBadge } from "@/components/app/ui";
import { agents } from "@/lib/mock/data";
import { Bot, MoreHorizontal, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_layout/ai-agents")({
  component: AgentsPage,
});

function AgentsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="AI Agents"
        title="Your operational workforce"
        description="Seven specialised agents coordinate reasoning, comms, recovery, and analytics across your organisation."
        actions={
          <button className="rounded-lg bg-primary text-primary-foreground px-3 py-2 text-xs font-medium inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> Configure agents
          </button>
        }
      />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {agents.map((a) => (
          <Panel key={a.id} className="group relative overflow-hidden">
            <div className="absolute inset-x-0 -top-24 h-40 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
            <div className="relative flex items-start gap-3">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary to-[oklch(0.62_0.19_275)] text-primary-foreground flex items-center justify-center shrink-0 shadow-md shadow-primary/20">
                <Bot className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold truncate">{a.name}</h3>
                  <StatusBadge kind={a.status as "online" | "idle"}>{a.status}</StatusBadge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{a.role}</p>
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-muted/40 px-3 py-2">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Confidence</div>
                <div className="text-sm font-semibold mt-0.5">{a.confidence}%</div>
              </div>
              <div className="rounded-lg bg-muted/40 px-3 py-2">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Last activity</div>
                <div className="text-sm font-semibold mt-0.5">{a.lastActivity}</div>
              </div>
            </div>

            <div className="mt-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">Capabilities</div>
              <div className="flex flex-wrap gap-1.5">
                {a.capabilities.map((c) => (
                  <span key={c} className="text-[11px] rounded-md border border-border bg-card px-2 py-0.5">{c}</span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button className="flex-1 rounded-lg bg-primary text-primary-foreground px-3 py-2 text-xs font-medium hover:opacity-90">Open console</button>
              <button className="rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-accent/30">Logs</button>
            </div>
          </Panel>
        ))}
      </div>
    </PageContainer>
  );
}