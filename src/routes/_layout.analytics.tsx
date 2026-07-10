import { createFileRoute } from "@tanstack/react-router";
import { PageContainer, PageHeader } from "@/components/app/shell";
import { Metric, Panel, PanelHeader } from "@/components/app/ui";
import { analyticsKpis, departments, riskTrend, workflowCompletion } from "@/lib/mock/data";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Radar,
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/_layout/analytics")({
  component: AnalyticsPage,
});

const distribution = [
  { name: "Critical", value: 8 },
  { name: "High", value: 14 },
  { name: "Medium", value: 22 },
  { name: "Low", value: 31 },
];

const colors = [
  "oklch(0.62 0.22 27)",
  "oklch(0.76 0.16 75)",
  "oklch(0.32 0.10 335)",
  "oklch(0.66 0.16 155)",
];

function AnalyticsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Analytics"
        title="Executive KPIs"
        description="Operational performance, AI accuracy, downtime, and departmental health — normalised across your organisations."
      />

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsKpis.map((k) => (
          <Metric key={k.label} label={k.label} value={k.value} delta={k.delta} positive={k.positive} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Panel className="xl:col-span-2">
          <PanelHeader title="Risk vs. AI-adjusted risk" subtitle="Weekly trend" />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={riskTrend}>
                <CartesianGrid stroke="oklch(0.92 0.012 255)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="t" tick={{ fontSize: 11, fill: "oklch(0.5 0.03 257)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "oklch(0.5 0.03 257)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.012 255)", fontSize: 12 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="risk" stroke="oklch(0.32 0.10 335)" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="ai" stroke="oklch(0.66 0.16 155)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Risk distribution" subtitle="Events by severity" />
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={distribution} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={2}>
                  {distribution.map((_, i) => <Cell key={i} fill={colors[i]} stroke="none" />)}
                </Pie>
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="mt-4 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Panel>
          <PanelHeader title="Department performance" subtitle="Composite readiness" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={departments}>
                <PolarGrid stroke="oklch(0.92 0.012 255)" />
                <PolarAngleAxis dataKey="name" tick={{ fontSize: 10, fill: "oklch(0.5 0.03 257)" }} />
                <PolarRadiusAxis tick={{ fontSize: 9 }} axisLine={false} />
                <Radar dataKey="health" stroke="oklch(0.32 0.10 335)" fill="oklch(0.32 0.10 335)" fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel className="xl:col-span-2">
          <PanelHeader title="Workflow throughput" subtitle="Completed vs pending" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workflowCompletion}>
                <CartesianGrid stroke="oklch(0.92 0.012 255)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="d" tick={{ fontSize: 11, fill: "oklch(0.5 0.03 257)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "oklch(0.5 0.03 257)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.012 255)", fontSize: 12 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="done" fill="oklch(0.32 0.10 335)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="pending" fill="oklch(0.88 0.03 335)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>
    </PageContainer>
  );
}