# Automations Expansion — V1 Rework (Production Fidelity Pass)

Figma: `Kwikpik Web3` → same file, but a **new section on the main app page**, not the original draft page.
`https://www.figma.com/design/bppFxXazAscyLv3FZvzBf6/Kwikpik-Web3?node-id=9656-13625`

Section name: **"Automations Updates"** (node `9656:13625`), living inside the **"💫 User App - New"** page (node `1323:2810`) — i.e. alongside the real production screens, not on the isolated draft page (`9535:2`) described in `automations-expansion-design.md`. That original draft page still exists untouched as historical reference.

## What changed from the original draft

The user (product owner) rebuilt the flow from scratch by duplicating **real production frames** (Automations, Internal Transfer, Transaction Details, Splash, Home, Invite Page) as a base, then customizing — not by composing generic design-system components like the original 38-screen draft did. Net effect: this version is much closer to build-ready, at the cost of the frames initially carrying misleading auto-generated names (since fixed, see below).

**New information architecture**: split into two role-based flows instead of one linear sequence —
- **Automations Creator Flow** (22 screens): Single Individual → For Bill Payment → Financial Requests → Group / Community
- **Automations Receivers Flow** (17 screens): Initial Entry From Link → Setup Account & Proceed → Continue As Guest → Automations List → Automations Details

This is a real improvement over the original single 5-group structure — it reflects the two-sided nature of the feature (creator vs. payer/receiver) directly in the IA. Financial Requests also now supports crypto assets (NGN + 8 assets), which the original NGN-only draft missed.

## V1 scope — confirmed cuts (deliberate, not gaps)

The product owner explicitly descoped these for V1, deferring to V2: **disputes/report-a-problem, refunds, spending cap, request expiry, mid-cycle group join, duplicate-automation warning, guest cancellation, member trust/reliability badge, leadership transfer**. For disputes/refunds specifically, users reach out to support directly instead. KYC and wallet-funding steps intentionally stay as placeholder frames — production KYC screens already exist elsewhere and should be reused as-is, not redesigned. Email reminder designs remain deferred (in `docs/flows/emails/`, untouched).

## Cleanup pass applied (this session)

Found and fixed during review:
- Date bug: two "Automation Details" screens showed "20th July, **2023**" while every other date on the same screens correctly showed 2026.
- Typos: "Automatons List/Details" → "Automations List/Details"; "Whats is this Automation For?" → "What's This Automation For?"; a run-on grammar issue on 3 automation-request-sent success screens.
- **Real content bug, not just cosmetic**: 5 screens (Financial Request review/success, Group review/success, Guest success) retained a dimmed **"Buy Airtime" / "Amount Of Airtime"** background — leftover from being duplicated off the bill-payment screen as a base template, never relabeled. Fixed to "Configuration" / "Amount". Same duplicate-and-forget pattern appeared 3 separate times across this file — worth a proofing pass on any future screens built by cloning.
- All 48 frames (39 screens + 9 group headers) renamed from generic auto-generated names (Automations, Internal Transfer, Transaction details, Splash, Home) to descriptive names, for Dev Mode handoff clarity.
- A completeness audit found and fixed: a missing "Request Accepted!" confirmation after the standard (non-guest) Accept path, an undesigned Activity tab on Automations Details (was showing duplicated Members-tab content), and 4 further mislabeled frames in the Group creation sub-flow.

## New: Notifications system

Kwikpik's Home screen had **no notification bell before this** (confirmed by checking the canonical production Home frames). Added:
- Bell icon + unread-count badge on Home.
- **Notifications List** — a real cross-app inbox (not automations-only): tabs (All/Unread/Reminders/Alerts), categorized rows, "Mark All as Read".
- **Notification Detail** (5 content variants, styled identically to Automation Details per the product owner's direction): Approval Needed, Insufficient Balance, Notify-Only, Paused (Creator), Paused (Payer) — replaces the standalone reminder-card screens from the original hardening pass, since most users won't visit the app just to check reminders; the bulk of that communication is expected to happen via email (still deferred).

## New: Group Wallet

Directly answers a real stakeholder question captured in a Slack thread (Philip Akhilome, product): *"Is there a view for the group owner to see contributions? What's the plan for collection — should contributed amounts sit in the creator's main wallet?"* — the same non-custodial ambiguity flagged since the original design pass.

**Product decision made in this session**: contributions do **not** land directly in the creator's personal wallet. Instead:
- **Group Wallet Carousel** (on Home) — swipeable cards, one per group the user hosts, each showing that group's balance with "View Group" / "Withdraw" CTAs and dot indicators (reuses the existing promo-card carousel pattern).
- **Group Wallet Detail** — balance header + a transaction history **scoped to that group**, attributing each entry to the specific member who deposited (not a generic "Wallet funding" line) plus withdrawals to the main wallet, with a primary "Withdraw to Main Wallet" action.
- **Member Billing History** — tap into any member from the group to see their individual contribution record, cycle-by-cycle, with Paid/Missed status pills and a reliability summary (e.g. "4/5 Paid, On Time: 80%") — a billing-page-style view, plus a "Remind to Pay" action for missed cycles.
- Activity tab on Automations Details gained a **Current Window / All Time** toggle to scope what's shown.

**Important caveat**: this is a UX-level answer, not a backend one. It gives engineering a concrete spec (a segregated group ledger with an explicit withdraw action) instead of an ambiguous "passes straight through" claim, but whether the backend actually implements per-group fund segregation vs. a labeled view over pooled funds is still an open compliance/engineering decision — same open item as before, now with a clearer UI contract to build against.

## Accessibility check performed

Ran an actual WCAG AA contrast check (not just visual eyeballing, unlike every prior pass) across 42 text/background pairs on the Notification Detail and Notifications List screens: **41/42 pass**. The one failure — grey tile-label text (`Automation`, `Amount`, `Trigger Type`...) on the light-grey Info panel background, ratio 4.38 vs. 4.5 needed — is a **file-wide design-system token issue** (the same "Tiles" component is reused across Automation Details, Transaction Details, etc. throughout the whole app), not something specific to this feature. Fixing the shared grey token (or lightening the Info panel) resolves it everywhere at once.

## Still open (unresolved, not this session's to close)

- Non-custodial / group-fund-segregation backend implementation (see above).
- Duplicate-automation matching logic — still entirely unaddressed (the original hardening-pass warning screen for this was cut in the V1 rework, not carried over).
- The shared grey-label WCAG contrast token (see above).
