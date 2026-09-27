# Kwikpik Unified Portal — Brief for UI Exploration

Copy everything below into another model to generate fresh visual explorations of this concept. It's
self-contained — no file/Figma access assumed. The goal is alternative, high-craft visual treatments of an
already-locked product concept and flow, not a re-litigation of the underlying idea.

---

## 1. Product context

**Kwikpik** is a Nigerian fintech/logistics company with two separate live products sharing the same brand:

1. **Logistics Partner Portal** (`logistics.kwikpik.io`) — a B2B shipping/delivery ops tool. Partners create
   orders (which contain packages), track packages through a detailed status lifecycle, manage returns/RTOs,
   fund a prepaid wallet for shipping/insurance costs, and — notably — can also operate their own **rider
   fleet** and earn per-package delivery payouts from Kwikpik (a hub-and-spoke marketplace mechanic, not just
   single-carrier shipping).
   - Current sidebar nav: **Dashboard, Orders, Packages, Returns, Wallet, Invoices, Exports, Settings.**
   - Visual style today: plain/utilitarian — sidebar + topbar, functional tables and forms, no KYC gamification.

2. **B2B Module** ("business"/finance side, part of the "Kwikpik Web3" product family) — a payments/wallet
   platform for merchants: multi-currency wallet (NGN + USDT + crypto), fund/transfer/swap, payment links
   (shareable checkout pages), an embeddable payment widget (Transfer/Card/USSD/Crypto), and customer/
   transaction management. Strong KYC/KYB gamification (a persistent "Verify Account" progress card,
   0→10→20→25→50→90% checklist) and mobile-first responsive design throughout.
   - Current sidebar nav: **(Action Hub — currently first-run only), Overview, Transactions, Payment Links,
     Customers, Settings.**
   - Visual style today: more developed design system — richer cards, charts (donut/bar), badges, tabs, a
     persistent business-switcher at the top of the sidebar.

**Both products currently have dead/thin notification affordances**: a bell icon that does nothing or barely
anything, and no real in-app notification center in either product. Not the focus of this brief, but useful
brand-voice context: these products are not yet "polished/premium" everywhere — there's real room for a UI
exploration to raise the bar, not just reskin.

---

## 2. The concept being explored: one account, two modes, one bridge

**Problem:** these are two separate products/IAs today. The business goal is to let one partner account use
both, without rebuilding either product's actual features (forms, tables, business logic stay as-is).

**Solution shape (already decided — build UI around this, don't redesign the concept itself):**

- **Onboarding** gets one new step, "What brings you to Kwikpik?" — three choices: **Finance / Wallet**,
  **Logistics**, or **Both**. This determines which module(s) are active on the account. If "Both," the
  account lands in **Finance mode** by default afterward.
- A **mode switcher** lives in the top nav (next to search/notifications/avatar) — a two-state control, labeled
  **"Finance" / "Logistics"** (not "Wallet Mode" — both products already have a page literally called
  "Wallet," so that label would be ambiguous). Switching it swaps the entire sidebar/IA beneath it between the
  two products' nav lists above. The Logistics portal's visual shell gets restyled to match the more developed
  B2B design system — same underlying forms/tables, new skin.
- A new, **permanent "Action Hub"** tab is the first sidebar item in **both** modes (repurposing an existing
  but narrowly-scoped "Action Hub" concept already in the B2B product that currently only shows on the very
  first empty dashboard state). Action Hub is a **two-column layout**: one column of quick actions for
  Finance (Fund, Transfer, Swap, Create Payment Link, View Transactions), one column of quick actions for
  Logistics (Create Order, Withdraw from Wallet, View Packages/Returns/Exports). If a module isn't enabled on
  the account, that column shows a "not set up yet" empty state with a setup CTA instead of action buttons.
- Quick actions launched from Action Hub open as **modals** (not full-page navigation), so a user doesn't lose
  their current mode/context to do a quick cross-module task. Example flow: user is in Finance mode, clicks
  "Create Order" in the Logistics column of Action Hub → a modal opens with the (existing) order-creation form
  → on submit, success state reads **"Order created. Would you like to view it?"** → clicking **View order**
  auto-switches the mode switcher to Logistics and deep-links to the new order. Clicking Close just closes the
  modal and keeps the user in Finance mode on Action Hub.
- The two products' "Wallet" concepts are treated as **visually distinct**, not merged into one balance — it's
  unconfirmed whether they're actually the same backend ledger, so the UI shouldn't imply that they are.

---

## 3. Screens to explore (10, forming one continuous story)

1. Onboarding — "What brings you to Kwikpik?" — 3 selectable option cards (Finance / Logistics / Both)
2. Top nav mode switcher component — both states (Finance selected / Logistics selected)
3. Sidebar — Finance mode
4. Sidebar — Logistics mode (same visual language as Finance mode's shell, different item set)
5. Action Hub — both modules enabled, two populated columns of quick-action cards
6. Action Hub — Logistics not enabled (Finance column populated, Logistics column shows setup empty-state)
7. Action Hub — Finance not enabled (inverse of #6)
8. "Create Order" modal, triggered from Action Hub while in Finance mode — reuses the existing Logistics order
   form fields: Delivery Mode (Offline/Online), Pickup Address, Contact Name/Phone/Email, Vehicle Type,
   Drop-off HUB, Pickup Notes, then a packages section (Package Number, Recipient Name/Phone/Email,
   Destination Area, Delivery Address, Delivery Timeline, Weight, Quantity), plus an "Insure every package in
   this order" checkbox with premium copy ("Adds a goods-in-transit premium of 1% of declared value, max claim
   NGN 8,000,000").
9. Modal success state — "Order created. Would you like to view it?" with View order / Close actions
10. Post-"View order" state — mode switcher now shows Logistics selected, Orders list open with the new order
    highlighted/at top

Feel free to propose alternate visual treatments, layouts, motion ideas, or component styling for all of the
above — the flow/content logic above is fixed, the pixels are what's open for exploration.

---

## 4. Design system reference (use these, don't invent a new brand)

**Brand color** — primary purple `#564cd8` (`Primary/500`), secondary orange `#e07529` (`Secondary/500`).
Full neutral ramp anchors: surface `#f6f7f7` (Grey/50), border `#e3e3e4` (Grey/100), primary text `#0b0c0c`
(Grey/900), secondary text `#717477` (Grey/500). Semantic colors follow a consistent 50/100 → 500 → 700/900
pattern (background → icon/accent → text) for Success (`#27ae60` at 500), Error (`#ff2e00` at 500), Warning/
orange (`#ff8001` at 500), Info/Blue (`#0047ff` at 500) — reuse this pattern for any new status pill/badge/
alert rather than inventing new status colors.

**Typography** — primary font **Satoshi** (geometric sans), weights Black/900 for headings (H1 32px → H6
14px), Regular/400 and Bold/700 for body (Body1 16px → Body3 12px), Bold/700 for all button labels (18px/
16px/14px/12px sizes). Secondary/legacy font Inter appears in a few older frames only — default to Satoshi for
new work.

**Spacing** — 8px-leaning scale: 2, 4, 8, 12, 16, 24, 40, 56, 80, 120px. Use 16–24px for card/screen padding
and gaps between distinct components, 8–12px for tight control-internal spacing, 40px+ for section/empty-state
separation.

**Radius** — 4 / 8 / 16 / 24px, plus 120px (fully-rounded) for pills/chips/avatars/circular buttons. Default
control radius (buttons, inputs, cards) is **16px** unless it's a pill/chip/avatar.

**Elevation** — soft, near-black (`#0D0B0E`) drop shadows scaling from `xs` (resting cards/list items) through
`md` (dropdowns/popovers) to `lg`/`xl` (modals/dialogs) to `xxl` (full-screen overlays). Modals in this brief
should read at `lg`/`xl` elevation.

**Existing component/icon vocabulary** (reuse names/shapes where relevant rather than inventing parallel
ones): `Button`, `Textfield`, `Toggle`, `Radio Button`, `checkbox`, `Badges`, `Tooltip`, `Tab`, `Table cell`,
`Search`, `Kebab-Horizontal` (⋯ menu), plus icons: `chart-2`, `money-send`, `money-receive`,
`transaction-minus`, `profile-2user`, `setting-2`, `link`, `notification`, `eye`, `close`, `tick-circle`,
`document-text`, `document-upload`, `card`, `hashtag-up`, `mail`, `location`, `user-square`, `wallet`, `copy`,
`share-2`, `add-circle`, `trash`, `edit-2`, `chevron-down`, `arrow-left`, `menu`.

**Locale/market:** Nigeria-specific — Naira (`₦`) first-class currency, Nigeria-specific identity/compliance
concepts appear elsewhere in the product (BVN, NIN, CAC, TIN) though not required for these 10 screens
specifically. Multi-currency (NGN/USDT/crypto) is real but secondary to Naira.

---

## 5. What "great UI" means for this ask

A first, functionally-correct pass of this concept already exists internally — this brief is for **exploring
better visual craft on top of the same locked content/flow**, not proposing a different flow. Push on: visual
hierarchy and information density in the two-column Action Hub, how confidently the mode switcher reads as a
persistent, always-legible piece of chrome, how the modal-triggered order form (a genuinely long form — ~15
fields) can feel fast rather than overwhelming inside a modal, and how the empty-state columns (screens 6/7)
can feel like an invitation rather than a dead end. Avoid generic "AI slop" patterns — no ungrounded gradients,
no flat-color placeholder icons treated as final, no arbitrary shadow/blur for its own sake; every visual
choice should trace back to the token system above.
