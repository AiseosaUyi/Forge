# Art Direction v2 — Closing the "Premium/Wow" Gap

Source of the new direction: the "👩🏽‍🎨 Website Remodel" page in the same Figma file (frames `5249:14171`, `5249:13834`, `5249:13280`). The first pass (documented in `automations-expansion-design.md`) matched the *mobile app's* existing visual language faithfully but never looked at the *website's* — which turns out to carry Kwikpik's actual distinctive personality. This version corrects that.

## What the website revealed

1. **Confident, oversized display typography.** "Move Money Globally With No Limits" — huge, Black weight, tight leading, sentence case. "work **happens** when people are **trusted** to build" — mixes Bold and Regular weight *within the same headline* to create rhythm and emphasis. The app screens (v1) used modest 18–26px headlines; the brand's real voice is much bigger and bolder.
2. **A distinctive flat illustration system.** The "Why People Love Kwikpik" section: solid-color flat character illustrations — bold black shapes for hair, minimal facial features, solid skin-tone fills — inside rounded-square cards with pastel tinted backgrounds (peach, lavender, cream), each card **tilted at a slight angle** for a playful, dynamic, scattered composition. This is the custom illustration system that was missing from v1 — v1 used plain circles with text glyphs (`!`, `i`, `×`), which is generic by comparison.
3. **Pastel warmth, not just saturated brand gradient.** The gradient-purple hero treatment from v1 is still valid brand color, but the website shows Kwikpik also has a warmer, more playful pastel register (peach/lavender/cream tints) it uses for personality moments. Both registers now coexist: gradient for drama, pastel-tilted-cards for warmth/character.

## What's changing in v2

- **Illustrated status marks** replace every plain circle-and-glyph badge — rounded-square, solid pastel or brand-tinted background matched to severity, bold thick iconographic shape (not a thin text glyph), slight rotation for personality. Used everywhere a status/severity moment appears: reminders, paused notices, success screens, badges.
- **Bolder, bigger typography** — headline sizes increased across the board, and mixed-weight emphasis (bold word within a regular sentence) used the way the website does it, not just uniform bold.
- **Tilted-card personality accents** in a few high-visibility spots (empty states, celebratory moments) rather than flat static cards everywhere.
- **Denser, warmer composition** on screens that read as sparse in v1 (Incoming Requests, reminder cards) — no more dead space below content.
- **Data-viz language extended** beyond the single Group Detail progress ring to more screens showing amounts/status.
- Gradient hero treatment (screens 9, 19, 20, 21 + all 5 emails) is **kept** — it's genuine brand purple, not generic, and it tested well. It's now paired with the new illustrated marks instead of plain glyphs.

This is documented before the rebuild so the reasoning survives even if individual Figma frames get iterated further later.

## What shipped

- **New illustrated "sticker" mark system** — rounded-square tilted badges with a hard offset shadow (not a soft blur), solid pastel background per severity (mint/peach/lavender/blush, echoing the website's card tints), bold geometric icon shapes (check/bang/info/pause) built from primitives, not text glyphs. Replaced every plain circle-and-glyph badge across all 5 emails, the 5 in-app reminder/paused cards, and the two success screens (Request Accepted, Group Created).
- **Typography confidence pass** — headline size bumped from 18px to 25px across every wizard/form screen (14 screens), matching the website's bold, oversized display voice instead of the more modest sizing v1 used.
- **Incoming Requests screen** — added a third request row; two rows against a mostly-empty frame read as unfinished, three reads as a real populated list.
- Gradient hero treatment (kept from v1, still genuine brand purple) now pairs with the new marks instead of plain glyphs — screens 9, 19, 21, Group Detail's progress ring.

## Residual gaps (honest, not claiming a verified 10/10)

- **Data-viz is still concentrated in one place** — the Group Detail progress ring is the only chart-like element. Extending it (e.g. a mini run-history sparkline on Automation Detail) would round this out further.
- **Accessibility was checked visually, not measured** — every gradient-hero text pairing was eyeballed for legibility across all rebuilt screens and read clearly, but no contrast ratio was formally calculated against WCAG AA.
- The checkmark mark's two strokes don't meet at a perfectly clean vertex (an intentional-looking but not fully resolved geometric abstraction) — reads fine as a bold stylized check, worth a closer look if it's ever exported as a real production asset.
