# Kwikpik B2B Module — UX/Product Context (from Figma)

**Source:** Figma file "Kwikpik Web3" (`bppFxXazAscyLv3FZvzBf6`), section "Kwikpik B2B Module" (node `5253:14241`, under canvas `5233:13277`).
**Method:** Read-only study via Figma MCP — full node-tree metadata (166 top-level screen/state frames across 7 flow rows) parsed for structure, hierarchy and all visible text content, cross-checked against 2 rendered screenshots (main Dashboard Overview, Payment Widget checkout modal). No write access was used or needed.
**Legend:** **Observed** = directly present in the file (layer names, text content, visible structure). **Inferred** = a reasonable reading of intent from layout/naming/state sequencing, not literally stated. **Unknown** = the design does not establish this; not invented here.

This is a companion, standalone document to a separate live-product audit of the logistics partner portal (`logistics.kwikpik.io`). The two are **not merged** — the B2B module described here is Kwikpik's payments/wallet product for a business (a "partner"/merchant such as "Sippy Life"), not the logistics operations portal. **Observed**: they share the same top-level `kwikpik` brand and appear to be sibling products, not the same app — the logistics portal's left nav (Dashboard/Orders/Packages/Returns/Wallet/Invoices/Exports/Settings) is a different information architecture from the B2B module's (Overview/Transactions/Payment Links/Customers/Settings). **Unknown**: whether the two products share a login/session, a company account, or are fully independent codebases.

---

## 1. Information architecture & navigation

**Observed** — primary desktop sidebar (left nav), consistent across almost every screen once onboarding/KYC is complete:
- Business switcher at top: circular avatar + business name ("SL" / "Sippy Life") + chevron — **Inferred**: supports multiple businesses per login, i.e. a user can belong to/switch between more than one merchant account.
- **Action Hub** — appears only on the very first (empty/unverified) dashboard state, then disappears once the account has activity. **Inferred**: a first-run "things to do" hub, replaced by Overview once there's real data.
- **Overview** (renamed "Dashboard" internally in some frames — layer name inconsistency, see §9)
- **Transactions**
- **Payouts** — present as a nav item in several early frames but **absent** in most later ones; in one frame set it's replaced by **Assets**. **Unknown/Inferred**: Payouts and Assets may be the same nav slot renamed/reordered across design iterations rather than two permanent items — flagged as a real inconsistency, not a confirmed dual feature (see §9).
- **Payment Links**
- **Customers**
- **Settings** (gear icon, pinned at the bottom of the sidebar, separated from the rest)

**Observed** — global top bar: search field, notification bell (with unread badge in some frames), user avatar/profile menu (top right).

**Observed** — every desktop frame (1440×820) has a corresponding **mobile "Home"/"All Assets" frame** (360×~800-1600) with the same content re-flowed vertically and a hamburger `menu` icon replacing the sidebar. **Inferred**: the product is designed responsive/mobile-web first-class, not just desktop — every major flow (onboarding, dashboard, transactions, payment links, customers, settings, checkout widget) has a dedicated mobile layout, not just a generic "mobile breakpoint."

---

## 2. Getting Started / Onboarding journey

**Observed** sequence (desktop "Onboarding" frames + mirrored mobile "Sign up" frames), in this order:
1. **Create your business account** — email/password-style sign-up form ("Label", "Text", "Hint text" placeholders — literal field labels not resolved in metadata, see §9) + "Have an account? Sign in" link.
2. **Confirm Email** — 6-digit-style code entry, "The code has been sent to [email]... Resend code in 2:00" countdown.
3. **Tell us about your business** — radio choice: **"Not registered"** ("Not yet formally registered with CAC") vs **"Registered entity"** ("Officially registered business with required documentation."). **Observed**: CAC = Nigeria's Corporate Affairs Commission — this is a Nigeria-specific business registration flow.
4. Lands on the **Dashboard**, gated by a **KYC/verification progress model**:

**Observed** — a persistent "Verify Account" banner/card with a percentage badge that increments as steps complete: **0% → 10% → 20% → 25% → 50% → 90%/100%** appear as distinct frames, each unlocking the next requirement. Observed checklist items, in the order they appear:
   - **Basic Profile Completion**
   - **Verify your BVN** — modal: "Please provide your date of birth and BVN (must match the account name: [Name]). Change Name" with a warning: "Once BVN is set, the name can't be changed."
   - **Proof of Identity (Government-Issued ID)** — document upload ("Upload a valid government-issued ID.")
   - **Bank Account Details**
   - **Residential address** — "Confirm your address with a recent utility bill or bank statement."
   - Terminal state: **"Identity Verified — Your documents have been successfully verified and you can access all the features of the platform."**

**Inferred**: the percentage is a weighted completion score across these 5 checklist items rather than a simple 1/5 count (jumps are uneven: 0→10→20→25→50→90/100), and each unverified feature area is **gated** ("Verify Account to unlock") until some threshold is met — the dashboard itself is browsable pre-verification but shows zeroed/placeholder stats.

**Observed**, separately: a **"90 / 90 days left access"** tooltip/badge appears on some nav-header frames (also seen as "10 / 90 days left access" in a later frame). **Inferred**: a trial or provisional-access countdown, independent of the KYC checklist — **Unknown** whether this is a trial period before mandatory full KYC, a compliance grace period, or something else; the design does not explain what happens at day 0 or whether it's tied to transaction volume/value thresholds.

**Observed**: KYC tiers 25% and 50% correspond to different unlocked capabilities in the "All Assets" companion frames — at 25% only "Verify BVN" is active; at 50% "Proof of Identity" + "Proof of Address" become the active step. **Inferred**: this is a tiered KYC model similar to the consumer Kwikpik app's KYC tiers (per existing project memory of the Kwikpik product), reapplied to the B2B/merchant context.

---

## 3. Dashboard Overview

**Observed** components on the main Overview screen (confirmed visually via screenshot):
- **Wallet Balance** card — multi-currency indicator (three small circular icons next to the label, colored green/purple/orange — **Inferred**: NGN, USDT/stablecoin, and BTC or another crypto asset, consistent with the "Assets"/"Receive USDT" and "Swap" flows found elsewhere) showing one blended Naira value (`₦10,000,898.59`).
- Three action buttons beside the balance: **Fund**, **Transfer**, **Swap**.
- Three stat tiles: **Transactions Made** (count, with an external-link-style icon — **Inferred** links to Transactions page filtered), **Avg Transaction Value**, **Next Payout** (countdown `11h : 38m` style — **Inferred** implies a scheduled/rolling payout cadence, not on-demand only).
- **Success Rate** widget — donut chart (Successful vs Processing Error), tabbed against **Payment Issues** (same widget, second tab) which breaks failures down further: "Customer Error", "Fraud Blocks", "Bank Error", "System Error" (from the separate "Card" frame `5620:11285`). **Inferred**: this second tab is a click-through/expand from "Payment Issues", not a separate page.
- **Revenue** chart — bar chart by date with a "Last 30 days" range dropdown and a hover tooltip showing exact value per day; a delta badge ("↑ 12% vs prev 30 days") next to the total.

### Fund / Transfer / Swap sub-flows (all Observed as modal/drawer overlays on the Dashboard)
- **Fund**: "Fund Details" — shows Bank / Account Name / Account No for the merchant to send money into their own wallet (a receive/deposit flow, not a form).
- **Transfer**: **Single Transfer** vs **Multi Transfer** choice. Multi Transfer → **Recipients**: "Upload via CSV or Excel" (with a downloadable template) **or** "Add Manually" (repeatable Recipient 1/2/3... rows, each removable via a trash icon). **Inferred**: bulk payout to many recipients at once, aimed at business use cases like payroll or vendor payouts.
- Confirmation state: **"Transfer Initiated — Your bulk transfer has been initiated and could take 2-5 mins to be completed, check your transactions page for status."**
- **Swap**: currency conversion, e.g. NGN → BTC. Fields: "You pay" (amount + currency picker, shows available balance + "Max" shortcut), "You receive" (computed). Review step shows amount, destination currency amount, exchange **Rate**, and **Fees**. Terminal state: **"Swap Successful! — Your converted [X] BTC has been transfer to your wallet."** (typo "transfer" for "transferred" — **Observed**, a content bug worth flagging to design/copy).

---

## 4. Transactions

**Observed**: a filterable/tabbed **Transaction History** table (component instances: `Tab`, `Table cell`, `Search Web`) — tab labels not resolved in metadata (generic "Header"/"Text" placeholders throughout the table, see §9), but the detail drawer confirms the underlying data model.

**Transaction Details drawer** (right-side "All Assets" panel, Observed):
- Top: direction ("Received"), a status badge (**Success** / **Abandoned** seen as two distinct states), amount, timestamp.
- Two tabs: **Details** and **Analytics**.
  - Details: Transaction ID, From (payer name), Channel (e.g. "Bank Transfer"), Fees, Date. For pending/failed ones: a **Message** field ("Awaiting Transfer") instead of Fees.
  - Analytics: Bank Name, Authorization code, IP Address, Country, Transaction Duration, Device Type, Attempts count, Errors count. **Inferred**: this is fraud/ops-facing diagnostic data, likely not shown to a non-admin merchant role — **Unknown** whether all merchant users see the Analytics tab or if it's permission-gated.
- "Need help? Contact us" link at the bottom of every transaction detail — **Inferred**: routes to support, present on essentially every terminal/detail state across the product (also seen on payment widget error states).

**Observed** — a separate **Assets** sub-area (replaces "Transactions" in the nav on some frames — see §9 inconsistency) covering **crypto asset management**:
- "Receive USDT" — network picker: **ERC20 (Ethereum), TRC20 (Tron), BEP20 (Binance Smart Chain), Arbitrum One, Solana, Polygon POS, Optimism.**
- Selecting a network shows a **Deposit Address** (e.g. a Solana address) with copy action. **Inferred**: standard "generate a deposit address per chain" crypto receive flow.
- **"Set USDT as default settlement currency — All payments you receive will be settled in USDT unless you change this later."** **Inferred**: this is the same setting surfaced again in Settings → Preferences → "Settlement Asset" (§7); it can apparently also be set contextually from the Assets/receive screen.

---

## 5. Payment Links

**Observed** states, in flow order:
1. **Empty state**: "No Active Payment Link — You can tap the button below to create a payment link and send to customers", with zeroed stats (Total Payments / Total Customers / Usage Times).
2. **List view**: table of links, each row with **Share** and **Details** quick actions, plus running totals (e.g. `₦12,000.45` / 18 payments / 50 customers).
3. **Create flow** (modal/drawer, "Payment Link / Create" breadcrumb):
   - Fields: Label/name, description Text, image upload ("Drag file here or click to upload"), a **Toggle**: "Allow customers to set price" (**Inferred**: open-amount vs fixed-price link), and an **"Advanced Settings"** expandable section revealing a further Toggle: **"Collect Phone Number."**
   - Live **Preview** pane alongside the form shows the resulting public page: business avatar, "Page Name", "Pay ₦[amount]", "Powered by kwikpik", and the shareable URL pattern **`paylink.kwikpik.io`** (**Observed** literal domain string — a subdomain distinct from the main app and from `logistics.kwikpik.io`).
   - Success state: **"Paylink Created — You can share to your customers, friends and partners to start receiving payments from them."**
4. **Paylink Details drawer**: Status (e.g. "Active"), link name/date, a **Transactions** tab listing payers against that specific link (avatar-initials, name, email, amount, date) and a **Details** tab.
5. A **Kebab-Horizontal** (⋯) menu on the details drawer — **Inferred** likely holds Edit/Deactivate/Delete actions for the link, but the specific menu items are **Unknown** (not expanded in any captured frame).

**Inferred** overall: Payment Links is Kwikpik's "payment button"/lightweight-invoicing product — a merchant-generated shareable page for one-off or repeatable collection, functioning much like the Payment Widget (§8) but link-distributed rather than embedded.

---

## 6. Customers

**Observed**:
- Empty state: "No Customer Yet — All your customers once a purchase or payment is made would show up here." **Inferred**: customers are **derived automatically** from payment activity — there is no visible standalone "create customer" flow on desktop; a "Details" action per row opens the drawer, and mobile alone shows an **"Add Customer"** form (Label/Text fields, not fully resolved) — **Inferred**: manual customer creation may be a mobile/secondary-priority feature, or that frame is an in-progress/exploratory addition — flagged as uncertain, not a confirmed cross-platform feature.
- **Customer Details drawer**: name, "member since" date, **Transactions** tab (list of that customer's payments — mixed channels observed: "Card Payment" and **"Crypto Payment (~0.00098 BTC)"**, confirming customers can pay in crypto directly, not just fiat) and a **Details** tab (Email, an internal ID like `CUS_ka23wmhtugl58ow`, Phone Number with an "Add Phone Number" affordance if missing).

---

## 7. Settings

**Observed** — five tabs, all sharing one settings shell:

1. **Personal Details** — "Manage and view your personal information": basic profile fields (labels unresolved).
2. **Password & Security**:
   - "2FA Disabled" status line + **Security Preference**.
   - **Transaction PIN**: "Change" action → **Change PIN** (old/new/confirm-style fields) and a separate **Forgot PIN** ("Enter your account password to confirm ownership") → **Set New PIN** ("Create a PIN that's secure but easy for you to remember.").
   - **Enable Two-Factor Authentication** → confirmation ("2FA has been enabled") → **10 backup codes** displayed (e.g. `q41uei7g2y`) with "Download and store these backup codes somewhere safe." → **Disable Two-Factor Authentication** requires **either** an Auth Code **or** a Backup Code to confirm.
3. **Business Details** — "Manage your business profile and documents, and keep your information accurate and verifiable.": business logo upload (PNG/JPEG, 5MB limit), **Supporting Documents & Verification** section listing: a named document (e.g. "SCMUL" — **Inferred** likely a company/registration document type abbreviation, exact meaning **Unknown**), **BVNs of shareholders with over 5% ownership** (multi-entry, shown as a count e.g. "3"), **CAC Document**, **TIN Number** (Tax Identification Number) with an edit action once filled, and a separate **"Enter BVN & NIN"** add-new flow. **Inferred**: this is the fuller KYB (Know-Your-Business) documentation set, distinct from and more thorough than the lightweight onboarding-time KYC checklist in §2 — **Unknown** whether completing this is mandatory or optional once initial onboarding KYC is done, and whether it's what unlocks the 90%/100% tier.
4. **API & Webhook**:
   - **API Keys** — "Manage your test and live API keys," with explicit **Live**/**Test** environment toggle — **Observed** twice (once per sub-section), **Inferred** the same Live/Test split applies independently to both keys and webhooks.
   - **Webhooks** — empty state "No Webhook Created," a **Create Webhook** flow, and two named webhook event examples: **"Payment Failed"** and **"Payment Success."** **Inferred**: these are two (of possibly more) webhook event types the platform can fire — directly relevant groundwork for a future notification system, since it implies the platform already has a payment-success/payment-failed event taxonomy at the API level.
   - A help line: "Need help with integration check out our API documentation or email us at **docs@kwikpik.io**."
5. **Preferences** — "Control fees, settlement preferences, and payment options.":
   - **Settlement Asset**: Naira (NGN) / USDT / BTC — which currency the merchant is paid out in regardless of how the customer paid (ties to §4's Assets settlement setting).
   - **Transaction Fees**: "Who should be charged for every checkout transaction" — **Charge my customers** vs **Charge me**.
   - **Payment method preference**: "What payment method(s) should be available to all your customers" — **All Methods** / **Transfer** / **Card** / **USSD** (checkboxes — **Inferred** multi-select, since it's a set of payment rails not a single choice; notably **Crypto is absent from this checkbox list** even though Crypto is a live payment method in the widget itself — **Unknown**/flagged inconsistency, see §9).
   - **Transaction receipts**: "Who should receive the receipts sent for all transactions" — **Send to my customers** vs **Send to me**. **Inferred**: directly relevant to notification-system design — this is an existing merchant-level notification preference/routing control.

---

## 8. Payment Widget (embeddable checkout)

**Observed** (confirmed visually) — a **modal checkout widget** branded per-merchant (merchant's own name/logo, e.g. "Sippy" with a purple avatar) with **"Powered by kwikpik"** footer branding, presented as an overlay. **Inferred from layout only**: in the live product this widget is embedded on the *merchant's own site or the Payment Link page* (§5), not literally floating over the Kwikpik dashboard — the Figma frames place it over the Dashboard purely as a design-file convenience/context mockup. **Unknown**: the exact host surface(s) — could be the paylink.kwikpik.io page, a merchant's own checkout page via embed/iframe/SDK, or both.

**Observed** payment method tabs inside the widget: **Transfer, Crypto, Card, USSD** (left rail inside the modal, icon + label each).

**Observed** state sequence:
- **Transfer**: shows Amount, Account Number, Account Name, Bank, each with a copy icon, plus an "Expires in 12:00" countdown and instruction "Transfer the exact amount... Don't refresh the page until payment is confirmed," and a manual confirmation button **"I Have Sent The Money."**
- → **Verifying Payment**: "We are checking to see if your payment has dropped, this should take a few seconds if paid."
- → either **Payment Successful** ("Your payment has been confirmed and processed successfully.") **or** **"Payment couldn't be verified"** ("Please try again or contact support@kwikpik.io if you were debited.").
- **Card**: "Enter your card details to pay" (form not fully detailed in metadata).
- **USSD**: bank picker ("Select your bank to get the USSD Code") → dial code shown (e.g. `*329*000*5118#`) with its own "Expires in 04:00" countdown.
- **Crypto**: "Select crypto asset and network to pay with" (asset/network picker, echoing the same multi-chain list pattern as §4's Assets/Receive).

**Inferred**: every payment method converges on the same three terminal states (Verifying → Success / Failure), meaning a notification system could likely hook one shared "payment status changed" event regardless of the rail used.

---

## 9. Cross-cutting UX patterns, inconsistencies, and design-system notes

- **Consistent shell**: nearly every desktop frame repeats the full sidebar + topbar + a right-side "Verify Account"/KYC card, even on screens where it's arguably irrelevant (e.g. deep inside Settings). **Inferred**: this is very likely just how the designer duplicated frames as a starting point for each new screen (common Figma workflow), not necessarily meant to literally persist everywhere in the shipped product — but it does show the **KYC nagging card is designed to be persistent/global** until resolved.
- **Naming inconsistency, Observed**: top-level screen frames are inconsistently named "Dashboard" vs their actual content ("Settings", "Transactions", "Payment Link" create screen, etc. are all literally layer-named "Dashboard"). This is a Figma file-hygiene issue, not a product behavior — noted so it isn't mistaken for the product having one single "Dashboard" route.
- **Nav item inconsistency, Observed**: "Payouts" and "Assets" both appear as a 5th sidebar item in different frames, never together, alongside "Overview / Transactions / Payment Links / Customers." This reads as **two design iterations of the same nav slot**, not two confirmed simultaneous nav items — **Unknown** which (if either) is current, and whether "Payouts" as a concept (scheduled/next-payout, seen in the Overview stat tile) is meant to be its own page or just the stat tile.
- **Crypto is a first-class rail but inconsistently surfaced**: full crypto support appears in the wallet (Swap), receive/assets (multi-chain deposit addresses), the checkout widget (Crypto tab), and customer payment history ("Crypto Payment") — but the Preferences → "Payment method preference" checklist only lists Transfer/Card/USSD/All Methods, omitting Crypto. **Flagged as Unknown**: whether crypto is meant to always be available regardless of that preference, or the preference list is simply out of date with the rest of the product.
- **Placeholder/unresolved copy, Observed**: many form fields across onboarding, payment-link creation, and settings render as generic "Label"/"Text"/"Hint text" rather than resolved field names — these are almost certainly bound to a shared form-field/Textfield component whose actual placeholder copy is set per-instance in a way this metadata-only pass couldn't resolve without opening each instance individually. Treat exact field names in unresolved areas as **Unknown**, not absent.
- **Shared component vocabulary, Observed** (instance names appearing repeatedly, suggesting a mature internal component library consistent with the design-system docs already in this repo under `docs/design-system/`): `Button`, `Textfield`, `Toggle`, `Radio Button`, `checkbox`, `Badges`, `Tooltip`, `Tab`, `Table cell`, `Search Web`, `Kebab-Horizontal`, plus a large shared icon set (`chart-2`, `money-send`, `money-recive`, `transaction-minus`, `profile-2user`, `setting-2`, `link`, `notification`, `eye`, `close`, `tick-circle`, `document-text`, `document-upload`, `card`, `hashtag-up`, `mail`, `location`, `user-square`, `wallet`, `copy`, `share-2`, `add-circle`, `trash`, `edit-2`, `chevron-down`, `arrow-left`, `menu`). **Inferred**: this B2B module reuses the same icon/component system as the rest of the Kwikpik Web3 file rather than inventing a parallel one — worth reusing exact component names if this context feeds into a code-connect or implementation pass later.
- **Currency/locale**: every amount is Naira-first (`₦`) with Nigeria-specific identity concepts (BVN, NIN, CAC) — **Observed** this is built for the Nigerian market specifically, with crypto/multi-chain as an add-on rail rather than the primary currency model.

---

## 10. Entity/relationship summary (Inferred data model)

- **Business/Merchant account** (1) → has one **Wallet** (multi-asset: NGN + crypto) → has many **Transactions** (in/out, any rail) → each Transaction may link to a **Customer** (auto-created from payment activity) and/or a **Payment Link** (if that was the collection method).
- **Payment Link** (1) → can be paid by many **Customers**, each payment producing a **Transaction**.
- **Payment Widget checkout** → produces exactly one **Transaction**, method-agnostic (Transfer/Card/USSD/Crypto), always resolving to Success or Failure.
- **Business** → has one **KYC/verification state** (percentage + checklist) gating dashboard features, separate from a **Business Details/KYB document set** (Settings) that appears to be a deeper, possibly-optional-after-onboarding layer.
- **Webhooks** (Settings → API & Webhook) → **Inferred** subscribe to at least `payment.success` / `payment.failed`-style events at the account level — the closest existing analog to a notification system already in the product, just API-facing rather than user-facing.
- **Transaction receipts preference** (Settings → Preferences) is the one existing **user-facing notification routing control** found in the whole module — worth anchoring a new notification system's "who gets notified about what" design against this existing pattern rather than inventing a parallel one.

---

## 11. Open questions flagged as Unknown (relevant to a future notification system)

1. Whether webhook events (`Payment Failed` / `Payment Success`) are the complete event taxonomy, or just the two examples shown in an empty-state mock.
2. Whether in-app notifications (the bell icon, seen with an unread badge in some frames) are currently used for anything beyond payment status — no notification center/list/panel content was found in any captured frame, only the icon itself.
3. Whether the "90/90 days left access" badge has its own reminder/expiry notifications, and what "days left access" actually restricts.
4. Who besides the primary account owner receives notifications — no team/multi-user-role screens were found (Settings has no "Team Members" or "Roles" tab), so it's unclear whether notification routing needs to support multiple recipients per business or just one owner.
5. Whether Crypto payments trigger different/slower notification timing than fiat rails, given Swap/crypto confirmations reference on-chain-style waiting states.
