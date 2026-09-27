# Flow Map

Full structural map of the Kwikpik mobile app, reconstructed from the Figma file. Kwikpik is a **Hedera-based crypto + fiat super-wallet** (one ledger spanning NGN and crypto — BTC, USDT, ETH, BNB, AAVE, ADA, AVAX) wrapped around a **multi-vertical marketplace** (Food, Groceries, Farm-to-Table, Logistics) that all settle out of the same in-app wallet balance.

## Corrected readings

Figma's auto-generated frame names didn't always match what's on screen. These have been **renamed directly in the Figma file** (see [`figma-corrections.md`](./figma-corrections.md) for the full log) — this section just explains the corrections for context:

- **"Split Payment Flows" → Asset Split.** Not splitting a bill between people — paying one bill by blending multiple wallet assets (e.g. NGN + USDT + BTC) into a single transaction, with an auto-balance toggle.
- **"Activities Flows" → Activity Feed & Tracking.** Not an events/ticketing vertical — the unified order-history feed (mixing every vertical) plus the live rider-tracking component reused across Food/Groceries/Farm/Logistics.
- **"Sign up" (in Transactions) → Internal Transfer.** Send to another Kwikpik user via email, UID, or mobile — not an auth screen. Includes an invalid-user error state and a confirm-user step.
- **"Reset Password" (in Transactions, node `2011:6925`) → Forgot Transaction PIN.** Email-OTP recovery for a completely forgotten wallet PIN.
- A *second*, unrelated pair of frames also mislabeled "Reset Password" in the same Transactions row turned out to be a plain **Set PIN / Confirm PIN** instance (`3111:10755` / `3111:10813`) — the same reusable 2-screen component used elsewhere, not part of the Forgot-PIN recovery flow.
- **"Reset Password" (in Settings) → resolves to two distinct flows:**
  - `2862:9295` / `2862:9896` — **Set PIN / Confirm PIN** (first-time PIN creation)
  - `2862:9561` / `2862:9721` / `2862:9968` / `2862:10026` — **Change PIN**: verify identity via email OTP *or* current PIN (user's choice, either entry point works) → set new PIN → confirm new PIN

### A gap that turned out not to be a gap

Earlier passes flagged the real "Withdraw Naira / Deposit Naira / Withdraw Crypto / Deposit Crypto / Exchange" screens as unverified. On inspection, the cluster of frames those labels sit near (`2052:xxxxx` / `2053:xxxxx`) is actually a **Transaction Details status/type gallery** — the same receipt component rendered for different transaction categories and statuses (subscription payment, merchant spend summary, Naira withdrawal *pending*, crypto withdrawal *processing*, Naira deposit *failed*, crypto swap *completed*). These were **correctly named** "Transaction details" already — no rename needed.

The actual entry point for deposit/withdraw/exchange is the **Deposit / Send / Exchange action row** under All Assets → per-asset detail (confirmed to exist, not separately screenshotted as a dedicated multi-step input flow). If a feature needs the withdraw/deposit *input form* specifically, that's worth confirming with design directly — it may not exist as a distinct screen yet.

## Flow groups

### Identity & Access

**Onboarding** (29 screens) — Splash → 3-slide carousel → Sign Up (social or email, password rules, ToS) → email OTP → personal details (+ referral code) → Home. Separate PIN-login screen for returning sessions, distinct from full Sign In. Forgot Password: single email field → send-code.

**Home** (23 screens, several confirmed as *states* of one screen) — Fresh/default state, populated state (mixed fiat + crypto history), and a post-signup setup checklist state ("BVN Verified" + "Set PIN 2/2"). Bottom nav is only 3 tabs: Home / Pay Bills / Account — no dedicated Wallet tab.

### Wallet & Money Movement

**Transactions** (99 screens) — Unified list mixing fiat + crypto, grouped by date, status chips (In Progress / Bulk / Needs Attention). **All Assets**: portfolio view (NGN, USDT, BTC, ETH, BNB) → tap an asset → Deposit / Send / Exchange actions + asset-scoped history. **Internal Transfer** and **Forgot Transaction PIN** live here (see corrections above). **Bulk Transactions**: batch payments mixing bank + crypto recipients, per-recipient status (success/pending/failed), with sub-tabs implied for Internal vs. Crypto bulk sends.

**Automations** (72 screens) — Recurring-payment engine: **Bill Payment**, **Transfers** (external bank/crypto address, internal, or bulk), **Savings Goals** ("coming soon", not yet built). Setup: type → method → asset (fiat or crypto) → recipient → trigger + frequency → confirm. Management list with Active/Paused tabs, pause/edit/delete. See [`business-logic.md`](./business-logic.md) for scheduling and failure-handling rules.

**Bill Payments** (32 screens) — 15 categories (Airtime, Data, Electricity, Cable TV, Jamb/WAEC, Betting, Insurance, School Fees, Flight Tickets, Religious & NGO, Water, Embassy, Intl Airtime, Transport/Toll, Waste). One shared field pattern: recipient identifier → amount → proceed. Every bill has the "Automate this bill" toggle and the Asset Split option on confirm.

**Asset Split** (10 screens, formerly "Split Payment Flows") — pay a bill using a blend of wallet assets. See [`business-logic.md`](./business-logic.md) for the allocation-priority rule.

**Wallet KYC** (16 screens) — Three triggers: send-limit exceeded, crypto→NGN conversion, deposit above limit ("Wallet Locked" banner). All three funnel to one lightweight 2-step screen: ID upload + proof of address. See [`business-logic.md`](./business-logic.md) for tier limits.

### Marketplace verticals

**Food** (41 screens) — Browse → restaurant detail (menu, out-of-stock states) → single-screen checkout (wallet balance is the only payment method shown) → order-status stepper tracking → post-delivery dual rating (restaurant + rider).

**Groceries** (10 screens) — Store discovery → catalog with quantity steppers → same checkout pattern as Food.

**Farm-to-Table** (14 screens) — Same structure as Groceries; catalog is produce/livestock instead of packaged goods. The sampled checkout screen is functionally shared with Groceries — confirmed intentional (see `business-logic.md`), though the vertical hasn't had dedicated design differentiation work yet.

**Logistics** (29 screens) — Peer-to-peer "Send Item" courier — separate rider pool from Food/Groceries delivery (confirmed). Instant vs. Flexible ("pay on delivery") delivery type. Separate "Track Item" entry for tracking-ID-only access, no login required.

### Cross-cutting & Account

**Activity feed & Tracking** (16 screens, formerly "Activities Flows") — One reverse-chron list mixing orders from every vertical, with status pills (Cancelled / In progress / Unpaid / Completed). Track component reused across Food / Groceries / Farm / Logistics: Cancelled / In transit / Delivered states, rider chat + call.

**Settings** (25 screens) — Account hub: Profile / Wallet / Orders & Rewards / Help & Legal. Confirms the Hedera wallet toggle, biometrics, transaction limits, promo-code list.
- **Affiliate Program**: a real monetized referral system — unique referral code + shareable link, 10 points earned per referral who completes a ride/order, points convert to cash at a fixed rate directly into the wallet, plus an Affiliates Leaderboard.
- **Wishlist**: spans multiple verticals via tabs (Restaurants / Supermarkets / Farm Stores), not scoped to a single vertical.
