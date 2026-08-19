---
title: "SAFe Ceremonies Are Not Your Problem"
category: "Delivery Governance"
excerpt: "Organisations that struggle with SAFe rarely struggle with the ceremonies. They struggle with the decisions the ceremonies are supposed to produce."
publishDate: "2026-08-15"
readTime: "7 min"
articleNumber: 6
---


---

The PI Planning event ran for two days. Forty-three people were in the room — remote and in-person — across five Agile Release Trains. By the time the teams broke into their ART planning sessions on the afternoon of day one, the features on the board had been given names, assigned to teams, and placed into PI increments. Half of them had no acceptance criteria. A quarter had no clear owner. Nobody paused. Nobody said anything. The planning continued.

Six months later, the same organisation ran a retrospective on why the PI had delivered 58% of its committed features. The diagnosis from leadership: "PI Planning is too long. We need to shorten the ceremony."

They were wrong — and the error is common enough to be worth naming.

---

## The Real Problem Is Not the Meeting

PI Planning does not fail because it runs for two days. It fails because what arrives on day one of that two-day event is not ready to be planned.

When features have no acceptance criteria, teams cannot estimate them honestly. They produce a number — because the ceremony requires a number — and that number is fiction dressed as a commitment. When features have no clear owner, dependency conversations cannot happen in any meaningful way, because nobody in the room has the authority to negotiate on behalf of the work. When half the inputs are wrong, extending or shortening the meeting by four hours changes nothing of substance.

SAFe ceremonies exist to create structured coordination at scale. They are coordination mechanisms, not problem-solving mechanisms. The mistake most organisations make is treating the ceremony as the place where problems are discovered, when the ceremony should only be the place where pre-solved decisions are synchronised.

This distinction has a hard practical implication: the quality of your PI Planning output is determined almost entirely by what happens in the six weeks before the event. The two days in the room are mostly a stress test on whether that preparation was adequate.

---

## Four Anti-Patterns Worth Naming

**Attending without prepared data.** Teams arrive at System Demo or Sprint Planning having reviewed nothing in advance. The meeting becomes the first look, which means the meeting becomes the review — and no coordination happens because everyone is still reading. Ceremonies are not information-delivery mechanisms. They are decision-coordination mechanisms. If participants have not read the inputs before the room opens, the ceremony cannot function as designed.

**Using the ceremony to discover dependencies.** Dependencies should be mapped before PI Planning, not inside it. When a team discovers mid-session that Feature A in ART 1 is blocked by a capability that ART 3 has not planned, the entire planning board stalls while teams renegotiate. Dependency mapping should happen during Program Backlog Refinement, weeks before the event. The PI Planning session should surface two or three dependencies nobody caught — not forty.

**Treating the ceremony as the accountability mechanism.** Sprint Review is not where accountability happens. Sprint Review is where the increment is demonstrated. Accountability happens in the continuous conversations between Scrum Master, Product Owner, and team during the sprint — in daily standups, in mid-sprint health checks, in the moments when a story goes red and someone makes a decision about it. When organisations skip those continuous touchpoints and rely on the ceremony to surface all failures, they discover problems far later than they should. The ceremony is a coordination point, not a substitute for ongoing accountability.

**Conflating cadence with discipline.** Running ceremonies on schedule is not the same as running them well. An organisation that holds PI Planning every quarter but consistently arrives without refined features, holds Sprint Planning every two weeks but consistently pulls stories that haven't met the Definition of Ready, and holds Inspect & Adapt every PI but discusses feelings rather than metrics — that organisation has cadence without discipline. The ceremony calendar is the easiest part of SAFe to implement. It is also the least valuable part in isolation.

---

## Ceremony Health Check

The following table maps each ceremony to what must exist before the room opens, the failure mode that most commonly prevents it from working, and the recovery action that restores function without abandoning the ceremony.

| Ceremony | Input that must exist | Most common failure | Recovery action |
|---|---|---|---|
| PI Planning | Prioritised features with acceptance criteria | Features have no AC or owner | Defer feature; assign AC owner before session |
| Sprint Planning | Refined backlog items with DoR met | Items pulled without DoR check | Stop and refine; do not pull unready work |
| System Demo | Integrated, tested increment | Teams demo in isolation | Require integration environment before demo |
| Inspect & Adapt | Quantified problem statement | Subjective "we feel" discussion | Mandate metric with trend before I&A |
| ART Sync | Cross-team dependency status | Sync becomes a status read-out | Use dependency board; discuss only exceptions |

The recovery action for Sprint Planning is worth elaborating on: *stop and refine; do not pull unready work.* This is the one that most teams resist, because pulling unready work feels productive — the sprint starts, people have tasks, something is happening. In practice, unready stories generate scope churn, mid-sprint renegotiation, and spillover that compounds into the next sprint. The cost of stopping to refine in Sprint Planning is two hours. The cost of pulling an unready story is often two weeks.

---

## KPIs for ART Delivery Health

These metrics do not tell you how well you are running ceremonies. They tell you whether your ceremonies are producing the outcomes they exist to create.

**Feature Acceptance Rate:** Percentage of PI-committed features accepted by the Business Owner at System Demo. Below 80% is a planning problem, not a delivery problem.

**Dependency Resolution Rate:** Percentage of mapped dependencies resolved before they become blockers. Tracked by ART Sync. Low rates indicate that dependency mapping is happening too late.

**Definition of Ready Adherence:** Percentage of stories entering a sprint with all DoR criteria met. Below 85% predicts spillover. This is the leading indicator for sprint completion.

**Sprint Goal Achievement Rate:** Whether the sprint goal — distinct from story completion — was met. Teams can complete 90% of story points and miss the sprint goal entirely. Both numbers matter.

**Programme Predictability Measure (PPM):** PI-level metric from SAFe — actual business value delivered versus planned. Below 80% over two consecutive PIs indicates a systemic planning or prioritisation problem.

**Inspect & Adapt Action Closure Rate:** Percentage of improvement actions from the previous I&A that were completed by the current I&A. Low closure rates mean retrospectives are producing discussion, not change.

---

## The JQL Signal You Should Run Before Every Sprint Planning

The following query surfaces stories that are currently in open sprints without acceptance criteria — stories that should not have been pulled.

```
project = YOUR_PROJECT AND issuetype = Story AND sprint in openSprints() AND "Acceptance Criteria" is EMPTY ORDER BY created ASC
```

Run this 48 hours before Sprint Planning. Any result is a conversation to have before the session opens, not during it. If your result set is consistently non-empty, your Definition of Ready is not being enforced at backlog refinement — and the ceremony is being asked to compensate for a process failure that is not its to fix.

This query also functions as a health check between sprints. A team that consistently has zero results has embedded DoR discipline into its backlog management. That discipline is what makes Sprint Planning a 90-minute coordination event rather than a three-hour discovery session.

---

## Connecting to the Broader Governance Picture

This focus on ceremony inputs connects directly to the budget accountability questions raised in Article 01. Feature scope that enters a sprint without acceptance criteria is scope that has not been costed, validated, or approved with precision. Multiply that across an ART and a PI, and you get delivery variance that looks like an agile problem but is actually a governance problem — the same pattern that Article 01 traces in financial reporting.

The executive dashboard (Article 04) should surface PPM, Feature Acceptance Rate, and DoR Adherence as leading indicators, not just velocity and burndown. A leadership team looking only at completed points per sprint is watching the wrong signal. The inputs — whether work is ready before it is started — predict outcomes before the sprint closes.

---

## Your Next Step This Week

Before your next Sprint Planning, run the JQL query above. Count the results. If it is non-zero, bring the number to the planning session explicitly: "We have X stories in this sprint without acceptance criteria. We are not starting work on any of them until that is resolved in the next 30 minutes or they are pulled."

Do this once with genuine resolve and the signal sends. The team learns that DoR is not a checkbox — it is a gate. The ceremony becomes more useful because the inputs improve. That is the only way ceremony quality improves: not by redesigning the meeting, but by holding the inputs accountable.

---

*Next in series: Article 07 — Nine Layers Down: The Real Architecture of Project Cost Management*
