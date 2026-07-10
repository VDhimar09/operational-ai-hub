import { createFileRoute } from "@tanstack/react-router";
import { PageContainer, PageHeader } from "@/components/app/shell";
import { Panel, StatusBadge } from "@/components/app/ui";
import { teamMembers } from "@/lib/mock/data";
import { Plus, Users } from "lucide-react";

export const Route = createFileRoute("/_layout/teams")({
  component: TeamsPage,
});

const roles = ["Administrator", "Operations Manager", "Department Lead", "Analyst", "Viewer"];

function TeamsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Teams & Access"
        title="Teams"
        description="Assign roles, manage on-call rotas, and see who is responding right now."
        actions={
          <button className="rounded-lg bg-primary text-primary-foreground px-3 py-2 text-xs font-medium inline-flex items-center gap-1.5">
            <Plus className="h-3.5 w-3.5" /> Invite member
          </button>
        }
      />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Panel className="lg:col-span-2 p-0 overflow-hidden">
          <div className="grid grid-cols-[1fr_1fr_120px_100px] gap-3 px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground border-b border-border bg-muted/30">
            <div>Member</div>
            <div>Role</div>
            <div>Organisation</div>
            <div className="text-right">Status</div>
          </div>
          {teamMembers.map((m, i) => (
            <div key={m.name} className="grid grid-cols-[1fr_1fr_120px_100px] gap-3 px-5 py-3 items-center border-b border-border last:border-0 hover:bg-accent/30">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-semibold text-primary-foreground shrink-0 bg-gradient-to-br ${
                  i % 3 === 0 ? "from-primary to-[oklch(0.62_0.19_275)]" :
                  i % 3 === 1 ? "from-[oklch(0.66_0.16_155)] to-primary" :
                  "from-[oklch(0.76_0.16_75)] to-[oklch(0.62_0.22_27)]"
                }`}>
                  {m.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{m.name}</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">{m.role}</div>
              <div className="text-xs text-muted-foreground truncate">{m.org}</div>
              <div className="text-right">
                <StatusBadge kind={m.status === "on-call" ? "warning" : m.status === "away" ? "idle" : "online"}>{m.status}</StatusBadge>
              </div>
            </div>
          ))}
        </Panel>

        <Panel>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            <Users className="h-3.5 w-3.5" /> Roles
          </div>
          <ul className="space-y-2">
            {roles.map((r) => (
              <li key={r} className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm">
                <span>{r}</span>
                <span className="text-[11px] text-muted-foreground">{Math.floor(Math.random() * 6) + 1} people</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </PageContainer>
  );
}