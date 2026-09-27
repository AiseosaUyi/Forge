# Iconography

Source: Style Guide canvas → Foundation → Icon (`node 1507:4518`), 5,348 icon symbols.

## Icon library: Iconsax (Vuesax)

The entire icon set is the **Iconsax** icon library (published as "Vuesax" in Figma community terms — internal layer names are prefixed `vuesax/{style}/{icon-name}`, e.g. `vuesax/twotone/gas-station`). This is a widely-used open icon set (~874 unique glyphs) with **6 visual styles** per glyph:

| Style | Description |
|---|---|
| `bold` | Solid filled shapes |
| `broken` | Outlined with intentional gaps/breaks in the strokes |
| `bulk` | Duotone — solid shape + lighter fill layer |
| `linear` | Thin outlined stroke (most common default) |
| `outline` | Outlined, uniform stroke |
| `twotone` | Outlined with a secondary lighter-weight accent stroke |

874 glyphs × 6 styles ≈ 5,244 symbols, plus a small set of custom/brand icons layered in alongside them (~100 extra): `Google Icon`, `Apple Icon`, `Mastercard Icon`, `Whatsapp`, `shield-tick`, `Phone Number`, and a few others specific to payment/auth flows.

**When building new mobile features:**
- Default to the **`linear`** style for standard UI icons (nav, form fields, list items) — it reads as the primary style used across the base components (buttons, inputs, alerts all reference `Elements/Icon` at a consistent weight matching `linear`).
- Use **`bold`** or **`bulk`** for selected/active states or emphasis (e.g. an active tab icon).
- Use the **brand icons** (Google/Apple/Mastercard/Whatsapp) only for their literal purpose (social auth, card brand, payment method) — never substitute a generic Iconsax glyph for a brand mark.
- Icon color defaults to `Elements/Icon` (`Grey/500` / `#717477`); use `Primary/500` for an icon inside a primary action, or the matching semantic ramp's `500` step for status icons (see [colors.md](./colors.md)).
- Default icon container is a square box (commonly 24px) — keep new icons consistent with that grid unless a spec calls for a different size (16px small / 32px large are the other sizes seen in button icon slots).

**Sourcing real assets:** don't hand-draw or approximate these icons. Because Iconsax is a known public icon set, prefer pulling the actual SVG from the installed Iconsax/`iconsax-react`/`iconsax-react-native` package (style names map directly: `bold`, `broken`, `bulk`, `linear`, `outline`, `twotone`) rather than re-exporting one-by-one from Figma. If a specific icon isn't in the installed package, export it directly from this Figma file's Icon foundation node (`1507:4518`) via `get_design_context`/asset export — never fabricate an SVG.
