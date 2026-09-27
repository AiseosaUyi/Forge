# Kwikpik Unified Portal — Mode Switcher + Action Hub

**Status:** Design spec, digesting a verbal product direction into concrete IA + screen inventory, grounded in
[`LOGISTICS_PLATFORM_UX_CONTEXT.md`](./LOGISTICS_PLATFORM_UX_CONTEXT.md) and
[`B2B_PLATFORM_UX_CONTEXT.md`](./B2B_PLATFORM_UX_CONTEXT.md). This spec does **not** propose rebuilding either
product's underlying features — it proposes a shared shell + one bridging surface (Action Hub) + a mode switch
that toggles which sidebar/nav is showing. Existing forms, tables, and flows are reused, presented via a
restyled shell and, where noted, inside modals instead of full-page navigation.

---

## 0. The core idea, restated precisely

Today there are two sibling products sharing the `kwikpik` brand but with separate IA and (per the B2B audit,
§1 and §11.4) **unconfirmed** shared login/session:

| | Logistics Partner Portal | B2B Module ("business"/finance) |
|---|---|---|
| Nav | Dashboard, Orders, Packages, Returns, Wallet, Invoices, Exports, Settings | (Action Hub — first-run only), Overview, Transactions, Payment Links, Customers, Settings |
| Visual shell | Plain sidebar, no KYC/verify card, no multi-currency wallet widget | Sidebar + topbar + persistent "Verify Account" KYC card, richer component system |
| "Wallet" concept | Prepaid shipping/insurance wallet, per-package payout share for riders | Multi-asset (NGN/USDT/crypto) business wallet — Fund/Transfer/Swap |

The new direction: **one account, one login, two "modes."** A partner can have Logistics enabled, Finance
enabled, or both. A **mode switcher** in the top nav swaps the entire sidebar/IA between the two (Logistics
mode shows Orders/Packages/Returns/etc; Finance mode shows Transactions/Payment Links/Customers/etc). A new,
permanent **Action Hub** tab — first item in the sidebar, present in both modes — is the one place that shows
actions from *both* modules at once, so a Logistics-mode user isn't blind to Finance actions and vice versa.
Actions launched from the Action Hub open as **modals**, not page navigations, so you don't lose your current
mode context to perform a quick cross-module task.

---

## 1. Onboarding addition

Builds directly on the existing sequence documented in B2B audit §2 (Create account → Confirm Email → "Tell us
about your business" registration-status radio → KYC checklist). Insert **one new step** after account
creation, before or alongside the existing "Tell us about your business" step:

**New step — "What brings you to Kwikpik?"** (or similar; exact copy TBD in design pass)
- Three options, single-select, presented as selectable cards (consistent with the existing radio-card
  pattern used in "Tell us about your business"):
  - **Finance / Wallet** — "Send, receive, and manage business payments."
  - **Logistics** — "Ship and track packages as a delivery partner."
  - **Both** — "I need payments and logistics."
- Selection determines which module(s) are enabled on the account and therefore what the mode switcher/Action
  Hub show post-onboarding (see §4 empty states).
- **Default landing after onboarding, per your instruction:**
  - "Both" → lands in **Finance mode**.
  - "Finance" only → Finance mode (no switcher shown, or switcher shown but Logistics side is the
    "not enabled" empty state — see open decision D1 below).
  - "Logistics" only → Logistics mode.
- This selection is a **starting configuration, not a lock** — Action Hub's empty states (§4) are the
  in-product way to enable the other module later, so this isn't a one-time irreversible fork.

---

## 2. Mode switcher

**Placement:** top nav bar, next to the existing search/notification-bell/avatar cluster (both products
already have that cluster per Logistics §"Global navigation" and B2B §1).

**Form:** a two-option **segmented toggle/pill control**, not a dropdown — there are only ever two states, and
a toggle makes the current mode legible at a glance without opening anything, which matters since it re-flows
the entire sidebar underneath it.

**Labels:** proposing **"Finance"** / **"Logistics"** rather than "Wallet Mode" (both products have a page
literally called "Wallet," so "Wallet Mode" would be ambiguous — see D2 below).

**What it affects:** the entire sidebar nav list below Action Hub, i.e. it swaps between:
- **Finance mode sidebar:** Action Hub, Overview, Transactions, Payment Links, Customers, Settings
- **Logistics mode sidebar:** Action Hub, Dashboard, Orders, Packages, Returns, Wallet, Invoices, Exports,
  Settings

Action Hub itself does not change position or disappear — it's the one constant tab across both modes.

**Visual unification, per your instruction:** the Logistics portal's shell (sidebar chrome, topbar, cards,
tables) is restyled to match the B2B module's existing, more developed design system (per B2B audit §9's
shared component vocabulary: `Button`, `Textfield`, `Toggle`, `Badges`, `Tab`, etc. — already documented in
this repo's `docs/design-system/`). This is a **visual/shell restyle, not a rebuild** of Logistics' actual
forms/tables/logic — Orders, Packages, Returns etc. keep their existing fields and behavior, just re-skinned.

---

## 3. Action Hub — layout

First tab in the sidebar, in both modes. Two-column layout on desktop (stacks to one column on mobile,
consistent with the mobile-first pattern already established across the B2B file per audit §1).

```
┌─────────────────────────────┬─────────────────────────────┐
│  Finance quick actions       │  Logistics quick actions     │
│  ─────────────────────       │  ─────────────────────       │
│  [Fund]  [Transfer]  [Swap]  │  [Create Order] [Create      │
│  [Create Payment Link]       │   Return] [Track Package]    │
│  [View Transactions]         │  [Withdraw from Wallet]      │
│  ...                         │  [View Exports]               │
└─────────────────────────────┴─────────────────────────────┘
```

Column content is pulled from **real existing actions** already found in each audit, not invented:

- **Finance column source actions** (B2B audit §3, §5): Fund, Transfer (single/multi), Swap, Create Payment
  Link, plus a "View Transactions" shortcut.
- **Logistics column source actions** (Logistics audit, Orders/Wallet/Returns sections): Create Order (the
  Form-tab flow specifically — JSON/CSV bulk modes stay on the full Orders page, not the quick-action modal),
  Withdraw from Wallet, plus shortcuts into Packages/Returns/Exports.

Each quick-action card triggers a **modal**, not a page navigation (§5).

---

## 4. Action Hub — empty states

If a module isn't enabled on the account (per the onboarding selection in §1, or never turned on):

> **[Module icon] Logistics isn't set up yet.**
> Ship and track packages as a delivery partner.
> **[Set up Logistics →]**

Same pattern, mirrored, for Finance. Clicking the CTA starts that module's own setup flow (Logistics: partner
application/KYC; Finance: the existing B2B onboarding/KYC checklist from audit §2) — Action Hub doesn't
duplicate that flow, it just launches it.

**Simplification from your original description:** you described two slightly different empty-state behaviors
(a full "not enabled, click to set up" empty state for Logistics vs. "just show the few actions like Fund" for
Finance). For consistency and to avoid two different empty-state patterns for the same underlying situation,
this spec uses **one pattern for both columns**: not-enabled → setup CTA; enabled → quick action buttons. This
is called out explicitly in case you want the asymmetric version reinstated.

---

## 5. Cross-module modal action flow (worked example: Create Order)

1. User is in **Finance mode**, on Action Hub.
2. Clicks **"Create Order"** in the Logistics column.
3. A **modal** opens over the current screen (mode does not switch, sidebar does not change) containing the
   existing Order creation **Form tab** only (per Logistics audit — Pickup Details + Packages fields, insurance
   checkbox; JSON/CSV modes are power-user/bulk paths that stay on the full `/partner/orders/new` page, not
   appropriate for a quick-action modal).
4. Existing inline validation behavior is preserved (per-field errors, no native `alert()`, per Logistics audit
   §"Observed — form validation").
5. On submit: success state inside the modal —
   > **Order created.** Would you like to view it?
   > **[View order]**  **[Close]**
6. Clicking **View order**: the modal closes, the **mode switcher flips to Logistics**, and the app navigates
   to that order's detail view (Orders page, filtered/scrolled to the new order). This is the one place mode
   switching happens automatically rather than by manual toggle — a deliberate exception because the user just
   asked to see something that only exists in the other mode.
7. Clicking **Close**: modal closes, user stays on Action Hub in Finance mode, unaffected.

This same pattern (modal → submit → "view it?" → auto-switch mode + deep link) generalizes to every Action Hub
quick action, not just Create Order.

---

## 6. Open decisions made by default in this spec (flag if you want them changed)

- **D1 — Single-module accounts still see the switcher.** A Finance-only account still shows the mode
  switcher and Logistics sidebar items, just gated to the Logistics empty-state everywhere, rather than hiding
  the switcher entirely. This keeps discovery of the other module consistent and avoids a second, different
  "no switcher at all" state to design. Flag if you'd rather hide the switcher entirely until both are enabled.
- **D2 — Switcher labels "Finance" / "Logistics"**, not "Wallet Mode," because "Wallet" is already a specific
  page name in both products (Logistics has a Wallet nav item; B2B has a Wallet balance card) — reusing it as
  the mode label would be confusing on top of a Wallet page existing inside Finance mode itself.
- **D3 — The two "Wallet" concepts are kept visually/conceptually distinct**, not merged into one balance.
  Neither audit found evidence of a shared ledger between the Logistics prepaid/payout wallet and the B2B
  multi-asset business wallet (B2B audit §1, §11.4 explicitly flags this as **Unknown**). The Action Hub shows
  both, labeled distinctly (e.g. "Business Wallet" actions vs. "Logistics Wallet" actions), rather than
  presenting a single unified balance that isn't confirmed to exist on the backend. **This is the single
  biggest open question for whoever builds this** — if the two wallets are in fact the same ledger, the design
  should change to show one balance, not two.
- **D4 — The existing Figma "Action Hub" (B2B onboarding-only, first-run) is repurposed**, not duplicated. Its
  current scope (appears pre-activity, disappears once there's data) becomes the *initial state* of the new
  permanent Action Hub, rather than a separate thing.

## 7. Explicitly out of scope

- No rebuild of Orders/Packages/Returns/Transactions/Payment Links/Customers functionality — existing forms
  and tables are reused as-is inside the new shell/modals.
- No resolution of the shared-login/shared-account backend question (B2B audit §11.4) — this spec assumes it's
  true (one account, two modules) because that's the premise you described, but flags it as unverified.
- No new backend wallet-unification decision (D3) — design keeps them separate pending a real answer.

---

## 8. Figma deliverable — screen inventory

Built as a **new, separate page** inside the existing `Kwikpik-Web3` Figma file (not editing the live
Logistics or B2B frames in place, consistent with not disturbing concurrently-edited work), reusing the
existing component library (Button, Textfield, Toggle, Tab, Badges, etc. — B2B audit §9):

1. Onboarding — "What brings you to Kwikpik?" step (3 selectable cards: Finance / Logistics / Both)
2. Top nav — Mode switcher component, both states (Finance selected / Logistics selected)
3. Sidebar — Finance mode (restyled Logistics-equivalent items absent; B2B items present)
4. Sidebar — Logistics mode (Logistics items present, restyled to match B2B shell)
5. Action Hub — both modules enabled (two populated columns)
6. Action Hub — Logistics not enabled (Finance column populated, Logistics column empty state)
7. Action Hub — Finance not enabled (inverse of #6)
8. Cross-module modal — "Create Order" modal, triggered from Finance mode
9. Cross-module modal — success state ("Order created. View it?")
10. Post-"View order" state — mode switcher now shows Logistics, Orders page open on the new order

Screens 8–10 form one continuous flow and should be laid out left-to-right in Figma as a connected sequence.
