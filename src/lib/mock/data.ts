export type Priority = "critical" | "high" | "medium" | "low";
export type EventStatus = "active" | "monitoring" | "contained" | "resolved";

export interface OpEvent {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: EventStatus;
  organisation: string;
  department: string;
  category: string;
  impact: number;
  confidence: number;
  createdAt: string;
  team: string;
  dependencies: string[];
  docs: string[];
}

export const events: OpEvent[] = [
  {
    id: "EVT-2481",
    title: "Credential stuffing attempts on resident portal",
    description:
      "Unusual sign-in spikes across the resident self-service portal. AI detected a coordinated credential stuffing pattern from overseas IP ranges.",
    priority: "critical",
    status: "active",
    organisation: "East Midlands Council",
    department: "ICT Services",
    category: "Cyber Attack",
    impact: 92,
    confidence: 94,
    createdAt: "2m ago",
    team: "Cyber Security · ICT",
    dependencies: ["Resident Portal", "Council Tax Sign-in", "Single Sign-on"],
    docs: ["Cyber Incident Playbook v4.2", "NCSC Alignment Charter"],
  },
  {
    id: "EVT-2479",
    title: "Waste collection routing system degraded",
    description:
      "In-cab routing p95 latency drifting past service threshold. Projected impact across 3 collection rounds in the north of the county.",
    priority: "high",
    status: "monitoring",
    organisation: "East Midlands Council",
    department: "Waste Collection",
    category: "IT Outage",
    impact: 71,
    confidence: 88,
    createdAt: "18m ago",
    team: "Fleet Operations",
    dependencies: ["Routing Platform", "In-cab Devices", "Depot Systems"],
    docs: ["Service Continuity Charter", "Manual Rounds Runbook"],
  },
  {
    id: "EVT-2476",
    title: "Adult social care duty rota below threshold",
    description:
      "Overnight duty cover projected 22% below statutory floor. AI suggests cross-locality reallocation from West team.",
    priority: "high",
    status: "active",
    organisation: "East Midlands Council",
    department: "Social Care",
    category: "Staff Shortage",
    impact: 64,
    confidence: 82,
    createdAt: "1h ago",
    team: "Workforce Planning",
    dependencies: ["Rota System", "Agency Framework"],
    docs: ["Escalation Matrix", "Mutual Aid Agreement"],
  },
  {
    id: "EVT-2470",
    title: "Planning portal document upload delays",
    description:
      "Planning applications backlog rising after upload service slowdown. AI flags SLA breach risk on 42 submissions within 72h.",
    priority: "medium",
    status: "monitoring",
    organisation: "East Midlands Council",
    department: "Planning",
    category: "Service Degradation",
    impact: 48,
    confidence: 76,
    createdAt: "3h ago",
    team: "Digital Services",
    dependencies: ["Planning Portal", "Document Store"],
    docs: ["Statutory Response SLA"],
  },
  {
    id: "EVT-2465",
    title: "Severe weather approaching highways network",
    description:
      "Met Office amber warning intersects with A-road network overnight. Highways and Emergency Planning on standby.",
    priority: "medium",
    status: "monitoring",
    organisation: "East Midlands Council",
    department: "Highways",
    category: "Weather Disruption",
    impact: 39,
    confidence: 71,
    createdAt: "5h ago",
    team: "Emergency Planning",
    dependencies: ["Gritter Fleet", "CCTV Network"],
    docs: ["Storm Response Playbook"],
  },
  {
    id: "EVT-2461",
    title: "Customer contact centre queue surge",
    description:
      "Inbound calls to Customer Services 3× baseline following billing cycle. Overflow to web chat engaged.",
    priority: "low",
    status: "contained",
    organisation: "East Midlands Council",
    department: "Customer Services",
    category: "Demand Surge",
    impact: 22,
    confidence: 89,
    createdAt: "yesterday",
    team: "Contact Centre",
    dependencies: ["Telephony", "Webchat Bot"],
    docs: ["Contact Centre SOP"],
  },
];

export const riskTrend = [
  { t: "Mon", risk: 42, ai: 38 },
  { t: "Tue", risk: 51, ai: 46 },
  { t: "Wed", risk: 47, ai: 44 },
  { t: "Thu", risk: 58, ai: 55 },
  { t: "Fri", risk: 64, ai: 60 },
  { t: "Sat", risk: 61, ai: 58 },
  { t: "Sun", risk: 72, ai: 68 },
];

export const availability = [
  { name: "Resident Portal", value: 99.71 },
  { name: "Council Tax", value: 99.99 },
  { name: "Planning Portal", value: 98.4 },
  { name: "Waste Routing", value: 99.6 },
  { name: "Housing Register", value: 99.98 },
  { name: "Contact Centre", value: 99.9 },
];

export const departments = [
  { name: "Social Care", health: 82, status: "stable" },
  { name: "ICT Services", health: 61, status: "degraded" },
  { name: "Housing", health: 74, status: "stable" },
  { name: "Highways", health: 88, status: "stable" },
  { name: "Revenues & Benefits", health: 95, status: "healthy" },
  { name: "Customer Services", health: 91, status: "healthy" },
];

export const workflowCompletion = [
  { d: "W1", done: 42, pending: 8 },
  { d: "W2", done: 51, pending: 6 },
  { d: "W3", done: 48, pending: 11 },
  { d: "W4", done: 63, pending: 5 },
  { d: "W5", done: 58, pending: 9 },
  { d: "W6", done: 71, pending: 4 },
];

export const recCategories = [
  { name: "Containment", value: 34 },
  { name: "Recovery", value: 22 },
  { name: "Comms", value: 18 },
  { name: "Staffing", value: 14 },
  { name: "Procurement", value: 12 },
];

export const agents = [
  {
    id: "operations",
    name: "Operations Agent",
    role: "Coordinates active operational events",
    status: "online",
    confidence: 94,
    lastActivity: "just now",
    capabilities: ["Event triage", "Cross-team routing", "SLA tracking"],
  },
  {
    id: "risk",
    name: "Risk Agent",
    role: "Quantifies cascading operational risk",
    status: "online",
    confidence: 91,
    lastActivity: "2m ago",
    capabilities: ["Scenario modelling", "Dependency graph", "Impact scoring"],
  },
  {
    id: "recovery",
    name: "Recovery Agent",
    role: "Plans restoration and continuity paths",
    status: "online",
    confidence: 87,
    lastActivity: "4m ago",
    capabilities: ["Runbook selection", "RTO planning", "Failback"],
  },
  {
    id: "planning",
    name: "Planning Agent",
    role: "Aligns resources and calendars",
    status: "idle",
    confidence: 83,
    lastActivity: "22m ago",
    capabilities: ["Capacity planning", "Rota rebalancing"],
  },
  {
    id: "comms",
    name: "Communications Agent",
    role: "Drafts stakeholder-appropriate updates",
    status: "online",
    confidence: 92,
    lastActivity: "1m ago",
    capabilities: ["Exec briefs", "Public statements", "Internal comms"],
  },
  {
    id: "knowledge",
    name: "Knowledge Agent",
    role: "Retrieves policies, playbooks and precedent",
    status: "online",
    confidence: 96,
    lastActivity: "just now",
    capabilities: ["Semantic search", "Citation", "Policy diff"],
  },
  {
    id: "analytics",
    name: "Analytics Agent",
    role: "Explains trends and anomalies",
    status: "online",
    confidence: 89,
    lastActivity: "8m ago",
    capabilities: ["Root-cause narrative", "KPI decomposition"],
  },
];

export const notifications = [
  {
    id: "n1",
    kind: "critical" as const,
    title: "Auth gateway anomaly escalated to Sev-1",
    detail: "Operations Agent auto-paged SecOps duty rota.",
    time: "2m",
  },
  {
    id: "n2",
    kind: "ai" as const,
    title: "Recommendation ready: Cross-site staffing reallocation",
    detail: "Confidence 82% · impacts 3 wards · awaiting approval.",
    time: "14m",
  },
  {
    id: "n3",
    kind: "warning" as const,
    title: "WMS p95 latency drifting past SLO",
    detail: "Projected breach in 47 minutes if trend continues.",
    time: "18m",
  },
  {
    id: "n4",
    kind: "success" as const,
    title: "Workflow WF-118 completed",
    detail: "Council HVAC contingency executed within RTO.",
    time: "1h",
  },
  {
    id: "n5",
    kind: "info" as const,
    title: "Weekly resilience report available",
    detail: "Analytics Agent published Q-week 27 briefing.",
    time: "3h",
  },
];

export const documents = [
  { id: "d1", title: "Cyber Incident Response Playbook", type: "Playbook", updated: "2d ago", owner: "InfoSec" },
  { id: "d2", title: "Business Continuity Policy v6", type: "Policy", updated: "1w ago", owner: "Risk & Compliance" },
  { id: "d3", title: "Clinical Escalation Matrix", type: "Guideline", updated: "3d ago", owner: "Clinical Ops" },
  { id: "d4", title: "Supplier Failover SOP", type: "Procedure", updated: "5d ago", owner: "Procurement" },
  { id: "d5", title: "Storm & Severe Weather Response", type: "Playbook", updated: "12d ago", owner: "Facilities" },
  { id: "d6", title: "Public Communications Charter", type: "Policy", updated: "1mo ago", owner: "Comms" },
  { id: "d7", title: "Data Centre Runbook — Tier 1", type: "Procedure", updated: "6d ago", owner: "SRE" },
  { id: "d8", title: "AI Governance Framework", type: "Policy", updated: "2w ago", owner: "Risk & Compliance" },
];

export const teamMembers = [
  { name: "Amara Okafor", role: "Chief Operating Officer", org: "East Midlands Council", status: "on-call" },
  { name: "Ren Takahashi", role: "Head of ICT & Cyber", org: "East Midlands Council", status: "active" },
  { name: "Sofia Marín", role: "Waste Operations Lead", org: "East Midlands Council", status: "active" },
  { name: "David Ojo", role: "Planning Service Manager", org: "East Midlands Council", status: "away" },
  { name: "Priya Ramanathan", role: "Head of Social Care", org: "East Midlands Council", status: "active" },
  { name: "Lars Bergström", role: "Director of Communications", org: "East Midlands Council", status: "on-call" },
  { name: "Chen Wei", role: "Emergency Planning Officer", org: "East Midlands Council", status: "active" },
  { name: "Isabelle Laurent", role: "Revenues & Benefits Lead", org: "East Midlands Council", status: "active" },
];

export const workflowNodes = [
  { id: "trigger", label: "Trigger", kind: "trigger", desc: "Event ingest · webhook / signal" },
  { id: "ai", label: "AI Analysis", kind: "ai", desc: "Operations Agent classifies + enriches" },
  { id: "risk", label: "Risk Assessment", kind: "ai", desc: "Risk Agent scores cascading impact" },
  { id: "approval", label: "Human Approval", kind: "human", desc: "Ops Manager gate · SLA 5m" },
  { id: "tasks", label: "Task Creation", kind: "action", desc: "Assign to responders · create runbook" },
  { id: "notify", label: "Notifications", kind: "action", desc: "Multi-channel stakeholder comms" },
  { id: "resolve", label: "Resolution", kind: "terminal", desc: "Verify · post-incident review" },
];

export const analyticsKpis = [
  { label: "Avg. Resolution Time", value: "1h 42m", delta: "-14%", positive: true },
  { label: "AI Recommendation Accuracy", value: "92.4%", delta: "+3.1pp", positive: true },
  { label: "Operational Downtime", value: "0.41%", delta: "-0.08pp", positive: true },
  { label: "Mean Impact Score", value: "48", delta: "-6", positive: true },
];

export const timelineEvents = [
  { t: "09:14", label: "Operations Agent opened EVT-2481", tone: "critical" },
  { t: "09:15", label: "Risk Agent scored cascading impact: 92", tone: "warning" },
  { t: "09:17", label: "Communications Agent drafted internal brief", tone: "info" },
  { t: "09:22", label: "Workforce Command acknowledged", tone: "info" },
  { t: "09:31", label: "Auto-mitigation: rate limiting engaged", tone: "success" },
  { t: "09:44", label: "Recovery Agent proposed 3 continuity paths", tone: "info" },
];