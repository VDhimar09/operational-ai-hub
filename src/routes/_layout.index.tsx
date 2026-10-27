import { createFileRoute } from "@tanstack/react-router";
import { PageContainer, PageHeader } from "@/components/app/shell";
import { Metric, Panel, PanelHeader, StatusBadge } from "@/components/app/ui";
import {
  Activity,
  AlertOctagon,
  Brain,
  CheckCircle2,
  Gauge,
  ShieldAlert,
  Sparkles,
  Users2,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  availability,
  departments,
  events,
  recCategories,
  riskTrend,
  timelineEvents,
  workflowCompletion,
} from "@/lib/mock/data";

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
});

const chartColors = [
  "oklch(0.32 0.10 335)",
  "oklch(0.66 0.16 155)",
  "oklch(0.76 0.16 75)",
  "oklch(0.62 0.22 27)",
  "oklch(0.55 0.2 300)",
];

function Dashboard() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Operational Overview"
        title="East Midlands Council"
        description="Local Government • Production — Last updated 2 minutes ago."
        actions={
          <>
            <button className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium hover:bg-accent/40 transition">
              Last 7 days
            </button>
            <button className="rounded-lg bg-primary text-primary-foreground px-3 py-2 text-xs font-medium hover:opacity-90 transition inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Ask Operational AI
            </button>
          </>
        }
      />

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Metric
          label="Critical Services Online"
          value="34/36"
          delta="2 degraded"
          positive={false}
          icon={<CheckCircle2 className="h-4 w-4" />}
        />
        <Metric
          label="Operational Risks"
          value={12}
          delta="+3 today"
          positive={false}
          icon={<AlertOctagon className="h-4 w-4" />}
        />
        <Metric
          label="AI Recommendations"
          value={7}
          delta="4 awaiting approval"
          positive
          hint=""
          icon={<Sparkles className="h-4 w-4" />}
        />
        <Metric
          label="Pending Decisions"
          value={5}
          delta="2 overdue"
          positive={false}
          icon={<Gauge className="h-4 w-4" />}
        />
        <Metric
          label="Departments Impacted"
          value={4}
          delta="of 11"
          positive
          hint=""
          icon={<Users2 className="h-4 w-4" />}
        />
        <Metric
          label="Estimated Hours Saved"
          value="182h"
          delta="+24h this week"
          positive
          icon={<Brain className="h-4 w-4" />}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Panel className="xl:col-span-2">
          <PanelHeader
            title="Operational Risk Trend"
            subtitle="Composite score across cyber, staffing, supply, facilities"
            action={
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-primary" /> Composite
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[oklch(0.66_0.16_155)]" /> AI-adjusted
                </span>
              </div>
            }
          />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={riskTrend}>
                <defs>
                  <linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.32 0.10 335)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="oklch(0.32 0.10 335)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  stroke="oklch(0.92 0.012 255)"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="t"
                  tick={{ fontSize: 11, fill: "oklch(0.5 0.03 257)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "oklch(0.5 0.03 257)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid oklch(0.92 0.012 255)",
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="risk"
                  stroke="oklch(0.32 0.10 335)"
                  strokeWidth={2}
                  fill="url(#riskFill)"
                />
                <Line
                  type="monotone"
                  dataKey="ai"
                  stroke="oklch(0.66 0.16 155)"
                  strokeWidth={2}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Critical Alerts" subtitle="Requires attention" />
          <ul className="space-y-3">
            {events.slice(0, 4).map((e) => (
              <li key={e.id} className="flex items-start gap-3 group">
                <div className="mt-1 h-8 w-8 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
                  <ShieldAlert className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-muted-foreground">{e.id}</span>
                    <StatusBadge kind={e.priority}>{e.priority}</StatusBadge>
                  </div>
                  <div className="text-sm font-medium mt-0.5 truncate group-hover:text-primary transition">
                    {e.title}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    {e.department} · {e.createdAt}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Panel>
          <PanelHeader title="Service Availability" subtitle="Rolling 24h" />
          <div className="space-y-3">
            {availability.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium">{s.name}</span>
                  <span className="text-muted-foreground tabular-nums">{s.value.toFixed(2)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-[oklch(0.66_0.16_155)]"
                    style={{ width: `${Math.max(0, (s.value - 95) * 20)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Department Health" subtitle="Composite readiness score" />
          <div className="space-y-3">
            {departments.map((d) => (
              <div key={d.name} className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                  {d.name.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium truncate">{d.name}</span>
                    <span className="tabular-nums text-muted-foreground">{d.health}</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${d.health}%`,
                        background:
                          d.health > 85
                            ? "oklch(0.66 0.16 155)"
                            : d.health > 70
                              ? "oklch(0.32 0.10 335)"
                              : "oklch(0.76 0.16 75)",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="AI Recommendations by Category" subtitle="Last 30 days" />
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={recCategories}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={2}
                >
                  {recCategories.map((_, i) => (
                    <Cell key={i} fill={chartColors[i % chartColors.length]} stroke="none" />
                  ))}
                </Pie>
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Panel className="lg:col-span-2">
          <PanelHeader title="Workflow Completion" subtitle="Weekly throughput" />
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workflowCompletion}>
                <CartesianGrid
                  stroke="oklch(0.92 0.012 255)"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="d"
                  tick={{ fontSize: 11, fill: "oklch(0.5 0.03 257)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "oklch(0.5 0.03 257)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid oklch(0.92 0.012 255)",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="done" stackId="a" radius={[0, 0, 0, 0]} fill="oklch(0.32 0.10 335)" />
                <Bar
                  dataKey="pending"
                  stackId="a"
                  radius={[6, 6, 0, 0]}
                  fill="oklch(0.88 0.03 335)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Incident Timeline" subtitle="Auto-narrated by AI" />
          <ol className="relative border-l border-border ml-2 space-y-3">
            {timelineEvents.map((t, i) => (
              <li key={i} className="pl-4">
                <span className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full bg-primary ring-4 ring-primary/10" />
                <div className="text-[11px] text-muted-foreground font-mono">{t.t}</div>
                <div className="text-sm">{t.label}</div>
              </li>
            ))}
          </ol>
        </Panel>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Panel>
          <PanelHeader title="Tasks Awaiting Approval" subtitle="AI-proposed, human-in-the-loop" />
          <ul className="space-y-3 text-sm">
            {[
              "Rate-limit auth endpoints",
              "Reallocate 4 ED clinicians from Site B",
              "Activate carrier fallback #2",
            ].map((t, i) => (
              <li key={i} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{t}</div>
                  <div className="text-[11px] text-muted-foreground">
                    Confidence 88% · impacts 2 teams
                  </div>
                </div>
                <button className="text-xs font-medium text-primary hover:underline">Review</button>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel>
          <PanelHeader
            title="Directorate Snapshot"
            subtitle="Live health across council directorates"
          />
          <div className="space-y-3">
            {[
              { name: "Adults & Social Care", sector: "Statutory service", risk: 71 },
              { name: "Housing", sector: "Statutory service", risk: 58 },
              { name: "Waste Collection", sector: "Environmental", risk: 44 },
              { name: "Revenues & Benefits", sector: "Corporate", risk: 39 },
            ].map((o) => (
              <div key={o.name} className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 text-primary flex items-center justify-center text-xs font-semibold">
                  {o.name.slice(0, 1)}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{o.name}</div>
                  <div className="text-[11px] text-muted-foreground">{o.sector}</div>
                </div>
                <div className="text-xs font-semibold tabular-nums">{o.risk}</div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <PanelHeader title="Live Activity" subtitle="Last 5 minutes" />
          <ul className="space-y-3 text-sm">
            {[
              { icon: Users2, text: "Housing duty officer joined EVT-2481", t: "1m" },
              { icon: Activity, text: "Service risk score recalculated: 68", t: "2m" },
              { icon: Sparkles, text: "Comms Agent drafted Cabinet briefing", t: "3m" },
              { icon: CheckCircle2, text: "Winter gritting workflow WF-118 completed", t: "4m" },
            ].map((a, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-muted text-muted-foreground flex items-center justify-center">
                  <a.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 text-sm">{a.text}</div>
                <div className="text-[11px] text-muted-foreground">{a.t}</div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </PageContainer>
  );
}
