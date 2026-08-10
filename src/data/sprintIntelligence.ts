export const sprintIntelligence = {
  summary: [
    { label: "Commitment reliability", value: "86%", status: "On track", tone: "healthy" },
    { label: "Scope stability", value: "91%", status: "Stable", tone: "healthy" },
    { label: "Flow efficiency", value: "68%", status: "Watch", tone: "watch" },
    { label: "Delivery risk", value: "2", status: "Needs action", tone: "act" },
  ],
  sections: [
    {
      id: "predictability",
      label: "Predictability",
      eyebrow: "Commitment confidence",
      title: "The sprint remains inside its delivery boundary",
      summary: "Committed work is progressing at a healthy rate. Two items need an explicit recovery decision before they affect the sprint goal.",
      metrics: [
        ["Committed", "42 SP", "Baseline"],
        ["Forecast complete", "36 SP", "86%"],
        ["Carryover risk", "6 SP", "Watch"],
      ],
      signal: "Decision: protect the sprint goal and recover only the two items with a named owner and dated plan.",
    },
    {
      id: "scope",
      label: "Scope",
      eyebrow: "Change control",
      title: "Scope change is low and visible",
      summary: "Four points entered after sprint start and no committed work was removed. The change remains within the agreed tolerance.",
      metrics: [
        ["Added", "+4 SP", "9%"],
        ["Removed", "0 SP", "Stable"],
        ["Unplanned share", "8.7%", "Within limit"],
      ],
      signal: "Decision: accept the current change, but require impact evidence before any further scope enters the sprint.",
    },
    {
      id: "flow",
      label: "Flow",
      eyebrow: "Execution movement",
      title: "Work is moving, with one review constraint",
      summary: "Cycle time is stable, but review ageing is slowing completion. Rebalancing reviewer capacity is the fastest available intervention.",
      metrics: [
        ["Median cycle", "3.8d", "Stable"],
        ["Work in progress", "11", "Healthy"],
        ["Review ageing", "2.1d", "Watch"],
      ],
      signal: "Decision: move one reviewer to the ageing queue until every item has a next action within one business day.",
    },
    {
      id: "risk",
      label: "Delivery risk",
      eyebrow: "Intervention queue",
      title: "Two risks require ownership, not more reporting",
      summary: "A dependency and a validation delay are the only material threats to the sprint goal. Both have time-bound recovery paths.",
      metrics: [
        ["Critical", "0", "Clear"],
        ["High", "2", "Act"],
        ["Unowned", "0", "Controlled"],
      ],
      signal: "Decision: confirm the dependency by tomorrow and keep the validation item outside release scope until evidence is complete.",
    },
  ],
} as const;

