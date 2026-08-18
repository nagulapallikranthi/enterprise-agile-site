# The Day the Budget Lied

There is a particular kind of silence in a program review when the CFO asks a question nobody expected. I learned this in a Q3 review for a platform modernization program — twelve-month initiative, eight-figure budget, seventeen people across three continents. The status report on the table showed green across every cost indicator. Spending was tracking to plan within two percent. Contingency was intact at ninety-one percent. I had personally signed off on the deck the night before.

Then the CFO asked: "What happens to the forecast if we're six weeks behind?"

The room did not answer. Because the room did not know. The budget was green, but the schedule had quietly slipped five weeks over the prior two months, and nobody had re-forecasted the cost implications. We had been tracking actuals against a plan that no longer described the project we were running. The budget report was accurate. It was also completely wrong.

That was the day I understood the difference between a budget that is *accurate* and a budget that is *true*.

---

## Status Is Not Forecast

The most dangerous moment in any program is when the team confuses current spend with projected outcome. A budget status report tells you what has happened. A forecast tells you what will happen. Most programs conflate the two, and the confusion is so common that it has become invisible.

When you report actuals-vs-plan at month three of a twelve-month program, you are describing thirty days ago. Vendor invoices arrive on net-thirty terms. Internal labor charges batch weekly or bi-weekly. The procurement team closed a purchase order in February that you will not see in the actuals until April. The cost baseline is a lagging indicator by design — and most programs treat it like a real-time signal.

The result is a reporting cadence that shows you the past while the present quietly diverges. A program can be four weeks behind schedule, absorbing scope that was never change-controlled, drawing down contingency against risks that never made it to the risk register — and still show green on a monthly status report. Not because anyone is lying. Because the system is built to lag.

Earned Value Management exists precisely to close this gap. SPI and CPI, computed weekly against a time-phased baseline, tell you not just what you spent but what you *got* for it. A CPI of 0.84 means you are spending a dollar to deliver eighty-four cents of value. That number does not appear in an actuals-vs-plan table. It requires a baseline, a measurement cadence, and the organizational will to run the math.

Most programs skip it because it requires discipline. Then they spend Q4 explaining overruns that were visible in Q2, if anyone had looked.

---

## Three Ways Budgets Lie

### Scope absorption without change control

The most common budget lie is not a number — it is a decision that never made it to the change control board. A stakeholder asks for one additional integration. The architect says it is a two-week effort. The team absorbs it because the sprint has capacity. No change request is raised, because nobody wants the overhead.

Two months later, that two-week scope addition has consumed six weeks of effort across three teams because the integration revealed a data model mismatch. The budget shows the spend. It does not show that the spend is against scope that was never authorized. The cost baseline is still the original one. Every variance analysis will be wrong until someone reconciles what you are actually building against what you said you would build.

The technical solution is a label discipline in your backlog and a scope change ratio tracked at the program level. You cannot fix what you cannot see. If every story added to the backlog after baseline carries a `scope-addition` label, you can count them, estimate their cost, and trigger a change control conversation before the absorption becomes a crisis.

### Contingency treated as float

Contingency is not a fifth column of the budget you can pull from whenever a risk materializes. It is a reserve sized against a specific risk register at a specific confidence interval. When a team treats contingency as general-purpose float — available to any cost overrun for any reason — the reserve evaporates without leaving a trace in the status report.

The symptom is a contingency line that decreases gradually with no corresponding risk closure log. If contingency is being consumed but the risk register shows no risk realized, one of two things is true: risks are materializing that were never registered, or the reserve is being used to paper over cost overruns that should be visible to the sponsor.

Either way, the status report stays green while the program's financial buffer disappears. Track contingency burn rate as a standalone KPI. Set a warning threshold at twenty percent consumed. At forty percent, you are in a conversation with the sponsor whether you want to be or not — the only question is whether you initiate it or they do.

### Actuals lagged by billing cycles

This one is structural and largely invisible until it is not. Vendor billing cycles, internal charge-back timings, and purchase order recognition schedules all introduce latency between when cost is incurred and when it appears in the financial system. A complex program with multiple vendors can have actuals that lag reality by four to six weeks.

The practical consequence: if your program is accelerating spend — pulling work forward, running parallel workstreams, pre-purchasing licenses — your cost reports will look better than reality until the billing cycle catches up. At that point, a month that looked fine will suddenly show a large positive variance as invoices land. Sponsors experience this as a surprise. Finance experiences it as a forecast failure. The project manager experiences it as a credibility problem.

The mitigation is a committed-but-not-yet-invoiced tracker. Every purchase order, every vendor engagement, every authorized spend that has not yet appeared in actuals gets tracked in a shadow ledger and added to the current-period cost estimate. It is a manual discipline. It is also the only way to produce a forecast that reflects financial reality rather than billing timing.

---

## Cost Truth Dashboard

Use this table as a weekly governance pulse. The goal is not to create reporting overhead — it is to replace one misleading green dashboard with five numbers that actually answer the question executives are asking: *Are we going to finish what we promised for what we said it would cost?*

| KPI | What it actually measures | Warning threshold | Action trigger |
|---|---|---|---|
| Schedule Performance Index (SPI) | Earned vs planned value | < 0.90 | < 0.80 |
| Cost Performance Index (CPI) | Cost efficiency | < 0.90 | < 0.80 |
| Contingency Burn Rate | Reserve draw vs plan | > 20% consumed | > 40% consumed |
| Scope Change Ratio | Unauthorized scope vs baseline | > 5% | > 10% |
| Forecast at Completion variance | FAC vs BAC | ±8% | ±15% |

A CPI of 0.80 means you will need 125% of your original budget to deliver the original scope. A contingency burn rate of 40% with six months remaining is a structural funding problem, not a risk management conversation. Run this table weekly. Review it with the program sponsor monthly. When any indicator hits the action trigger, escalate before the billing cycle catches up.

---

## Surfacing Scope Creep in Jira

The scope change ratio in the table above requires discipline at the story level. Teams that label unauthorized additions consistently make scope creep visible in real time. Use this query to pull the current month's additions:

```
project = YOUR_PROJECT AND issueType = Story AND labels = "scope-addition" AND created >= -30d ORDER BY created DESC
```

Run this weekly. Sum the story points. Divide by the baseline story point count at program start. That is your scope change ratio. Anything above five percent is a conversation. Anything above ten percent is a change control board agenda item.

If you are also tracking cost governance through an executive dashboard, Article 04 on executive dashboard governance covers how to surface this kind of scope signal without burying it in a table nobody reads. If you want to understand how the scope additions connect to a broader Cost Breakdown Structure, that is covered in Article 05, which walks the CBS level by level.

---

## What to Do This Week

Pull your current program's contingency balance and the risk register side by side. For every dollar of contingency consumed since program start, identify the corresponding risk that was realized and closed. If you find consumed contingency with no matching closed risk, you have found the source of your next budget surprise. Fix the tracking discipline before the billing cycle closes — not after.

The budget report that shows green is not lying maliciously. It is telling you what the system was designed to measure. Your job is to build a second system that measures what matters.
