# Avatar

**Status:** Discovered this pass — a real, fully-built 18-variant Figma
component set already existed (`Style Guide` canvas → Base Components,
node `1326:36456`) but was **mis-filed inside a frame literally named
"Alerts"** and never referenced in any documentation. This doc formalizes
what was already there; the Figma frame naming should be corrected in a
follow-up pass (flagging rather than silently renaming, consistent with
this file's live-editing convention — see `docs/flows/figma-corrections.md`
for the precedent of confirming renames explicitly).

Figma: `Style Guide` canvas (`1:4`) → Base Components section → (mis-filed
under) "Alerts" frame `1326:36451` → `Avatar` component set `1326:36456`.

Code: `packages/ui/src/components/avatar.tsx`.

## Variants

| Axis | Values |
|---|---|
| `Size` | `XSmall` (20px) · `Mini` (24px) · `Small` (32px) · `Normal` (40px) · `Large` (48px) · `XLarge` (64px) |
| `Type` | `Placeholder` · `Icon` · `Image` |

`Placeholder` is **already an initials-in-circle pattern** (grey circle +
centered letter text), not a flat color blob — confirmed by inspecting its
child nodes directly. Reproduced in code as the `initials` prop.

## Usage

```tsx
import { Avatar } from "@kwikpik/ui";

<Avatar size="normal" src={user.photoUrl} alt={user.name} initials={getInitials(user.name)} />
```

Always provide `initials` (or `icon`) as a fallback alongside `src` — the
component falls back automatically if the image fails to load or is
absent, matching the Figma `Placeholder` variant rather than rendering
nothing or a bare colored circle.

## Where this is used in the product

- Business switcher (B2B sidebar) — business logo or initials.
- Customer rows (Customers list, Transaction Details "From") — initials.
- Service/bill-automation icons (Automations) — real service logos (MTN,
  etc.), not this generic Avatar — see `docs/flows/automations-expansion-v1-rework.md`
  for that specific pattern.
