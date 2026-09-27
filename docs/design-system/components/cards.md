# Cards

**Status:** New this pass. Before this audit, "Card" existed only as dozens
of ad hoc, inconsistently-built frames (many literally named "Info Card")
scattered across the B2B module — never a real component. Formalized as a
Figma `COMPONENT_SET` (`Card_Master`, Style Guide canvas → Composite
Components → Card) and as code in `packages/ui/src/components/card.tsx`.

Figma: `Style Guide` canvas (`1:4`) → `Composite Components` section →
`Card` frame → `Card_Master` component set.

## Variants

| Variant | Figma node | Code export | Maps to |
|---|---|---|---|
| `Type=Stat` | `10053:1965` | `StatCard` | Metric tiles — B2B audit §3 (Transactions Made, Avg Transaction Value, Next Payout) |
| `Type=Balance` | *(code-first; not yet ported to Figma — see caveat below)* | `BalanceCard` | Wallet Balance card — B2B audit §3 (Fund/Transfer/Swap) |
| `Type=KYC-Progress` | *(code-first; not yet ported to Figma)* | `KycProgressCard` | "Verify Account" progress card — B2B audit §2 |
| `Type=Info` | `10053:1966` | `InfoCard` | The ad hoc "Info Card" pattern, used ~30 times across the B2B module |
| `Type=Empty` | `10053:1967` | `EmptyCard` | "No Active Payment Link" / "No Customer Yet" / "No orders found" — B2B + Logistics audits |

**Caveat:** `BalanceCard` and `KycProgressCard` were built code-first this
session (registry/AGENTS.md flag this explicitly). `Card_Master` in Figma
currently only has the `Stat`/`Info`/`Empty` variants — porting the other
two back into Figma as real variants is next-session follow-up work, so
Figma and code don't silently drift.

## Shared shell

- Radius: `Radius/3` (16px), matching every other control's default.
- Elevation: `xs` (resting) for `Stat`/`Info`/`Balance`/`KYC-Progress`; a
  dashed border (no elevation) for `Empty`, to read as an invitation
  rather than a solid blocking panel.
- Background: bound to the Figma "Usages" semantic `Card/*` variables
  (`Card/Main` = white, `Card/Surface` = Grey/50, `Card/Primary-surface`
  = Primary/50 for `Balance`) — never a raw hex.

## Rule: don't add a sixth variant casually

If a new screen seems to need a new card "shape," first check whether it's
actually a composition of `Card` + `CardHeader`/`CardContent`/`CardFooter`
primitives (see `packages/ui/src/components/card.tsx`) rather than a
genuinely new variant. Only add a `Type=` variant for a pattern that (like
the five above) already repeats across multiple real screens.

## Icons inside cards

`EmptyCard`'s icon slot must be a real icon (Iconsax in Figma, an icon
component in code) — never a flat solid-color circle. This was an actual
mistake caught and fixed during this session's Figma build (see the
project's Figma-live-editing feedback memory) before it shipped.
