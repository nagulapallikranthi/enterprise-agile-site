export const portfolio = {
  identity: {
    name: "Kranthi Kumar Nagulapally",
    role: "Senior Program Leader",
    positioning: "Enterprise delivery, operational excellence and responsible AI adoption",
  },
  navigation: [
    { label: "Overview", href: "#overview" },
    { label: "Priorities", href: "#priorities" },
    { label: "Outcomes", href: "#outcomes" },
    { label: "Contact", href: "#contact" },
  ],
  metrics: [
    { value: "17+", label: "Years of experience", tone: "blue" },
    { value: "Global", label: "Team leadership", tone: "violet" },
    { value: "+22%", label: "SLA adherence", tone: "green" },
    { value: "0", label: "Critical delivery risks", tone: "green" },
  ],
  priorities: [
    {
      title: "Delivery predictability",
      description: "One decision rhythm connecting commitments, dependencies and release confidence.",
      health: "On track",
      progress: 84,
    },
    {
      title: "Operational excellence",
      description: "Service health, aging work and ownership signals translated into accountable action.",
      health: "On track",
      progress: 78,
    },
    {
      title: "Responsible automation",
      description: "Human-owned AI workflows with evidence, escalation paths and measurable outcomes.",
      health: "Watch",
      progress: 66,
    },
  ],
  outcomes: [
    "Unified governance across globally distributed delivery teams",
    "Automated leadership reporting and SLA health signals",
    "Task-level traceability from sprint commitment to deployment",
  ],
  outcomeDetails: [
    {
      label: "Unified governance",
      title: "One operating rhythm across cloud and delivery teams",
      summary: "Shared priorities, service signals and decision checkpoints create a consistent view of work without adding process overhead.",
      evidence: "A common governance model connects planned delivery, operational demand, dependencies and accountable ownership in one review rhythm.",
      result: "Result: leadership sees one trusted portfolio state while teams retain clear execution ownership.",
    },
    {
      label: "Decision-ready reporting",
      title: "Operational signals translated into leadership action",
      summary: "Automated health reporting highlights SLA exposure, ageing work and exceptions that require intervention.",
      evidence: "Validated measures, explicit thresholds and evidence-linked summaries replace manual status collection and conflicting interpretations.",
      result: "Result: review time moves from assembling reports to making decisions.",
    },
    {
      label: "Delivery traceability",
      title: "Commitments connected to deployment evidence",
      summary: "Work remains traceable from sprint intent through validation and release, making delivery confidence visible before promotion.",
      evidence: "Task, change, test and environment evidence are reconciled at release gates while approval authority remains human-owned.",
      result: "Result: progress claims are auditable and release decisions are supported by current evidence.",
    },
  ],
} as const;

export type Portfolio = typeof portfolio;
