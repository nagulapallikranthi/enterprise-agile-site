# Your AI Copilot Has No Skin in the Game

The user story was good. It was well-structured — a clear actor, a coherent action, a defined benefit. The acceptance criteria were specific. The edge cases were called out. The AI had synthesized the PM's rough notes into something that looked production-ready, and the PM, satisfied, dropped it into the sprint without a second read.

The acceptance criteria described how the feature would work in a browser. The feature was being built for a mobile application. The PM knew this. The AI did not, because the PM had not mentioned it. Nobody caught it until sprint review, when the engineering lead demoed something that worked correctly and completely against the wrong specification.

This is not a story about AI being unreliable. It is a story about accountability transfer — the subtle, dangerous habit of treating AI-generated output as a substitute for PM judgment rather than a raw material for it. The AI did exactly what it was asked to do. The problem was that the PM asked for a finished product and got a first draft, and the difference between those two things is the context that only the PM carries.

---

## The Accountability Gap

AI tools do not know your customers. They do not know the commitments you made to your engineering lead last quarter, the accessibility requirements your legal team added in March, or the fact that your largest enterprise customer has a specific integration dependency that changes the entire edge case calculus. They know what you told them in the prompt — and most prompts are short.

This is not a criticism of AI tools. It is a description of their architecture. Language models are trained on generalized text. They produce outputs that are statistically coherent with that training. They do not have access to your institutional knowledge, your product history, your customer relationships, or the informal agreements that exist in every mature product organization. All of that context lives in your head, and if you do not put it in the prompt, it will not appear in the output.

The accountability gap is the space between what the AI produced and what you would have produced if you had written it yourself with full context. That gap is always present. On low-stakes tasks — drafting an email, outlining a document structure, generating five alternative phrasings — the gap is acceptable because the cost of a miss is low. On high-stakes tasks — acceptance criteria, architecture decisions, customer-facing messaging, legal compliance questions — the gap can be expensive.

The professional discipline AI demands from PMs is not expertise in AI. It is expertise in knowing when the gap is acceptable and when it is not, and taking ownership of the output regardless.

---

## Before You Paste

> **Before pasting into any AI tool:** Remove customer names, internal project codes, financial figures, employee names, and any data governed by your organization's confidentiality policy. Use abstractions ("a B2B SaaS customer with 500 seats") instead of real identifiers. If you are unsure whether a piece of information is confidential, treat it as confidential until you have confirmed otherwise with your information security or legal team. Many enterprise AI tools, including externally hosted models, should be assumed to log prompt content for model improvement unless your organization has a specific data processing agreement in place that prohibits it.

This is not paranoia. Enterprise data breaches have originated from well-intentioned employees pasting contract terms, customer pricing details, and internal financial projections into consumer-grade AI tools. The convenience of AI-assisted work does not change your organization's data governance obligations. Build the habit of scrubbing before you paste. It takes ten seconds and it is the professional standard.

---

## Where AI Genuinely Helps

The honest answer is: more than skeptics admit, less than evangelists claim.

**Synthesis across large text volumes** is the clearest win for PMs. Summarizing fifty user interview transcripts, extracting themes from a year of support tickets, or identifying contradictions across a sixty-page PRD — these are tasks where AI tools dramatically reduce the mechanical labor while preserving the PM's judgment about what the themes mean and what to do about them. The AI finds patterns. The PM decides which patterns matter.

**Generating the fourth, fifth, and sixth option** is genuinely useful. When a PM has three proposed solutions to a problem, asking an AI to generate alternatives — constrained by the same requirements — often surfaces approaches the team would not have considered. This is not outsourcing creativity; it is using AI as an option-expansion engine before the PM applies judgment to select among them.

**Drafting first-pass documentation** reduces blank-page friction. A PM who can describe a feature's intent verbally can produce a working draft in minutes and spend editing time — which is cognitively cheaper than generating time — making it accurate and complete. The risk is treating the draft as complete. The discipline is treating it as raw material.

**Pressure-testing requirements** by asking an AI to identify missing cases, contradictions, or ambiguous phrases is a legitimate quality check. The AI will not catch everything — it does not have your product context — but it will catch the category of errors that come from imprecise language, and imprecise language is the most common source of sprint review surprises.

---

## The AI Output Review Checklist

Apply this before any AI-assisted artifact becomes an official commitment — a story in the backlog, a spec shared with engineering, a message sent to a customer, a claim included in an executive presentation.

- [ ] Have I verified the factual claims against a primary source?
- [ ] Does this output match my customer's actual context?
- [ ] Is any internal or confidential data exposed in this output?
- [ ] Would I stake my professional reputation on this as written?
- [ ] Have I disclosed to relevant stakeholders that AI assisted this work?
- [ ] Is the ownership of this output clearly mine?

The fourth question is the one that produces the most discomfort and does the most work. If you would not stake your professional reputation on the output as written, it is not ready to share. That standard is not higher than what you would apply to your own unaided work. It is the same standard. The AI does not lower the bar. It changes the path to clearing it.

The sixth question — ownership — is not about credit. It is about accountability. When a customer escalates because an acceptance criterion was wrong, the answer "the AI wrote that" is not professionally available to you. The ownership was transferred when you shared the output without review. Claim the ownership before you share, not after.

---

## The Context-Setting Prompt

The most common reason AI output misses the mark for PM work is not that the model is weak — it is that the prompt lacks the context that would make a specific, accurate output possible. Use this template as a starting frame for any substantial PM task:

```
I am a product manager working on [describe product area]. My customer is [describe customer type without confidential details]. The problem I'm solving is [describe problem]. My constraint is [timeline/resource/technical]. Help me [specific task].
```

The constraint field is the one most often omitted and most often consequential. "Help me write acceptance criteria for a search feature" and "help me write acceptance criteria for a search feature that must work offline, support screen readers, and integrate with a legacy search index that returns results in under 200ms" will produce dramatically different outputs. The model does not know your constraints unless you state them. If you cannot state your constraints, that is a signal about the feature's readiness — not a prompt engineering problem.

---

## Tracking AI-Assisted Decisions in Jira

If your team is using AI tools to draft stories, generate acceptance criteria, or inform prioritization decisions, a minimal label discipline creates the audit trail that compliance, security, and retrospective reviews will eventually require. This query surfaces all issues where AI assistance was logged:

```
project = YOUR_PROJECT AND labels = "ai-assisted" ORDER BY updated DESC
```

This is not overhead — it is the metadata layer that lets you answer "which of our current commitments were AI-generated?" without reading every story. In a post-incident review, that question will be asked. In an audit, that question may be required. Build the discipline before you need the data.

If you are thinking about how this connects to the executive dashboard and governance layer, Article 04 covers how decisions — including AI-assisted ones — need traceable evidence chains to survive scrutiny at the program level. Article 06 on SAFe ceremony dysfunction also touches on how AI-generated stories often reveal ceremony failures in refinement and review. Article 01 on budget governance is a useful parallel: the same lagging-indicator problem that makes budget reports misleading applies to AI output quality — the errors surface weeks after the decision was made.

---

## Your Next Step This Week

Take one AI-generated artifact you have shared with another person in the last two weeks — a story, a spec section, a message, anything. Run it through the six-item checklist above. Apply it honestly. If it fails any item, note which one and why. That failure mode is the thing to fix in your prompt discipline before the next time you use the tool for the same task.

The AI copilot is genuinely useful. It is also genuinely indifferent to whether the output it produces is right for your specific situation. That indifference is not a design flaw — it is a structural fact. Accountability for the output is yours, not because someone assigned it to you, but because you are the only person in the loop who knows enough to verify it.

Verify it.
