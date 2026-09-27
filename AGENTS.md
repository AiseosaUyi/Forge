# Kwikpik Design System — Agent & Developer Guide

This file is the entry point for both human developers and AI coding agents
building any Kwikpik surface (B2B/Finance dashboard, Logistics portal,
marketing website, mobile app). **Read this before writing any UI code.**
It replaces guessing colors/spacing/components from a screenshot.

If you are an AI agent: also read `packages/ui/registry.json` — a
machine-readable list of every component, its exact import path, props,
and the real product pattern it was extracted from. Prefer it over
re-deriving a component's API from its source file.

## What this is

- **`packages/ui`** — the actual component library. Tailwind CSS v4 +
  Radix UI primitives + `class-variance-authority` (shadcn architecture:
  components live in this repo, fully editable, not an external npm
  dependency). Every token (color, spacing, radius, shadow, type size) is
  generated 1:1 from the Kwikpik Web3 Figma file — never invented.
- **Storybook** (`pnpm storybook`, → `http://localhost:6006`) — the
  primary browsable design-system site. Every component has a live docs
  page with prop controls, an auto-generated props table, and a "Show
  code" snippet. `Foundations/Tokens` renders every color ramp, spacing
  step, radius, shadow, and type size as a visual swatch — the fastest
  way to sanity-check a value against Figma without opening Figma. This
  is what to hand a new dev or designer to explore the system
  interactively; `pnpm build-storybook` produces a static site that can
  be deployed/shared as a link.
- **`apps/demo`** — a minimal kitchen-sink page for testing components
  inside a real consuming app (not the primary docs site — use Storybook
  for that).
- **`docs/design-system/`** — the deeper, per-token/per-component reference
  docs (originally extracted straight from Figma; now also the canonical
  written spec backing the code in `packages/ui`).
- **Figma source of truth**: [Kwikpik Web3](https://www.figma.com/design/bppFxXazAscyLv3FZvzBf6/Kwikpik-Web3),
  `Style Guide` canvas (node `1:4`). A new `Composite Components` section
  was added there this pass with a real, variable-bound `Card_Master`
  component set — treat code and Figma as two views of the same system;
  when one changes, update the other.

## Setup (new app in this monorepo)

```jsonc
// apps/<your-app>/package.json
{
  "dependencies": {
    "@kwikpik/ui": "workspace:*"
  }
}
```

```ts
// your app's entry point, once
import "@kwikpik/ui/styles.css";
```

If your app's bundler is Vite + Tailwind v4 and it imports from a sibling
workspace package (as this one does), Tailwind's automatic class
scanning does **not** reliably cross the package boundary — you must
declare it explicitly. This is already handled inside
`packages/ui/src/styles/globals.css` via `@source` directives; if you add
a new app under `apps/`, no extra config is needed there, but if you ever
move `packages/ui`, update those `@source` paths.

## Token philosophy — always reach for a token first

Never hardcode a hex color, a px spacing value, or a font size. Every one
of these already has a token in `packages/ui/src/styles/tokens.css`:

- **Color**: `--color-{ramp}-{step}` (e.g. `--color-primary-500`) for raw
  ramp values, plus semantic aliases (`--text-main`, `--text-sub`,
  `--card-surface`, `--elements-stroke`, `--button-primary-default`, …)
  that mirror the Figma "Usages" variable collection. **Prefer the
  semantic alias over the raw ramp value** whenever one exists — it's
  what's actually bound to live Figma components, and it survives a brand
  re-theme without touching component code.
- **Spacing**: `--spacing-xxxsm` (2px) through `--spacing-xxxlg` (120px),
  8px-leaning. Card/screen padding = `normal`/`md` (16–24px). Control
  internal padding = `xsm`/`sm` (8–12px). Section separation = `lg`+
  (40px+).
- **Radius**: `--radius-xsm` (4px) → `--radius-xl` (120px, fully round).
  Default for buttons/inputs/cards is `normal` (16px); pills/chips/avatars
  use `xl`.
- **Elevation**: `--shadow-xs` (resting cards) → `--shadow-xxl`
  (full-screen overlays). `--shadow-normal` is the one **upward** shadow,
  for sticky bottom bars/sheets.
- **Type — two scales, not one "universal" scale**: colors/spacing/radius/
  shadows are genuinely universal across every surface and should stay
  that way. Type size is not — a compact mobile control and a marketing
  hero headline are never the same number, so forcing one scale to cover
  both just breaks the website (this happened: the UI scale tops out at
  32px, which is unusable for a hero headline).
  - **`font-sans` (Satoshi)** — the UI scale. Mobile app + web dashboard
    chrome: buttons, forms, cards, tables, nav, and the website's own body
    copy. Black/900 for headings, Bold/700 for buttons, Regular/400 for
    body. Sizes: `docs/design-system/tokens/typography.md` → "Mobile app
    text styles."
  - **`font-display` (Aeonik)** — the display scale, **website headlines
    only**. `text-display-2xl` (88px) down to `text-display-xs` (18px),
    all Bold/700, tight 100% line-height at 40px+. Sampled directly off
    the live Website Remodel Figma page — see
    `docs/design-system/tokens/typography.md` → "Display scale" for exact
    values and a licensing caveat (Aeonik is a commercial font; confirm
    hosting before shipping). Falls back to Satoshi if the font file isn't
    loaded.
  - Rule of thumb: building dashboard/app UI → `font-sans` + the H1–H6/
    Body/Caption tokens. Building a marketing/landing page → `font-display`
    for headlines, `font-sans` for body copy and any UI chrome (buttons,
    forms) embedded in the page.

Full token tables with Figma provenance: `docs/design-system/tokens/`.

## Component philosophy — variant, not a new component

Before adding a new component, check `packages/ui/registry.json` and
`packages/ui/src/components/`. If something close already exists, extend
it with a new `cva` variant rather than creating a parallel component —
this is the whole point of the shadcn/CVA architecture. Concrete
precedent from this build:

- **Card is one primitive + five pre-composed variants**
  (`StatCard`/`BalanceCard`/`KycProgressCard`/`InfoCard`/`EmptyCard`), not
  five unrelated components — they share the same `Card` shell, radius,
  and elevation tokens.
- **Badge/Alert `type`/`state` values follow one shared 50→500→900 color
  pattern** (background = `{ramp}-50`, text = `{ramp}-900`). Adding a new
  status color means adding a new `cva` branch using that same pattern —
  never a bespoke one-off color.
- Only create a genuinely new top-level component when the interaction
  model is different (e.g. `Drawer` vs `Modal` — different placement,
  motion, and use case — are two components, not variants of one).

## When to use which component

| Need | Component |
|---|---|
| Main call-to-action | `Button intent="primary"` |
| Secondary/tertiary action next to a primary one | `Button intent="outline"` / `"ghost"` |
| Irreversible/destructive action | `Button intent="destructive"` |
| Status/tag pill (order status, KYC state, transaction result) | `Badge` — map product vocabulary to the `type` prop, see registry |
| Page/section-level feedback banner | `Alert` |
| User/business/service photo or logo | `Avatar` — always pass `src`, with `initials` as the fallback; never a flat colored circle |
| Single metric (count, average, countdown) | `StatCard` |
| Wallet/business balance + quick actions | `BalanceCard` |
| KYC/verification progress summary | `KycProgressCard` |
| Generic help/info block (the old ad hoc "Info Card" pattern) | `InfoCard` |
| "No data yet" state on any list page | `EmptyCard` |
| Text input, textarea, checkbox, radio, switch, tooltip | see registry — all wrap Radix primitives with Kwikpik tokens already applied |

## What's still missing (do not silently invent these — extend the system properly)

See `packages/ui/registry.json` → `notMigratedYet` for the current list —
Table, Navigation shell (Sidebar/Topbar/Mode Switcher), Drawer, Modal,
data-viz (donut/bar chart), Dropdown/Menu, Toast, Pagination. These exist
partially in Figma (some, like Dropdown, as an already-built but
undocumented component — see `docs/design-system/`) and are the next
priority. If a feature needs one of these before it's built, flag it
rather than hand-rolling a one-off — check this file and the registry
again first, since both are living documents updated as components ship.

## Known gaps / honest caveats

**Pixel-verification pass (2026-09-27):** Button, Badge, Checkbox,
RadioGroup, Switch, Input, Textarea, Avatar, and Tooltip were re-checked
against their live Figma node geometry (padding, corner radius, font
size/weight, exact px dimensions) and corrected where they'd drifted from
an initial approximation — notably Button's default size was 56px tall
instead of the real 72px, Badge used Bold instead of the real Medium
weight, Checkbox/Avatar-xlarge were undersized, and Tooltip was a flat
grey pill instead of the real dark near-black panel with an arrow. Treat
these nine as Figma-verified going forward; anything not in that list
(Alert, Card family) was built from documented values rather than a
live-node pixel check.


- Only `packages/ui`'s **read** components have been round-tripped
  through Figma so far; `BalanceCard` and `KycProgressCard` were built
  code-first this session and still need to be back-ported into the
  Figma `Card_Master` component set as real variants (currently it only
  has `Stat`/`Info`/`Empty`).
- The display scale's sizes/line-heights are real (sampled off Figma
  nodes), but none of it exists as actual Figma **text styles** yet
  (only `Mobile App/*` are real reusable styles) — someone should turn
  `Display/2xl…xs` into real Figma text styles on the Website Remodel
  page so design and code can't drift apart silently.
- Aeonik needs a confirmed webfont license/hosting setup before the
  display scale ships on the live site — not yet verified.
- No dark mode tokens exist in Figma or in `tokens.css` — not in scope
  until requested.
- The Logistics Partner Portal (`logistics.kwikpik.io`) has no Figma
  presence and hasn't been restyled onto this system yet — `packages/ui`
  is built to be ready for that (Table/filter-bar patterns are the
  explicit next priority) but the restyle itself hasn't happened.

## Verification

Before calling any new component "done": add/update its `*.stories.tsx`
and check it in Storybook (`pnpm storybook`), visually compare against the relevant Figma frame or
the product UX-audit doc it maps to (`B2B_PLATFORM_UX_CONTEXT.md`,
`LOGISTICS_PLATFORM_UX_CONTEXT.md`), and run `pnpm typecheck` at the repo
root. Don't report a component finished on type-correctness alone.
