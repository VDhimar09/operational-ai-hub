import { createFileRoute } from "@tanstack/react-router";
import { PageContainer, PageHeader } from "@/components/app/shell";
import { Panel, PanelHeader, StatusBadge } from "@/components/app/ui";
import { events } from "@/lib/mock/data";
import { Filter, Plus, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_layout/events")({
  component: EventsPage,
});

const filters = ["All", "Critical", "High", "Medium", "Low"];

function EventsPage() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? events : events.filter((e) => e.priority === filter.toLowerCase());

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Operational Events"
        title="Events"
        description="Every operational disruption — cyber, staffing, supply, weather, utility, building — coordinated in one place."
        actions={
          <>
            <button className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium hover:bg-accent/40 inline-flex items-center gap-1.5">
              <Filter className="h-3.5 w-3.5" /> Filter
            </button>
            <button className="rounded-lg bg-primary text-primary-foreground px-3 py-2 text-xs font-medium hover:opacity-90 inline-flex items-center gap-1.5">
              <Plus className="h-3.5 w-3.5" /> New event
            </button>
          </>
        }
      />

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-64">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className="w-full rounded-lg border border-border bg-card pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Search by title, org, department…"
          />
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Panel className="lg:col-span-2 p-0 overflow-hidden">
          <div className="grid grid-cols-[100px_1fr_120px_120px_100px] gap-3 px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground border-b border-border bg-muted/30">
            <div>ID</div>
            <div>Event</div>
            <div>Priority</div>
            <div>Status</div>
            <div className="text-right">Impact</div>
          </div>
          {filtered.map((e) => (
            <div key={e.id} className="grid grid-cols-[100px_1fr_120px_120px_100px] gap-3 px-5 py-4 items-center border-b border-border last:border-0 hover:bg-accent/30 transition cursor-pointer">
              <div className="text-xs font-mono text-muted-foreground">{e.id}</div>
              <div className="min-w-0">
                <div className="text-sm font-medium truncate">{e.title}</div>
                <div className="text-[11px] text-muted-foreground truncate">{e.organisation} · {e.department}</div>
              </div>
              <div><StatusBadge kind={e.priority}>{e.priority}</StatusBadge></div>
              <div><StatusBadge kind={e.status}>{e.status}</StatusBadge></div>
              <div className="text-right text-sm font-semibold tabular-nums">{e.impact}</div>
            </div>
          ))}
        </Panel>

        <Panel>
          <PanelHeader title={filtered[0]?.id ?? "Event"} subtitle={filtered[0]?.category} />
          {filtered[0] ? (
            <div className="space-y-4 text-sm">
              <div className="text-base font-medium leading-snug">{filtered[0].title}</div>
              <p className="text-muted-foreground">{filtered[0].description}</p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <Field label="Priority"><StatusBadge kind={filtered[0].priority}>{filtered[0].priority}</StatusBadge></Field>
                <Field label="Status"><StatusBadge kind={filtered[0].status}>{filtered[0].status}</StatusBadge></Field>
                <Field label="Impact Score"><span className="font-semibold">{filtered[0].impact}/100</span></Field>
                <Field label="AI Confidence"><span className="font-semibold">{filtered[0].confidence}%</span></Field>
                <Field label="Organisation"><span>{filtered[0].organisation}</span></Field>
                <Field label="Department"><span>{filtered[0].department}</span></Field>
                <Field label="Team"><span>{filtered[0].team}</span></Field>
                <Field label="Opened"><span>{filtered[0].createdAt}</span></Field>
              </div>
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-2">Dependencies</div>
                <div className="flex flex-wrap gap-1.5">
                  {filtered[0].dependencies.map((d) => (
                    <span key={d} className="inline-flex items-center rounded-md border border-border bg-muted/40 px-2 py-0.5 text-[11px]">{d}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-2">Related documents</div>
                <ul className="space-y-1.5">
                  {filtered[0].docs.map((d) => (
                    <li key={d} className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-xs">
                      <span>{d}</span>
                      <span className="text-primary font-medium hover:underline cursor-pointer">Open</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </Panel>
      </div>
    </PageContainer>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-1">{label}</div>
      <div>{children}</div>
    </div>
  );
}