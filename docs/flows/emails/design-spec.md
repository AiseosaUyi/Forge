# Reminder Emails — Design Spec

**Primary deliverable is in Figma** — same file, page "🔀 Automations Expansion (Draft)", section "REMINDER EMAILS" (5 frames, 640px wide, placed below the 24 app screens). Companion to the in-app reminder cards (screens 12–16) — same content and severity logic, reformatted for email.

An HTML version also exists in this folder (`reminder-approval-needed.html` etc.) — built first to pressure-test the design in a real browser before committing it to Figma, and kept here as a technical reference for whoever eventually wires these into an ESP. It is not the deliverable; the Figma frames are.

## 1. Visual register

Confident, warm reassurance. A fintech reminder should feel like a helpful nudge from someone who has it handled — never an alarming bank overdraft notice, even for "insufficient balance" or "paused" states. Editorial-fintech: bold heavy-weight headlines, generous whitespace, one rich color moment per email (the hero band), restrained everywhere else.

## 2. Component anatomy

- **Preheader** — hidden preview text (the first thing shown in the inbox list, before opening)
- **Header** — Kwikpik wordmark, small, on white
- **Hero band** — a two-stop gradient panel in the email's severity color (not brand purple — purple gradient is reserved for celebratory moments like Request Accepted, per `automations-expansion-design.md`), with a floating white circular icon badge (soft shadow, glyph) and the headline + one-line body directly on the gradient
- **Detail card** — white/tinted bordered table, label/value rows (Amount, Recipient, Date), mirrors the Figma Detail Card component
- **CTA** — one bulletproof button (table-cell background, not an `<a>` styled as a button, so Outlook renders it correctly), plus an optional secondary text link
- **Footer** — manage-automation link, help link, legal/unsubscribe placeholder

## 3. Color decisions (from `../../design-system/tokens/colors.md`)

Severity maps 1:1 to the in-app cards — same hue carries across in-app and email so a user recognizes the same alert at a glance in either surface:

| Email | Hero gradient | Badge glyph |
|---|---|---|
| Approval Needed | Blue/500 `#0047ff` → Blue/700 `#002b99` | `!` |
| Insufficient Balance | Warning/500 `#ff8001` → Warning/700 `#994d01` | `!` |
| Notify Only | Blue/400 `#336cff` → Blue/600 `#0039cc` | `i` |
| Paused (payer) | Error/500 `#ff2e00` → Error/700 `#991c00` | `×` |
| Paused (creator) | Error/500 `#ff2e00` → Error/700 `#991c00` | `×` |

Body: White `#ffffff` background, Grey/50 `#f6f7f7` detail-card fill, Grey/100 `#e3e3e4` borders, Grey/500 `#717477` secondary text, Grey/900 `#0b0c0c` primary text. CTA button: Primary/500 `#564cd8` (brand purple stays the universal action color regardless of the hero's severity color — one consistent "act here" signal).

## 4. Typography

No custom font — Satoshi isn't reliably supported via email `@font-face`, and system fonts render crisper across clients anyway. Stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`. Headline 26px/800, body 15px/400, detail label 12px/600 (Grey/500), detail value 14px/700 (Grey/900), button label 15px/700.

## 5. Icon spec

64px circle, white fill, soft box-shadow, centered glyph 26px/800 in the hero's accent color. No external images or icon fonts — pure HTML/CSS, zero broken-image risk.

## 6. Layout

600px max-width container, centered, table-based (`role="presentation"` tables throughout for accessibility + client compatibility). Single column, mobile-safe by default since nothing depends on multi-column layout; a `<style>` media query tightens outer padding under 480px. Dark-mode `prefers-color-scheme` block keeps body text readable if a client force-inverts.

## 7. Motion

None — email clients don't reliably support CSS animation/transition, and it's not worth the compatibility risk for a transactional reminder.

## Figma frames

- EMAIL — Approval Needed
- EMAIL — Insufficient Balance
- EMAIL — Notify Only
- EMAIL — Paused (Payer)
- EMAIL — Paused (Creator)

Each built at 640px outer width (576px content column, matching a realistic desktop email client), reusing the exact hero/floating-badge/floating-card/CTA language from the in-app celebratory screens (9, 19, 20, 21) — gradient hero band per severity, floating white icon badge with soft shadow, a detail card straddling the gradient/white seam, one real Button component instance for the CTA. Two real bugs surfaced and got fixed during the build, worth knowing if these get edited further: a detail-row width calculation that didn't subtract the card's own padding (caused value text to clip), and two-line headlines needing more clearance before the subtext than one-line headlines do.

## HTML reference (not the deliverable)

- `reminder-approval-needed.html`
- `reminder-insufficient-balance.html`
- `reminder-notify-only.html`
- `paused-payer.html`
- `paused-creator.html`

All five verified in-browser (light and dark) before the Figma pass — the first render caught two real bugs worth knowing about if these are ever wired up for sending: `prefers-color-scheme: dark` needs `<meta name="color-scheme" content="light dark">` (not `content="light"`, which forces light mode and suppresses the dark CSS entirely), and dark-mode overrides only apply to elements that carry the override class — a few text elements (wordmark, footer links) were missed on the first pass and went invisible against a dark background. To actually send these, they'd need to go through whatever ESP/transactional-email service Kwikpik uses (Postmark, SendGrid, etc.) with the placeholder data swapped for real merge fields.
