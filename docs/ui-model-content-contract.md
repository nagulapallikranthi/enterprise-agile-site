# UI model shared-content contract

Task: EA-T004  
Release target: 0.3.0

All five UI models consume `src/data/portfolio.ts` as their authoritative content source. Models may change presentation, hierarchy and interaction, but they must not duplicate or contradict the shared identity, navigation, metrics, priorities or outcomes.

## Frozen interaction architecture

- Every primary page uses a sticky section switcher to replace content in place.
- Desktop and laptop layouts use a vertical sticky selector beside the content canvas.
- Mobile layouts use a horizontal sticky selector above the content canvas.
- A selected page section should remain within approximately two to three viewport heights.
- Progressive disclosure is reserved for supporting detail, never primary navigation.
- The complete site may contain no more than three progressive-disclosure panels.
- Each progressive-disclosure panel may contain no more than five sections.
- All controls support keyboard, touch, visible focus and reduced-motion preferences.

## Route contract

- Existing stable site: `/`
- Model 1 — Executive Portfolio: `/models/executive-portfolio/`
- Future models: `/models/<model-slug>/`
- Every model includes a route back to the stable site.

## Acceptance criteria

1. Shared content is typed and build-time validated.
2. Each model renders identity, at least four metrics, three priorities and three outcomes.
3. Navigation uses valid page routes or in-page anchors.
4. Pages provide one `main` landmark, visible keyboard focus and meaningful heading order.
5. Layouts remain readable at 360 px, 768 px and 1440 px widths.
6. Reduced-motion preferences are respected.
7. `npm run check` and `npm audit --audit-level=high` pass before deployment.
8. Each task is mapped to a distinct commit and Control Center evidence record.
