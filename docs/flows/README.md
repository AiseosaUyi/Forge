# Kwikpik Mobile App — Flow Documentation

Source: Figma "Kwikpik Web3" file, "Kwikpik Mobile App" section (`node 1323:2811`), 420 screens across 14 flow groups. Built to give feature work full context on what already exists before designing anything new — see [`../design-system/usage-guide.md`](../design-system/usage-guide.md) for the token-reuse side of that workflow.

## What's here

- [`flow-map.md`](./flow-map.md) — the full structural map: every flow group, what it does, corrected readings, and remaining coverage gaps.
- [`business-logic.md`](./business-logic.md) — confirmed product rules that aren't visible in the designs themselves (KYC tiers, automation scheduling/failure handling, affiliate payouts, etc.) — captured directly from the product owner.
- [`figma-corrections.md`](./figma-corrections.md) — log of frame renames applied directly in the Figma file, so the file itself now matches reality (not just this doc).
- [`automations-expansion-design.md`](./automations-expansion-design.md) — first-pass design spec for third-party payer automations and Ajo/group contributions, built on a new Figma page.
- [`automations-expansion-art-direction-v2.md`](./automations-expansion-art-direction-v2.md) — visual rework informed by Kwikpik's actual website illustration language (not generic fintech-premium).
- [`automations-expansion-ux-hardening.md`](./automations-expansion-ux-hardening.md) — trust, dispute, and edge-case screens (25–37) closing the gaps found in the UX/flow review — start here for what's still open (non-custodial claim needs backend confirmation).
- [`emails/design-spec.md`](./emails/design-spec.md) — the 5 reminder email templates, built in Figma alongside the app screens.

## How to use this when building a feature

1. Check `flow-map.md` for where the feature lands and what already exists nearby.
2. Check `business-logic.md` for any rule that governs the feature (limits, triggers, scheduling, payout math).
3. Check `../design-system/` for the actual visual tokens/components to build with.
4. If something is still unclear, it's cheaper to ask than to assume — this file set gets stale as the product evolves, so when in doubt verify against the live Figma file or ask directly.
