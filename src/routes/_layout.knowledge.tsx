import { createFileRoute } from "@tanstack/react-router";
import { PageContainer, PageHeader } from "@/components/app/shell";
import { Panel } from "@/components/app/ui";
import { documents } from "@/lib/mock/data";
import { BookOpen, Filter, Plus, Search, FileText } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_layout/knowledge")({
  component: KnowledgePage,
});

const types = ["All", "Policy", "Playbook", "Guideline", "Procedure"];

function KnowledgePage() {
  const [type, setType] = useState("All");
  const [q, setQ] = useState("");
  const filtered = documents
    .filter((d) => type === "All" || d.type === type)
    .filter((d) => d.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Knowledge Hub"
        title="Policies, playbooks, procedures"
        description="Everything AI agents cite when they reason. Searchable, versioned, always current."
        actions={
          <button className="rounded-lg bg-primary text-primary-foreground px-3 py-2 text-xs font-medium inline-flex items-center gap-1.5">
            <Plus className="h-3.5 w-3.5" /> Upload
          </button>
        }
      />

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-64">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full rounded-lg border border-border bg-card pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Semantic search across all documents…"
          />
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                type === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <button className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium hover:bg-accent/40 inline-flex items-center gap-1.5">
          <Filter className="h-3.5 w-3.5" /> More filters
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((d) => (
          <Panel key={d.id} className="group hover:border-primary/40 transition cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-medium text-primary uppercase tracking-wider">{d.type}</div>
                <h3 className="text-sm font-semibold mt-1 group-hover:text-primary transition">{d.title}</h3>
                <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{d.owner}</span>
                  <span>Updated {d.updated}</span>
                </div>
              </div>
            </div>
          </Panel>
        ))}
        {filtered.length === 0 ? (
          <Panel className="md:col-span-2 xl:col-span-3 text-center py-16">
            <BookOpen className="h-8 w-8 mx-auto text-muted-foreground" />
            <div className="mt-3 text-sm font-medium">No documents match.</div>
            <div className="text-xs text-muted-foreground mt-1">Try a broader search or a different type.</div>
          </Panel>
        ) : null}
      </div>
    </PageContainer>
  );
}