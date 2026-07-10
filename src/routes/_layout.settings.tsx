import { createFileRoute } from "@tanstack/react-router";
import { PageContainer, PageHeader } from "@/components/app/shell";
import { Panel } from "@/components/app/ui";
import { Building2, Palette, ShieldCheck, Sparkles, Plug, Bell, ScrollText } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_layout/settings")({
  component: SettingsPage,
});

const tabs = [
  { id: "theme", label: "Theme", icon: Palette },
  { id: "org", label: "Organisation", icon: Building2 },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "ai", label: "AI Configuration", icon: Sparkles },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "audit", label: "Audit Logs", icon: ScrollText },
];

function SettingsPage() {
  const [active, setActive] = useState("ai");

  return (
    <PageContainer>
      <PageHeader eyebrow="Settings" title="Platform configuration" description="Tune the platform for your organisation, industry and risk posture." />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4">
        <Panel padded={false} className="p-2">
          <ul className="space-y-0.5">
            {tabs.map((t) => (
              <li key={t.id}>
                <button
                  onClick={() => setActive(t.id)}
                  className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                    active === t.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
                  }`}
                >
                  <t.icon className="h-4 w-4" />
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          {active === "ai" ? <AISettings /> : <GenericSettings label={tabs.find((t) => t.id === active)?.label ?? ""} />}
        </Panel>
      </div>
    </PageContainer>
  );
}

function AISettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold">AI Configuration</h3>
        <p className="text-sm text-muted-foreground mt-1">Behaviour of your operational agents.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "Autonomy level", value: "Supervised", hint: "Human approves impactful actions" },
          { label: "Confidence threshold", value: "80%", hint: "Below this, hand back to humans" },
          { label: "Data residency", value: "EU-West", hint: "Model + inference in-region" },
          { label: "Reasoning depth", value: "Balanced", hint: "Speed vs. thoroughness" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border p-4">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
            <div className="mt-1 text-lg font-semibold">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.hint}</div>
          </div>
        ))}
      </div>

      <div>
        <div className="text-sm font-semibold mb-2">Agent policies</div>
        <ul className="space-y-2 text-sm">
          {[
            "Communications Agent requires approval before publishing to public channels",
            "Recovery Agent may auto-execute reversible actions with confidence ≥ 90%",
            "Risk Agent must cite at least 2 sources for every recommendation",
          ].map((p) => (
            <li key={p} className="flex items-center gap-3 rounded-lg border border-border px-3 py-2">
              <span className="h-4 w-7 rounded-full bg-primary relative">
                <span className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full bg-white" />
              </span>
              <span className="flex-1">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function GenericSettings({ label }: { label: string }) {
  return (
    <div className="space-y-2">
      <h3 className="text-base font-semibold">{label}</h3>
      <p className="text-sm text-muted-foreground">Configuration surface for {label.toLowerCase()}. Wire this to Lovable Cloud when you're ready.</p>
      <div className="mt-4 rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        Placeholder — hook up your organisation policies here.
      </div>
    </div>
  );
}