import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Foundations/Tokens",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ramps = [
  { name: "Grey", steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900], prefix: "grey" },
  { name: "Primary", steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900], prefix: "primary" },
  { name: "Secondary", steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900], prefix: "secondary" },
  { name: "Blue", steps: [50, 500, 900], prefix: "blue" },
  { name: "Yellow", steps: [50, 500, 900], prefix: "yellow" },
  { name: "Success", steps: [50, 100, 500, 700, 900], prefix: "success" },
  { name: "Warning", steps: [50, 100, 500, 700, 900], prefix: "warning" },
  { name: "Error", steps: [50, 100, 500, 700, 900], prefix: "error" },
];

function Swatch({ label, varName }: { label: string; varName: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div
        style={{
          width: 72,
          height: 48,
          borderRadius: 8,
          border: "1px solid var(--color-elements-stroke)",
          background: `var(${varName})`,
        }}
      />
      <span style={{ fontSize: 11, color: "var(--text-sub)" }}>{label}</span>
    </div>
  );
}

export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {ramps.map((ramp) => (
        <div key={ramp.name}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{ramp.name}</h3>
          <div style={{ display: "flex", gap: 12 }}>
            {ramp.steps.map((step) => (
              <Swatch key={step} label={String(step)} varName={`--color-${ramp.prefix}-${step}`} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

const spacingTokens = [
  ["none", 0],
  ["xxxsm", 2],
  ["xxsm", 4],
  ["xsm", 8],
  ["sm", 12],
  ["normal", 16],
  ["md", 24],
  ["lg", 40],
  ["xlg", 56],
  ["xxlg", 80],
  ["xxxlg", 120],
] as const;

export const Spacing: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {spacingTokens.map(([name, px]) => (
        <div key={name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 80, fontSize: 12, fontFamily: "monospace" }}>{name}</span>
          <div style={{ width: px, height: 16, background: "var(--color-primary-500)", borderRadius: 2 }} />
          <span style={{ fontSize: 12, color: "var(--text-sub)" }}>{px}px</span>
        </div>
      ))}
    </div>
  ),
};

const radiusTokens = [
  ["xsm", 4],
  ["sm", 8],
  ["normal", 16],
  ["lg", 24],
  ["xl", 40],
] as const;

export const Radius: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      {radiusTokens.map(([name, px]) => (
        <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 72,
              height: 72,
              background: "var(--color-primary-100)",
              border: "1px solid var(--color-primary-300)",
              borderRadius: name === "xl" ? "36px" : `var(--radius-${name})`,
            }}
          />
          <span style={{ fontSize: 11, color: "var(--text-sub)" }}>
            {name} ({name === "xl" ? "120" : px}px)
          </span>
        </div>
      ))}
    </div>
  ),
};

const typeScale = [
  ["H1", "32px", "900"],
  ["H2", "24px", "900"],
  ["H3", "21px", "900"],
  ["H4", "18px", "900"],
  ["H5", "16px", "900"],
  ["H6", "14px", "900"],
  ["Body1", "16px", "400"],
  ["Body2", "14px", "400"],
  ["Body3", "12px", "400"],
  ["Caption", "10px", "400"],
] as const;

export const TypographyUI: Story = {
  name: "Typography — UI scale (Satoshi)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <p style={{ fontSize: 12, color: "var(--text-sub)", marginBottom: 8 }}>
        Mobile app + web dashboard chrome (buttons, forms, cards, tables). Tops out at 32px — not for marketing headlines, see the Display scale below.
      </p>
      {typeScale.map(([name, size, weight]) => (
        <div key={name} style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <span style={{ width: 80, fontSize: 11, color: "var(--text-sub)", fontFamily: "monospace" }}>
            {name} / {size}
          </span>
          <span style={{ fontSize: size, fontWeight: Number(weight), fontFamily: "var(--font-sans)" }}>
            Kwikpik moves money fast.
          </span>
        </div>
      ))}
    </div>
  ),
};

const displayScale = [
  ["Display/2xl", "88px", "88px"],
  ["Display/xl", "72px", "72px"],
  ["Display/l", "56px", "56px"],
  ["Display/m", "40px", "40px"],
  ["Display/s", "24px", "32px"],
  ["Display/xs", "18px", "24px"],
] as const;

export const TypographyDisplay: Story = {
  name: "Typography — Display scale (Aeonik)",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <p style={{ fontSize: 12, color: "var(--text-sub)", marginBottom: 8 }}>
        Marketing website headlines only, sampled directly off the live "Website Remodel" Figma page — real recurring sizes, not invented. Requires the Aeonik webfont to be licensed/hosted; falls back to Satoshi if unavailable. Body copy on the website is still Satoshi Regular 16px.
      </p>
      {displayScale.map(([name, size, lh]) => (
        <div key={name} style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <span style={{ width: 110, fontSize: 11, color: "var(--text-sub)", fontFamily: "monospace" }}>
            {name} / {size}
          </span>
          <span style={{ fontSize: size, lineHeight: lh, fontWeight: 700, fontFamily: "var(--font-display)" }}>
            Schedule bills & control your money.
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Elevation: Story = {
  render: () => {
    const shadows = ["xs", "sm", "md", "lg", "xl", "xxl"];
    return (
      <div style={{ display: "flex", gap: 24, padding: 24 }}>
        {shadows.map((s) => (
          <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 72,
                height: 72,
                background: "white",
                borderRadius: 16,
                boxShadow: `var(--shadow-${s})`,
              }}
            />
            <span style={{ fontSize: 11, color: "var(--text-sub)" }}>{s}</span>
          </div>
        ))}
      </div>
    );
  },
};
