# Kwikpik Design System — Documentation

Extracted from the Figma source of truth:
**Kwikpik Web3** — `https://www.figma.com/design/bppFxXazAscyLv3FZvzBf6/Kwikpik-Web3`
File key: `bppFxXazAscyLv3FZvzBf6` · Canvas: `Style Guide` (node `1:4`)

**This is now backed by real code.** The token values documented here are
implemented 1:1 in [`/packages/ui`](../../packages/ui) (Tailwind v4 +
Radix + CVA component library) — see [`/AGENTS.md`](../../AGENTS.md) for
the developer/AI-agent guide and
[`/packages/ui/registry.json`](../../packages/ui/registry.json) for the
machine-readable component list. These markdown docs remain the deeper
per-token reference with full Figma provenance; when a token or component
changes in Figma, update both the code and these docs together.

For a mobile app project (native/React Native/Flutter, not yet
scaffolded), copy the token values here into that project's own
theme/token files rather than hardcoding hex/px values inline — the web
package's tokens (`packages/ui/src/styles/tokens.css`) are the
authoritative values to port.

## What's in the Figma file

The `Style Guide` canvas (`node 1:4`) has three top-level regions:

| Region | Node ID | Contents |
|---|---|---|
| `Typography` (desktop/web) | `1:58` | Legacy/web type scale (H1–H6, S1–S2, B1–B2, Caption, Overline) |
| `Foundation` (section) | `1326:31010` | Logo lockups, mobile typography, color ramps, spacing, radius, shadows, the full Iconsax icon library |
| `Base Components` (section) | `1326:35798` | Text field, textarea, button, checkbox, radio, switch, tooltip, dropdown/menu, alerts, badge |

## Docs index

- [`tokens/colors.md`](./tokens/colors.md) — full color ramps (Grey, Primary, Secondary, Blue, Yellow, Error, Success, Warning), semantic aliases, and the badge/alert 50-500-700 usage pattern
- [`tokens/typography.md`](./tokens/typography.md) — mobile type scale (Satoshi) — **the one to use for new mobile features** — plus the separate desktop scale for reference
- [`tokens/spacing-radius-elevation.md`](./tokens/spacing-radius-elevation.md) — spacing scale, border radius scale, shadow/elevation scale
- [`tokens/iconography.md`](./tokens/iconography.md) — Iconsax icon library, the 6 style variants, and brand icons
- [`components/buttons.md`](./components/buttons.md)
- [`components/form-controls.md`](./components/form-controls.md) — text field, textarea, checkbox, radio, switch, dropdown/menu, tooltip
- [`components/status-feedback.md`](./components/status-feedback.md) — badges and alerts
- [`components/avatar.md`](./components/avatar.md) — discovered this pass, was undocumented
- [`components/cards.md`](./components/cards.md) — new this pass (Stat/Balance/KYC-Progress/Info/Empty)
- [`usage-guide.md`](./usage-guide.md) — **read this before generating any new feature from a PRD**

Reference screenshots pulled directly from the Figma nodes live in [`assets/`](./assets/).

## Brand snapshot

- **Primary brand color:** `#564cd8` (purple, `Primary/500`)
- **Secondary accent:** `#e07529` (orange, `Secondary/500`)
- **Typeface:** Satoshi (mobile app), Black/900 for headings, Bold/700 for buttons, Regular/400 for body
- **Corner language:** 16px default radius, 120px for pills/avatars
- **Icon set:** Iconsax, `linear` style by default
- **Elevation:** soft, low-opacity black shadows (`#0D0B0E` at 4–10% opacity), scaling from `xs` to `xxl`

## Known gaps / things to verify before relying on this doc

- **Warning color has two conflicting scales in the Figma file** — see the "Known inconsistency" note in [`tokens/colors.md`](./tokens/colors.md). Documented ramp uses the one actually bound to live components (`#ff8001` family).
- Hover/pressed states for buttons and interactive controls weren't explicitly labeled in the file — documented as inferred conventions; confirm against the live Figma file (or ask design) before treating them as final.
- Tooltip's exact surface color wasn't captured with certainty — flagged in `form-controls.md`.
- No dark-mode tokens were found in this file — the "On Light Mode" column in every color table implies a dark-mode column may exist elsewhere or is simply unbuilt yet. Ask before assuming dark mode is in scope.
