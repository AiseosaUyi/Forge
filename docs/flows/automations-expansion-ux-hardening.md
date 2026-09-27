# UX Hardening Pass — Closing the Flow Gaps

Follow-up to the 6.5–7/10 UX/flow score and competitive research. Adds the missing trust, safety, and edge-case screens identified there. Same Figma page ("🔀 Automations Expansion (Draft)"), screens 25–37, plus one enhancement to the existing Group Detail screen (20).

## What was added, mapped to the gap it closes

| Gap identified | Screen(s) added |
|---|---|
| No reliability/trust signal for group members | Group Detail (20) — member rows now show "✓ 100% on-time" / "✓ 96% on-time" style reliability badges instead of a plain "Joined" pill |
| No dispute/fraud reporting flow | 25 Report a Problem (reason picker) → 26 Dispute Submitted (confirmation + reference ID) |
| Guest cancellation never built | 27 Manage Your Contribution (no-login, magic-link accessible) → 28 Contribution Cancelled |
| No request expiry/nudge | 29 Request Expired — Resend or Cancel Request |
| Every automation assumed a fixed amount | 31 Set a Spending Cap (during setup, for variable bills) → 32 Amount Changed — Approve New Amount (reminder variant showing usual vs. new amount) |
| No reversal flow for failed disbursement | 33 Payment Failed — Refund Issued |
| No non-payment policy for group members | 34 Group Rules (shown at group creation, includes the non-custodial disclosure) → 35 Member Missed Contribution (leader-facing, Remind or Remove) |
| No mid-cycle join handling | 36 Joining Mid-Cycle — clarifies first contribution date, confirms no catch-up payment owed |
| No leader succession path | 37 Transfer Leadership — pick a member, ranked by reliability history |

## Two real bugs caught during this pass

- Screen 33: the CTA button position assumed a fixed 2-row detail card height; the actual card had 3 rows, so the button overlapped the third row. Fixed by measuring the actual card height instead of a hardcoded offset.
- Screen 34: a wrapped 2-line headline overlapped its subtitle because of a positioning calculation that didn't account for the wrap in that specific case — same pattern that worked correctly everywhere else, but here needed a direct re-measurement and cascade-shift of the content below it. Fixed and verified.

## Update — duplicate-automation detection added

38 Duplicate Automation Warning — a bottom-sheet modal that interrupts any automation-creation flow (third-party payer, group, or standard bill automation) when the system detects a close match to an existing automation. Shows the existing automation's name/amount/next-run for comparison, with "View Existing Automation" (primary) or "Create Anyway" (secondary) — never blocks outright, since a legitimate duplicate (e.g. two different tenants both auto-paying the same landlord) is a real case. Same button-height-measurement bug as screen 33 showed up here too (hardcoded card-height assumption instead of measuring the actual 3-row card) — fixed the same way, worth grepping for this pattern if more detail cards get added elsewhere.

The actual duplicate-*matching* logic (what counts as "close enough" — same recipient? same amount ± tolerance? same category?) is a backend decision this screen doesn't resolve — the design assumes the match already happened by the time this sheet appears.

## Still not addressed (explicitly out of scope)

- **Non-custodial backend confirmation** — screen 34 now *displays* "Kwikpik passes contributions straight through — we never hold your group's money," but whether the backend actually implements a non-custodial pass-through (vs. Kwikpik-controlled pooled wallets) is a real engineering/compliance decision this pass can't resolve from the design side. The UI copy should not ship until that's confirmed true.
- Formal accessibility/contrast measurement, still visual-only as noted in the prior aesthetic pass.

This closes the highest-priority items from the UX critique. Re-score after backend/compliance confirms the non-custodial claim in screen 34 is accurate — that's the one place design and business reality could diverge.
