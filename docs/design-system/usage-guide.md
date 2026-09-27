# Usage Guide — Generating New Mobile Features On-Brand

This is the playbook for turning a PRD into a feature that looks and feels like it belongs in the Kwikpik mobile app. Read this before designing or coding any new screen/flow.

## The workflow

1. **Read the PRD** for the feature — identify what screens/states/data it needs (empty, loading, error, success, populated).
2. **Check this doc set first** for every visual decision — color, type, spacing, radius, elevation, icon, and the closest existing component. Do not invent a new value if an existing token covers the case.
3. **Match against an existing component pattern** before creating a new one:
   - Need a form? → [`components/form-controls.md`](./components/form-controls.md)
   - Need a CTA? → [`components/buttons.md`](./components/buttons.md)
   - Need a status/state indicator (order status, KYC status, transaction status)? → [`components/status-feedback.md`](./components/status-feedback.md) — reuse the 50/100→500→700/900 semantic pattern for any new status value.
   - Need a new icon? → [`tokens/iconography.md`](./tokens/iconography.md) — check Iconsax first, only fall back to a custom asset for brand marks.
4. **If the PRD implies something genuinely new** (a component type not in this file), use `/creative-director` to art-direct it within these existing tokens — never freehand a new color, font size, or shadow.
5. **Implement with `/frontend-design`** once the visual spec is settled, so it's built in whatever stack the mobile app actually uses (React Native, Flutter, native Swift/Kotlin — check the target project's own conventions, this doc doesn't assume a stack).
6. **Verify in a real device/simulator or browser** before calling it done — token-correct code that hasn't been visually checked isn't done.

## Token-first checklist (apply to every new screen)

- [ ] Every color used is a named token from [`tokens/colors.md`](./tokens/colors.md), not a hex pulled from a screenshot by eye
- [ ] Every text style is one of the `Mobile App/*` tokens in [`tokens/typography.md`](./tokens/typography.md)
- [ ] Every spacing value is from the scale in [`tokens/spacing-radius-elevation.md`](./tokens/spacing-radius-elevation.md) (no arbitrary `13px` gaps)
- [ ] Every radius is `4 / 8 / 16 / 24 / 120`px — nothing else
- [ ] Every elevated surface (modal, dropdown, toast, sheet) uses one of the 7 named shadow tokens
- [ ] Every icon is Iconsax (`linear` by default) or an approved brand mark — nothing hand-drawn
- [ ] Status/semantic colors follow the ramp-role pattern (background = light step, accent = 500, text = dark step) — never a bespoke color for "success" or "error"

## When the PRD conflicts with this doc

If a PRD or new Figma mock introduces a value that isn't in this system (a new color, an odd spacing value, a new type size):
1. Flag it — don't silently absorb it as a one-off.
2. Check whether it's actually a new *semantic need* (e.g. a genuinely new status type) — if so, map it to the nearest existing ramp per the pattern in [`status-feedback.md`](./components/status-feedback.md).
3. If it's truly a new foundational token (new brand color, new type size), that's a design-system change, not a feature change — call it out explicitly before building, since it should be added back to the Figma source of truth, not invented ad hoc in code.

## Re-pulling live data from Figma

This documentation was generated from a snapshot of the Figma file. If a component or token looks like it might have changed, re-fetch it directly rather than trusting a stale doc:

- File key: `bppFxXazAscyLv3FZvzBf6`
- Style Guide canvas: node `1:4`
- Foundation section: node `1326:31010`
- Base Components section: node `1326:35798`
- Colors: node `1326:31330`
- Mobile Typography: node `1326:31034`
- Spacing: node `1326:35667` · Radius: node `1326:35757` · Shadows: node `1326:35646`
- Icon library: node `1507:4518`

Use the Figma MCP tools (`get_variable_defs`, `get_design_context`, `get_screenshot`) against these node IDs, load the `figma-design-to-code` skill first if pulling code, and update the relevant doc file here afterward so this stays a living reference.

## Next steps for this repo

This directory currently only contains design documentation — there's no app scaffolded yet. When you're ready to start building:
1. Share the PRD for the first feature/screen.
2. Confirm the target stack (React Native / Expo, Flutter, native iOS+Android, or a web-based mobile shell) — this determines how these tokens get turned into an actual theme file.
3. From there, the workflow above (PRD → check this doc → `/creative-director` for anything novel → `/frontend-design` to implement → verify) applies to every feature going forward.
