export const portfolio = {
  identity: {
    name: "Kranthi Kumar Nagulapally",
    role: "Staff Program Manager",
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
    { value: "5", label: "Teams governed", tone: "violet" },
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
    "Unified CloudOps and DevOps governance across five teams",
    "Automated leadership reporting and SLA health signals",
    "Task-level traceability from sprint commitment to deployment",
  ],
} as const;

export type Portfolio = typeof portfolio;
