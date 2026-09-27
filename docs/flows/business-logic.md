# Business Logic — Confirmed by Product Owner

Rules that govern the flows in [`flow-map.md`](./flow-map.md) but aren't visible in the Figma designs themselves. Captured directly from the product owner — a couple of items came through a voice transcript and are flagged where the exact wording was ambiguous; correct these inline if misread.

## KYC tiers

| Tier | Daily limit | Monthly limit |
|---|---|---|
| Tier 1 (default, no KYC) | ₦200,000 | — |
| Tier 2 (basic KYC) | ₦200,000 | ₦5,000,000 |
| Tier 3 (full KYC, highest) | ₦10,000,000 | ₦100,000,000 |

Exact enforcement (which action counts against which limit, whether Tier 1's ₦200,000 is a daily cap or a running/balance cap) sits with compliance and backend — treat this table as the tier structure, not the full spec, and confirm exact mechanics with them before building anything that enforces it.

Completing KYC once should be assumed to raise the tier generally, not per-trigger — but this wasn't explicitly re-confirmed against the three KYC trigger points documented in `flow-map.md` (send-limit exceeded, crypto→NGN conversion, deposit above limit). Verify if a feature depends on that distinction.

## Automations

**Frequency options:** Weekly, Bi-weekly, Monthly, specific day of the month, and Daily (supported but rarely used in practice).

**Insufficient-balance handling**, in order:
1. Before a scheduled run, the system checks whether the wallet balance will be sufficient.
2. If it looks like it won't be, a reminder is sent ahead of the run: *"top up your wallet."*
3. At the scheduled time, the automation still attempts to trigger.
4. If it fails (balance still insufficient), the user is notified: *"automation failed — top up your wallet."*
5. Up to three follow-up reminders are sent after the failure.
6. After the third unanswered reminder, the automation is paused. *(Source transcript said "post the automation" — read as "pause," consistent with the Active/Paused states in the Automations management list. Confirm if this reading is wrong.)*

**Asset Split allocation logic:** auto-allocation draws from the user's most valuable wallet asset first; if that alone doesn't cover the full amount, it draws the remainder from the next most valuable asset, continuing until the total is covered. *(Confirm the exact wording of "most valuable" — likely NGN-equivalent value at time of transaction.)*

**Payroll** is not a distinct automation type — it's a labeled use case built on top of Bulk Transfer.

## Marketplace verticals

**Farm-to-Table checkout** intentionally shares the Groceries checkout pattern. No dedicated differentiation work has been done on it yet — this is expected current state, not a bug to fix incidentally.

**Logistics riders** are a separate pool from Food/Groceries delivery riders — do not assume shared rider assignment/dispatch logic across these verticals.

## Affiliate Program

Confirmed via direct screen inspection (not the product owner transcript): referral code + shareable link, 10 points earned per referral who completes a ride/order, points convertible to cash at a fixed rate directly into the wallet balance, plus an Affiliates Leaderboard. Treat the point value and conversion rate shown in the mock (150,000 points, ₦10/point) as placeholder data, not confirmed real figures.
