import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  AlertTriangle,
  Bot,
  Workflow,
  BarChart3,
  BookOpen,
  Users,
  Bell,
  Settings,
  Sparkles,
  Plus,
  Zap,
} from "lucide-react";

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();
  const go = (to: string) => {
    onOpenChange(false);
    void navigate({ to });
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search or run a command…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => go("/")}>
            <LayoutDashboard /> Dashboard
          </CommandItem>
          <CommandItem onSelect={() => go("/events")}>
            <AlertTriangle /> Events
          </CommandItem>
          <CommandItem onSelect={() => go("/ai-operations")}>
            <Sparkles /> AI Operations
          </CommandItem>
          <CommandItem onSelect={() => go("/ai-agents")}>
            <Bot /> AI Agents
          </CommandItem>
          <CommandItem onSelect={() => go("/workflows")}>
            <Workflow /> Workflows
          </CommandItem>
          <CommandItem onSelect={() => go("/analytics")}>
            <BarChart3 /> Analytics
          </CommandItem>
          <CommandItem onSelect={() => go("/knowledge")}>
            <BookOpen /> Knowledge Hub
          </CommandItem>
          <CommandItem onSelect={() => go("/teams")}>
            <Users /> Teams
          </CommandItem>
          <CommandItem onSelect={() => go("/notifications")}>
            <Bell /> Notifications
          </CommandItem>
          <CommandItem onSelect={() => go("/settings")}>
            <Settings /> Settings
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Quick actions">
          <CommandItem onSelect={() => go("/events")}>
            <Plus /> Create operational event
          </CommandItem>
          <CommandItem onSelect={() => go("/ai-operations")}>
            <Zap /> Ask AI Operations Console
          </CommandItem>
          <CommandItem onSelect={() => go("/workflows")}>
            <Workflow /> New workflow from template
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
