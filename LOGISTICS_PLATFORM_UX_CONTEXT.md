# Kwikpik Logistics Partner Portal — UX Context

Source: https://logistics.kwikpik.io/partner/dashboard, audited live in-browser, authenticated as
"Aiseosa Uyi-Idahor" / account "Sippy Life" (Partner Portal).

**Account state note:** this partner account has zero historical data (0 orders, 0 packages, 0
invoices, etc.) at audit time. This means most of what follows documents empty states, static
chrome, and whatever data-entry/forms are reachable — not live data relationships, which could not
be directly observed and are marked accordingly.

Legend: **Observed** = seen directly in the running app. **Inferred** = implied by copy/labels but
not directly exercised. **Unknown** = not established, not guessed.

---

## Global navigation & layout

**Observed.** Left sidebar, fixed, collapsible (chevron button top-right of sidebar header).
Header reads "Kwikpik" with "PARTNER PORTAL" as a section label beneath it. Nav items (in order):

- Dashboard — `/partner/dashboard`
- Orders — `/partner/orders`
- Packages — `/partner/packages`
- Returns — `/partner/returns`
- Wallet — `/partner/wallet`
- Invoices — `/partner/invoices`
- Exports — `/partner/exports`
- Settings — `/partner/settings`

Footer of sidebar shows the account/org name ("Sippy Life") — implies the portal is
organization-scoped (a partner = a business account), with the logged-in person as a
member/operator of that org. Top-right of the content area has a global search box
(placeholder "Search...") and what look like a notification bell and a user/account menu button
(two icon buttons next to search, not yet opened — see Settings section for follow-up).

All main sections above are visited below in turn.

**Observed — notification bell is a dead affordance, but now explained.** The bell icon (top-right,
next to search) shows a red "unread" dot, but clicking it does nothing: no dropdown, no navigation,
no network call, no state change. Settings → Notifications (see below) clarifies why: notifications
in this app are **browser push notifications**, not an in-app notification center/inbox. The bell
is likely just a static status glyph (or a half-wired affordance) rather than a real dropdown
trigger — there is no in-app notification list anywhere in the product. Worth flagging to the
product owner either way: the red dot visually promises unread items that don't exist anywhere
reachable in the UI.

**Observed — account menu.** Clicking the avatar ("P" initial) opens a small menu: the account
email is shown twice in a row (as both "name" and "email" line — no separate display name is set,
so it reads as a duplicate), then "Profile" and "Log out" links.

---

## Orders — list, filters, and creation

**Observed.** `/partner/orders` = "My Orders" list. Header: "Create Order" button (top right).
Filter bar: **All Statuses** dropdown, **From** / **To** date-time pickers. Table columns: Order
Code, Ref, Packages, Mode, Status, Total, Created. Empty state text: "No orders found." The
"Orders" card header shows a live count badge (`0`) next to the section title.

**Order status values** (from the status filter dropdown) — this is the full order lifecycle:
`Pending → Processing → Dispatched → Completed`, with `Cancelled` as a terminal off-path state.

### Create Order (`/partner/orders/new`)

**Observed.** Three parallel input modes for the same underlying "create order" action, as tabs:
**Form**, **JSON**, **CSV**. This is a clear power-user/bulk-shipper affordance — this portal is
built for partners who ship many packages per order, not just one-off consumer-style orders.

- **Form tab** — two sections:
  - *Pickup Details*: Delivery Mode (`Offline` / `Online` — see finding below), Pickup Address*,
    Contact Name*, Contact Phone*, Contact Email, Vehicle Type (`Motorcycle` default / `Bicycle` /
    `Bike` / `Car` / `Van`), Drop-off HUB (optional, searchable combobox — see finding below),
    Pickup Notes.
  - *Packages* (repeatable via "Add Package"): Package Number*, Recipient Name*, Recipient Phone*,
    Recipient Email, Destination Area (dropdown of all 36 Nigerian states + FCT — copy: "Selecting
    an area guarantees accurate pricing. Leave empty to let the system determine the pricing." —
    i.e. pricing is state/zone-based and the system will attempt geocoding-based pricing as a
    fallback), Delivery Address*, Delivery Timeline (`Same Day` default / `Next Day` / `Beyond Next
    Day`), Weight (kg), Quantity. An expandable "Show optional fields" reveals: Description,
    Package Size (`Small`/`Medium` default/`Large`/`Extra Large`), Package Value, a per-package
    "Insure this package" checkbox, Delivery Notes, and raw Latitude/Longitude fields (manual
    precise-geocoding override).
  - Order-level footer checkbox: **"Insure every package in this order"** — "Adds a goods-in-transit
    premium of **1% of the declared package value** (max claim **NGN 8,000,000**). Individual
    packages can override this above." This is real, visible pricing/insurance business logic:
    insurance is opt-in, percentage-based on declared value, capped, and overridable per line item.
  - **Finding:** switching Delivery Mode from `Offline` to `Online` produces **no visible change**
    to the form — no new/hidden fields, no different validation. Either the distinction is
    backend-only (e.g. affects which pricing engine or dispatch queue is used), or it's an
    unfinished/vestigial control. Worth asking the product owner what "Online" mode is supposed to
    surface.
  - **Finding — cross-partner data exposure in Drop-off HUB picker.** The "Drop-off HUB" combobox
    ("Choose the Kwikpik office that will receive and process these packages") loads a long,
    scrollable, searchable list of **other partner companies' depots** — e.g. "3TWELVE NIGERIA
    LIMITED Depot", "ADES Logistics Express Depot", "AGASCO LOGISTICS Depot", "Alabigs services
    Nigeria Ltd Depot", "Amani Logistics Depot", "DREAMWORKS GLOBAL LOGISTICS Depot", "Double D
    Logistics Depot" (with area label "Alimosho"), each with a `DEPOT-XXXXXXXX` code — dozens of
    entries, likely the full partner network, not just official "Kwikpik office" hubs despite the
    field's own helper copy. This means any authenticated partner can see the names (and inferred
    existence/location) of every other partner business on the platform. This reads as an
    inter-partner hub-and-spoke handoff network (partners can hand off packages at each other's
    depots), which is a real and interesting product mechanic — but the copy undersells it ("Kwikpik
    office") and the visibility of competitor business names to any partner is worth flagging to
    the product/security owner as a B2B data-exposure question, not just a copy nit.

- **JSON tab** — "Paste or upload a JSON order to create it in one shot." Has "Load Sample" (fills
  the textarea with a working example) and "Upload File". The sample reveals the underlying order
  schema directly:
  ```json
  {
    "deliveryMode": "OFFLINE",
    "pickupAddress": "Partner Warehouse, Lagos",
    "pickupContactName": "Warehouse Manager",
    "pickupContactPhone": "+2348012345678",
    "vehicleType": "MOTORCYCLE",
    "packages": [
      {
        "merchantPackageNumber": "PKG-001",
        "deliveryAddress": "123 Delivery Street, Lagos",
        "deliveryContactName": "John Doe",
        "deliveryContactPhone": "+2348087654321",
        "description": "Sample package",
        "packageSize": "MEDIUM",
        "packageWeightInKg": 2,
        "quantity": 1,
        "deliveryTimeline": "SAME_DAY"
      }
    ]
  }
  ```
  Confirms "one order → many packages" is the core data model, and that `merchantPackageNumber` is
  the partner's own reference (vs. an internal Kwikpik package ID assigned after creation).

- **CSV tab** — "Upload a CSV of packages. Your profile is used for pickup details so rows only
  need delivery info." Has "Load Template" / "Download Template" / "Upload File" and a
  "Preview & Create Order" action (implies a review step before committing, unlike Form/JSON which
  go straight to "Create Order"). Copy notes: "First row is headers. All rows are grouped into a
  single order with multiple packages. Area / region / axis columns are auto-detected as
  destinationArea for accurate pricing." — this is the true bulk-shipper path: pickup info comes
  from the partner's saved profile, not re-entered per upload.

**Inferred relationship:** Order → 1..N Packages is the core entity relationship for this whole
module; Packages likely drive Invoices (cost) and Wallet (funding/deduction), and both Packages and
Orders likely feed Exports. Could not directly confirm the Package/Wallet/Invoice linkage since the
account has zero historical orders — see Packages/Wallet/Invoices sections and Open Questions below.

**Observed — form validation.** Submitting the Form tab empty produces per-field inline red error
text under every required field simultaneously (not one-at-a-time), auto-scrolls the page to the
first invalid field, and keeps all previously entered values intact. No toast/banner, no native
`alert()` — errors are inline only. This is a solid, non-blocking validation pattern.

---

## Packages

**Observed.** `/partner/packages` = "My Packages" — "Track all your packages." Filter bar: **All
Statuses**, **Any OTD outcome**, From/To date-time range, plus a dedicated free-text search box
("Search by tracking ID, merchant #, or address..."). Table columns: Tracking ID, Merchant #,
Delivery Address, Recipient, Status, Size, OTD, Expected Payment, Created. Empty state: "No
packages found."

**Package status enum** (full list, richer/more granular than the Order status enum — this is the
real operational state machine) — in dropdown order:
`PENDING, RECEIVED, AWAITING PICKUP, PICKED UP, IN TRANSIT, OUT FOR DELIVERY, DELIVERED, CANCELLED,
FAILED, DISPATCHED TO LOCATION, IN TRANSIT TO LOCATION, RECEIVED AT LOCATION, RETURN INITIATED,
RETURN IN TRANSIT, RETURNED TO LOCATION, HANDED TO COURIER, WITH COURIER`.

**Data-relationship confirmation:** the "...TO LOCATION" statuses (`DISPATCHED TO LOCATION`,
`IN TRANSIT TO LOCATION`, `RECEIVED AT LOCATION`) directly corroborate the Drop-off HUB /
inter-partner depot network found in Order creation — a package's lifecycle can explicitly route
through a partner depot/hub as an intermediate leg, separate from being `HANDED TO COURIER` /
`WITH COURIER` for final-mile delivery. And `RETURN INITIATED → RETURN IN TRANSIT → RETURNED TO
LOCATION` shows Returns is not a separate data silo — it's expressed as states of the same Package
entity, tracked in the same table this page shows.

**"OTD" = On-Time Delivery**, and it's a first-class filterable/measurable dimension, not just a
status. Outcome filter options: `Any OTD outcome`, `Exceeded OTD (any lateness)`, `Delivered on
time`, `Delivered 1 day late`, `Delivered 2+ days late`, `Not delivered`, `Past OTD window, still
undelivered`, `Due for delivery today`, `Not measurable`. This is a genuine SLA/carrier-performance
feature — the portal isn't just tracking, it's grading delivery performance against an expected
window, which is meaningful for a partner deciding whether Kwikpik logistics is hitting its
promises.

**"Expected Payment" column** — a package-level monetary field distinct from an Order's "Total"
column on the Orders page. Could not populate/inspect an actual value (no data), but the existence
of a per-package expected-payment figure alongside per-order total suggests either (a) COD
(cash-on-delivery) amount collected from the recipient, or (b) the partner's expected payout/cost
per package. Flagged as an **open question** — terminology isn't self-explanatory and no tooltip
was present.

---

## Returns

**Observed.** `/partner/returns` — subtitle is unusually precise and worth quoting verbatim:
"Failed deliveries, in-flight RTOs, and merchant handovers." This immediately tells you Returns is
**not** a partner-initiated "request a return" workflow — it's an ops/triage *view* over Package
records that have entered a failure/reverse-logistics path. There is no "create return" action
anywhere on this page, which confirms that.

Segmented tab bar with live counts (all `0` currently): **All, Failed, RTO pending, In transit, At
return hub, At origin hub, Completed**. "RTO" = Return To Origin — i.e. the package is being sent
back to the partner's pickup location after a failed delivery, and it transits through hub
infrastructure (return hub / origin hub) on the way, consistent with the "...TO LOCATION" statuses
seen on the Packages page.

**"Find packages needing attention"** — a genuine ops triage tool, not just a filter:
- **In status**: `Any status / Failed / Return initiated / Returned to hub`
- **For at least (days)**: numeric input — surface packages stuck in a status for N+ days
- **"Attempts exhausted (needs return scan)"** checkbox — surfaces packages where delivery attempts
  are used up and someone needs to physically scan them into the return flow
- Helper copy explicitly explains a modeling limitation: "Statuses without a recorded transition
  time (in transit, out for delivery, with courier) are not listed — they can only be dated from
  the last update, which changes for unrelated reasons." This is unusually honest/transparent
  product copy — it's telling the partner *why* certain in-flight packages can't be aged/filtered
  reliably, rather than silently giving wrong answers.

Table columns: Tracking ID, Merchant Ref, Status, **Stage**, Attempts, Last Failure, **RTO
Reason**, Delivery To, Updated. "Stage" alongside "Status" implies a two-axis state model (e.g.
Status = coarse bucket like Failed/RTO pending, Stage = finer sub-step) — could not confirm exact
distinct values with zero data. "Attempts" confirms delivery attempts are counted and capped
(ties to the "Attempts exhausted" filter above). Empty state: "No returns yet."

---

## Wallet

**Observed.** `/partner/wallet` — this is a **prepaid wallet model**: partners fund a wallet via
bank transfer and (inferred) order/package costs and insurance premiums are debited from this
balance, rather than the platform billing the partner after the fact. This matches the Order
creation form's insurance premium language ("Adds a goods-in-transit premium of 1%...") reading
as a wallet debit, not a separate invoice line.

Header shows two status chips next to the page title: **`ACTIVE`** (account/wallet status) and
**`KYC: tier_2`** — confirms this logistics product uses the same tiered-KYC concept as the
Kwikpip Web3/wallet product (see project memory on KYC tiers), reused here for a different vertical.

- **Balance card**: Account ID (`sipp444876` — a short, human-typeable reference distinct from the
  UUID-style internal IDs likely used elsewhere), Available Balance (`₦0.00`), and a **Withdraw**
  button.
- **Virtual Account card**: "Transfer to this account to fund your wallet" — a dedicated bank
  account (Bank: Nombank MFB, Account Number: 7084273524, Account Name: "Kwikpik/Sippy Life") is
  provisioned per partner for direct bank-transfer top-ups. The account number has a copy-to-
  clipboard icon button next to it. This is a standard Nigerian fintech pattern (virtual/reserved
  bank account per merchant), reused from the wallet-product domain.
- **Transaction History card**: "Recent wallet transactions" — empty state "No transactions yet."
  No filters/date-range visible here (unlike Orders/Packages/Returns), which is inconsistent with
  the rest of the app's list patterns — worth checking with real data whether filters just don't
  render when the list is empty, or genuinely don't exist on this table.

**Observed — Withdraw flow is PIN-gated.** Clicking "Withdraw" does not open a withdrawal
amount/destination form directly. Since no withdrawal PIN exists yet on this account, it instead
opens a **"Set Withdrawal PIN"** modal ("Create a 4–6 digit PIN to authorize withdrawals.") with
New PIN / Confirm PIN fields and Cancel/Set PIN actions. This is a sensible extra security layer
for money-movement actions, separate from portal login. (Not completed — setting a real PIN is a
persistent account-security change and out of scope for a read-only audit; cancelled out cleanly.)
**Open question:** what the actual withdrawal form looks like once a PIN exists (destination
account picker? saved bank list? fee/timing disclosure?) is unverified.

---

## Invoices

**Observed.** `/partner/invoices` — simple list page: **All statuses** filter, table columns
Invoice / Status / Total / **Outstanding** / Issued / PDF (a per-row PDF download/view column).
Empty state: "No invoices yet." No "create invoice" affordance anywhere — invoices are clearly
system-generated (e.g. periodic billing runs), not partner-authored, unlike Orders.

**Invoice status lifecycle:** `Draft → Issued → Partially settled → Settled`, with `Cancelled` and
`Voided` as off-path terminal states.

**Relationship to Wallet:** the "Outstanding" column (separate from "Total") means invoices can
carry a balance-due state, i.e. **not every cost is prepaid out of the wallet** — there appears to
be a parallel post-paid/invoiced billing path alongside the prepaid wallet-debit path implied on
the Wallet page. Could not confirm with live data whether Invoices = "wallet couldn't cover it, so
it became a payable invoice" or a fully separate billing channel (e.g. monthly platform fees vs.
per-shipment wallet debits). Flagged as an **open question** for the product owner.

---

## Exports

**Observed.** `/partner/exports` — "Data Exports: Build and download Excel exports of partnership
data. Large exports are prepared in the background - you can leave this page and come back to
download when they're ready." Two-pane layout: **New export** builder (left) and **Your exports**
job list (right, empty: "No export jobs yet. Build one on the left to get started.").

This is a genuinely well-built ad hoc reporting tool, not just a "download CSV" button:

- **Dataset picker** — 5 export types, each with its own description and its own filter/field set:
  - **Orders** — "Every partner order with optional drill-down into packages, status history, and
    rider details."
  - **Packages**
  - **Rider Manifest** — "Packages assigned to a specific rider – the handoff-friendly view with
    recipient, address, and payment details." **Confirms Riders are a distinct tracked entity**
    (not just an opaque "courier" string) with per-rider package assignment. Requires a **Rider**
    filter (searchable "Select rider" combobox) — marked "Required filter: Rider", i.e. this export
    can't be run in aggregate, only per-rider.
  - **Transfers**
  - **Invoices**
- **Orders dataset filters**: From/To Date + Date Field selector (i.e. which date column to filter
  on), Delivery Mode, Vehicle, and three-state booleans **Dispatched / Paid / Completed /
  Cancelled** (`Any` / presumably Yes / No), plus free-text Currency and Order Code. The **Paid**
  filter is a second independent confirmation that Orders carry a payment/settlement state, tying
  back to the Wallet/Invoices open question above.
- **Rider Manifest dataset filters** exposes the package Status enum again, and here it includes
  **one status value not present in the Packages page's own status filter: `DELIVERY_PAUSED`.**
  This is a genuine **cross-page inconsistency** — the canonical package status list differs
  between the Packages list filter and the Exports status filter.
- **Fields tab** (per dataset) — a granular, grouped column picker with "All / None" bulk toggles
  and named groups. For Rider Manifest: *Identifiers* (Tracking ID, Merchant Package #, Order
  Code), *Status* (Status, Failure Reason), *Delivery* (Delivery Address, Recipient, Recipient
  Phone, Area, State), *Package* (Weight), *Timestamps* (Assigned At, Picked Up At, Delivered At,
  Failed At) — plus an optional **"Status History" drill-down** section (toggle-able per export)
  with its own groups: Status/Previous Status, Location/Address, **Audit → Triggered By**, and
  Timestamps → At. The "Triggered By" audit field is notable: it means the platform tracks *who or
  what* caused each status transition, and partners can export that audit trail.
- **Export name (optional)** field lets partners label saved export jobs (e.g. placeholder "August
  orders - Q2 partners") — implies exports are named, listed, and presumably re-downloadable/
  re-runnable artifacts, not one-shot ephemeral downloads.

---

## Settings

**Observed.** `/partner/settings` — page header shows the logged-in person's name + email (not the
org), then five tabs: **Profile, Payment, Notifications, API Keys, Team**.

- **Profile tab**: *Company Details* card (email, phone `+2348065502317`, address "Dawaki Modern
  Plaza, Abuja, FCT", "Member since Aug 22, 2026, 01:18 PM"). *Account Status* card: Status
  `ACTIVE`, **Delivery Mode: `OFFLINE`** (account-level, matches the default in the Create Order
  form — confirms Delivery Mode is a real account-wide setting, likely toggled by Kwikpik once a
  partner is integrated via API), Activated date. A standalone **Change Password** card/button.

- **Payment tab — "Rider Payout Share."** This is the single most important business-model finding
  in this audit. Copy: "For every successfully delivered package your team handles, **you receive
  a per-package payout**. Optionally redirect a portion of that payout to the rider that completed
  the delivery — the remainder lands in your wallet." Shows "Partner payout (set by admin): Not
  configured" and "Your net per package: —", with a warning: "Your admin has not configured a
  per-delivery payout for your account yet. Contact support if you expect to receive payouts for
  deliveries." Below that, a **Rider share per delivery** amount field ("Set to 0 to keep the full
  payout in your wallet.").
  - **This reframes the whole product.** Partners are not purely shippers paying Kwikpik to deliver
    their own goods — a partner can *also* be a fulfillment/delivery operator with their own rider
    fleet, who gets **paid per successful delivery** by Kwikpik (payout amount set per-partner by a
    Kwikpik admin), and who can then split part of that payout to the specific rider who did the
    job. Combined with the Drop-off HUB depot network (Orders section) and the package
    "...TO LOCATION" statuses (Packages section) and **Transfers** (Team roles / Exports dataset,
    below), this confirms **Kwikpik Logistics is a multi-partner hub-and-spoke marketplace
    network**: partners can ship through it (debiting their wallet) *and* fulfill deliveries for
    the network using their own riders (crediting their wallet via payouts) — the same portal, same
    account, two roles. That is a materially different mental model than "one partner = one
    shipper using Kwikpik as their courier," and should shape how any downstream notification
    system frames what a "partner" is (a partner cares about both outgoing shipment events *and*
    incoming delivery-job/payout events).

- **Notifications tab**: only a single "Push notifications" card — "Get notified in this browser
  when new orders are placed and for operational alerts," currently "Not enabled on this device,"
  with an **Enable** button (browser Push API permission prompt, presumably — not tested further to
  avoid triggering a native browser permission dialog). No email/SMS notification toggles, no
  notification-type granularity (e.g. can't opt out of "new order" pushes while keeping "delivery
  failed" pushes) — this is a **thin/single-channel notification system today**, useful context
  for scoping the future notification system this audit is feeding into.

- **API Keys tab**: "Manage your API keys for integrating with the Kwikpik platform. Keep your keys
  secret." Empty state + **Generate API Keys** button. Below that, a full **Webhooks** section:
  "Where Kwikpik sends package and order events. Production and sandbox have separate destinations
  and separate signing secrets." Two identical blocks for **Production** ("Receives events from
  live traffic. Signed with the live secret.") and **Sandbox** ("Receives events from test traffic
  only. Has its own secret."), each with: Webhook URL field ("Leave empty to stop sending
  [production/sandbox] events"), a "Retry failed deliveries" toggle ("Re-attempt delivery when your
  endpoint returns an error"), and a Signing secret ("Not generated" / **Generate** button, "Use
  this secret to verify the signature on incoming webhook requests"). **This resolves the earlier
  Order-creation "Delivery Mode: Online" open question** — "Online" almost certainly means the
  order originated via API/webhook integration (e.g. a partner's own e-commerce checkout) rather
  than being typed into the portal by staff ("Offline"), since this tab confirms the platform is a
  full webhook-driven integration surface with production/sandbox separation.

- **Team tab — Roles & Team Members.** Real RBAC, not a stub:
  - **Four built-in roles** with fixed, enumerated permission sets (a "New Role" button implies
    custom roles are also supported, not opened/tested):
    - **VIEWER**: View Dashboard, View Orders, View Packages, View Transfers, View Wallet
      (read-only across the board)
    - **OPERATOR**: adds Receive Packages, Dispatch Packages, Update Package Status, View Riders
      (day-to-day warehouse/ops floor role — notably cannot create orders or touch money)
    - **MANAGER**: adds Create Orders, Cancel Orders, Create Transfers, Create & Manage Riders,
      View Wallet, **Withdraw from Wallet**, View Settings (full operational + financial control,
      but not API keys or team management)
    - **OWNER**: everything MANAGER has, plus Dispatch Transfers, "Receive Transfers from transfers
      page," Manage API Keys, View Team, Manage Team (full control)
  - **"Transfers" is a first-class permissioned entity/module** distinct from Orders/Packages, with
    its own Create/Dispatch/Receive actions — this is almost certainly the formal representation of
    inter-hub / inter-partner package handoffs implied by the Drop-off HUB picker and the
    "...TO LOCATION" package statuses. **Note: there is no "Transfers" item in the left sidebar
    nav** despite it being a fully permissioned module with its own actions in the Roles matrix and
    its own Exports dataset — this is a real information-architecture gap: partners with rights to
    create/dispatch/receive transfers currently have no direct navigation entry point to do so
    (unless it's reachable from within an Order/Package detail view, which couldn't be tested with
    zero data).
  - **Team Members**: "Sub-accounts that can access this partner portal," **Add Member** button,
    empty state "No team members yet." Confirms one partner org can have multiple logged-in staff
    accounts, each assigned one of the roles above.

---

## Global search

**Observed — confirmed non-functional.** Typed a query into the global search box (top of every
page) and pressed Enter: no autocomplete/results dropdown ever appeared, no navigation occurred, no
network activity implied by any UI change. This is a second confirmed dead affordance (alongside
the notification bell) in the persistent chrome that surrounds every single page of the app. Given
it's global chrome, this likely affects perceived trustworthiness/polish more than the page-level
findings above.

## Sidebar collapse

**Observed.** The chevron button next to "Kwikpik" in the sidebar header collapses the sidebar to
an icon-only rail (labels hidden, active item still highlighted by background). No tooltips
appeared on hover in the collapsed state during this pass — worth a follow-up check, since an
icon-only rail without tooltips is hard to navigate for anyone who hasn't memorized the icon order.

---

## Synthesis — information architecture & mental model

Putting the sections above together, the real product shape is:

1. **Entity model**: `Order` (1) → `Package` (many). A `Package` is the true unit of operational
   state — it carries its own status (17+ values), its own OTD/SLA measurement, its own
   insurance/value, and its own return/RTO sub-lifecycle. `Order` is mostly a creation-time
   container plus a billing rollup (Total).
2. **Two roles a partner can play, simultaneously, under one account**: (a) **Shipper** — creates
   Orders/Packages, pays via prepaid Wallet debits and/or Invoices; (b) **Fulfillment/rider-fleet
   operator** — has Riders, participates in the Drop-off HUB / Transfers network, and earns
   per-package delivery Payouts (Settings → Payment) which can be split with the specific Rider.
   The portal doesn't visually separate these two roles anywhere (no "switch mode" or two distinct
   dashboards) — they're just two sets of permissions/data that happen to coexist.
3. **Multi-partner hub-and-spoke network**: the Drop-off HUB combobox (Orders), the "...TO
   LOCATION" package statuses (Packages), and the Transfers permission/export dataset (Settings,
   Exports) together describe a mesh where packages can be handed off between different partners'
   depots rather than always going pickup → direct-to-recipient. This is a first-class product
   mechanic, not an edge case, but it has **no dedicated nav entry** (see Transfers gap above) and
   its cross-partner visibility (partner names in the HUB picker) hasn't obviously been reviewed
   for whether that's intentional.
4. **Money has (at least) three faces**: prepaid Wallet balance (funds shipping/insurance costs),
   Invoices (post-paid/outstanding billing — relationship to Wallet unconfirmed), and Payouts
   (money owed *to* the partner for fulfillment work, split with Riders). A future notification
   system needs to account for all three as distinct triggers (wallet low-balance / debit,
   invoice issued/due, payout received) — see Kwikpik's existing Automations/Wallet notification
   patterns in the sibling Web3 product's docs for a related but separate precedent.
5. **API-first, not portal-only**: JSON/CSV bulk order import, Delivery Mode Online/Offline,
   full production/sandbox webhook infrastructure with signed secrets, and a dedicated API Keys
   tab all point to partners integrating this at the system level, with the portal as a
   human-in-the-loop fallback/oversight layer rather than the primary interface for high-volume
   partners.

## Terminology glossary (as used in-product)

- **Order** — a single "submit a new delivery order" transaction; contains 1+ Packages.
- **Package** — the individually tracked, status-bearing shipped item; has its own tracking ID.
- **Merchant Package #** / `merchantPackageNumber` — the partner's own reference number for a
  package, separate from Kwikpik's internal tracking ID.
- **Drop-off HUB** — a depot belonging to some partner in the network (own or another partner's)
  where packages can be handed off, despite the field being labeled as if it were exclusively
  "the Kwikpik office."
- **OTD** — On-Time Delivery; a measured/filterable lateness dimension on Packages, not just a
  binary status.
- **RTO** — Return To Origin; the reverse-logistics path a failed-delivery package takes back
  to the partner's pickup point, transiting hub infrastructure.
- **Transfer** — the (currently nav-less) formal record of a package handoff between locations/
  partners; has its own Create/Dispatch/Receive permissions distinct from Package status updates.
- **Rider** — an individual delivery courier, tracked as a first-class entity with manifests and
  payout splits; distinct from "Vehicle Type" (which is a property of an Order/Package, not the
  Rider entity itself, as far as this audit could tell).
- **Delivery Mode: Offline / Online** — Offline = portal-entered order; Online = (inferred)
  API/webhook-originated order, e.g. from a partner's own storefront.
- **Expected Payment** (Packages column) — unclear; likely COD amount or per-package cost. Not
  resolved — see open questions.

## Cross-page inconsistencies found

1. Package status enum differs between the **Packages** page filter (missing `DELIVERY_PAUSED`)
   and the **Exports → Rider Manifest** dataset's status filter (includes `DELIVERY_PAUSED`).
2. The account-menu (top-right avatar) shows the user's email as both the "name" line and the
   "email" line — no distinct display name is set/shown.
3. Wallet's Transaction History has no date-range/status filters, unlike every other list page in
   the app (Orders, Packages, Returns, Invoices, Exports) which all have filter bars — though this
   could simply be un-rendered because the list is empty; not confirmed either way.
4. **Transfers** has full CRUD-style permissions in the Team → Roles matrix and its own Exports
   dataset, but **no sidebar nav item** anywhere in the app.

## UX friction / notable gaps

- Global search bar and the notification bell are both dead/non-functional in the running app —
  two prominent, always-visible affordances that don't do anything.
- No in-app notification center/inbox exists at all; "notifications" today = a single browser-push
  opt-in toggle with no per-type granularity.
- Drop-off HUB depot picker exposes the names of what appear to be every other partner business on
  the platform to any authenticated partner, without obvious business justification surfaced in the
  UI copy (which undersells it as just "Kwikpik office").
- Transfers module has no direct navigation entry despite being a real, permissioned, exportable
  entity.
- "Expected Payment" (Packages) and the Wallet/Invoice/Payout relationship are all under-explained
  by in-product copy — a partner without prior context would likely be confused about which of the
  three money flows applies to which situation.

## Open questions / things this audit couldn't verify

Could not be verified because the audited account (`Sippy Life`, account ID `sipp444876`) has zero
historical Orders, Packages, Returns, Invoices, Wallet transactions, or Team members. Everything
below would need either a seeded/demo account with real data, or direct confirmation from the
product owner:

1. What an actual **Order detail / Package detail page** looks like (status timeline UI, available
   actions per status, how insurance claims are filed, cancellation flow for Pending/Processing
   orders).
2. What the **CSV "Preview & Create Order"** review step actually shows before committing (the only
   creation path with an explicit review step).
3. What the **Withdraw** flow looks like once a wallet PIN is set (destination account selection,
   fees, processing time).
4. The precise relationship between **Wallet debits, Invoices, and Payouts** — is Invoices a
   fallback when the wallet balance is insufficient, a separate platform-fee billing channel, or
   something else?
5. What **"Expected Payment"** on the Packages table actually represents (COD vs. cost vs. payout).
6. What the **Rider Manifest** view/workflow looks like for a partner who has riders (this audit's
   account isn't configured for payouts, so Riders creation/management wasn't reachable/testable
   end-to-end — "View Riders" / "Create & Manage Riders" exist as permissions but no Riders nav
   entry was found in the sidebar either, same gap as Transfers).
7. Whether the "Online" Delivery Mode surfaces any different UI in accounts that actually have API
   integration configured (this account's API Keys were empty/ungenerated).
8. Whether the cross-partner Drop-off HUB visibility is an intentional network-transparency
   decision or an oversight.
9. Whether "Stage" (Returns table) is genuinely a second axis from "Status," and what its values
   are.
