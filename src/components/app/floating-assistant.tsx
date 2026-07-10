import { useState } from "react";
import { Sparkles, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full bg-gradient-to-br from-primary to-[oklch(0.22_0.09_335)] text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-105 transition-transform",
        )}
        aria-label="Open assistant"
      >
        {open ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
      </button>
      {open ? (
        <div className="fixed bottom-24 right-6 z-40 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-[oklch(0.22_0.09_335)] flex items-center justify-center text-primary-foreground">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <div>
              <div className="text-sm font-medium">Operational Advisor</div>
              <div className="text-[11px] text-muted-foreground">Grounded in live council operations</div>
            </div>
          </div>
          <div className="p-4 space-y-3 text-sm max-h-72 overflow-y-auto">
            <div className="rounded-xl bg-muted/60 px-3 py-2 text-muted-foreground">
              Ask about council services, operational risks, or recommended actions.
            </div>
            <div className="rounded-xl border border-border bg-background px-3 py-2">
              <div className="text-[11px] font-medium text-primary mb-1">Try</div>
              <ul className="space-y-1 text-[13px]">
                <li>"Why are Housing wait times rising this week?"</li>
                <li>"Which services are most exposed to the storm forecast?"</li>
                <li>"Summarise EVT-2481 for the Chief Executive."</li>
              </ul>
            </div>
          </div>
          <div className="p-3 border-t border-border flex items-center gap-2">
            <input
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Ask Operational AI…"
            />
            <button className="h-9 w-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}