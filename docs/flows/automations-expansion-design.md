# Automations Expansion — Design Spec (Draft, awaiting feedback)

Figma: `Kwikpik Web3` → page **"🔀 Automations Expansion (Draft)"**
`https://www.figma.com/design/bppFxXazAscyLv3FZvzBf6/Kwikpik-Web3?node-id=9535-2`

24 screens across 5 groups, built entirely from the existing design system (real Textfield/Button/Radio/Toggle component instances, Satoshi type scale, brand color ramps) — nothing hand-drawn. This is a first pass for feedback, not final.

## What this expands

Two capabilities on top of the existing Automations feature (documented in [`business-logic.md`](./business-logic.md)):

1. **Third-party payer automations** — the person who sets up an automation and the person who funds it can now be different people. A creator picks a payer (another Kwikpik user) and a recipient (themselves, one of their bills, or an external third party); the payer gets a request, reviews it, picks a date if none was set, chooses how they want to be reminded, and accepts or declines.
2. **Ajo / group contribution automations** — a leader creates a group, sets a contribution amount and frequency, and invites members by email/phone. Invitees land on a public page, can join with full onboarding (KYC + wallet) or as a guest (card-only, no account).

## Screen groups

1. **Payer & Recipient Setup** (1–5) — Who Pays / Payer Lookup / Who Receives / Recipient Details / Review & Send Request
2. **Payer Request & Accept** (6–10) — Incoming Requests / Request Detail / Reminder Mode / Request Accepted / Decline Request
3. **Automation Detail & Reminders** (11–16) — updated Automation Detail with payer/creator roles, three reminder-notification states (approval needed, insufficient balance, notify-only), and paused notices for both payer and creator
4. **Ajo Groups — Create** (17–20) — Create Group / Add Members / Group Created / Group Detail (leader view, with a live pool-progress ring)
5. **Ajo Groups — Invite & Join** (21–24) — public Invite Landing Page, post-login landing with account-setup-vs-guest choice, guest card+day flow, and day configuration for the full-account path

## Product decisions made to keep moving (confirm or correct in the feedback pass)

These were called out as open questions before this pass; rather than block on them, I made a call for each and built to it — flag anything that's wrong:

- **Recipient shapes**: exactly three — pay into the creator's own wallet, pay the creator's own bill, or pay a fully external third party. No fourth shape assumed.
- **Payer without a Kwikpik account**: not built in this pass — third-party-payer assumes both people already have accounts. The Ajo invite flow is the only place that handles a non-user (email/phone invite → download → onboard).
- **Request editability**: payer can only accept/decline and set date + reminder mode — amount and recipient are locked by the creator. Creator can't edit after sending (would need to cancel and resend, not built as a distinct screen here).
- **Date suggestion**: shown as plain text ("Last Friday of the month") rather than an interactive picker — the actual suggestion algorithm (what "last Friday" generalizes to for other frequencies) still needs a real spec from you.
- **Approval mode**: built as a one-time choice at accept time, not shown as changeable later — if approval should be per-cycle or switchable, screen 11 (Automation Detail) is where that toggle would live.
- **Ajo payout model**: built as leader-collects (money lands in the leader's wallet each cycle) — not a Kwikpik-managed rotation. If it should rotate automatically, Group Detail (20) needs a different structure (whose turn is next, not just a pool total).
- **Guest identity**: no name/email capture shown before card entry — just phone (from the invite) + card. Add a step if any KYC-lite capture is required for compliance.
- **Compliance**: flagged in this doc, not resolved. The guest KYC-skip path (23) and pooled-fund custody in the leader-collects model (20) are the two areas most likely to need legal/compliance review before this ships.

## Visual direction

Functional/wizard screens (setup, forms, requests) stayed clean and utilitarian — matching the existing app's plain grey-card language, per "one decision per screen." The genuinely celebratory or first-impression moments got a distinct elevated treatment: a diagonal Primary-500→Primary-700 gradient hero with soft blurred glow accents, floating white cards with layered shadows straddling the gradient/white seam, and a circular progress ring for the group pool. Used on: Request Accepted (9), Group Created (19), the public Invite Landing Page (21), and Group Detail (20). This is a deliberate two-tier system, not inconsistency — say if it should extend further or pull back.
