import type { Meta, StoryFn } from "@storybook/nextjs-vite";

const colors = [
  { name: "--color-orange", value: "252 77 22" },
  { name: "--color-orange-light", value: "255 98 49" },
  { name: "--color-off-white", value: "240 237 235" },
  { name: "--color-pale-white", value: "249 246 244" },
  { name: "--color-tinted-black", value: "9 9 10" },
  { name: "--color-almost-black", value: "32 32 33" },
  { name: "--color-gray", value: "95 89 100" },
  { name: "--color-detail", value: "174 174 174" },
  { name: "--color-dark-gray", value: "64 64 64" },
  { name: "--color-darkest-gray", value: "41 41 41" },
  { name: "--color-salmon", value: "253 166 138" },
  { name: "--color-platinum", value: "237 225 223" },
  { name: "--color-white", value: "255 255 255" },
];

const fontSizes = [
  { name: "--font-size-2xs", value: "11px" },
  { name: "--font-size-xs", value: "12px" },
  { name: "--font-size-sm", value: "13px" },
  { name: "--font-size-md", value: "14px" },
  { name: "--font-size-base", value: "15px" },
  { name: "--font-size-lg", value: "16px" },
  { name: "--font-size-xl", value: "18px" },
  { name: "--font-size-2xl", value: "20px" },
  { name: "--font-size-3xl", value: "24px" },
  { name: "--font-size-display", value: "64px" },
];

const spacings = [
  { name: "--spacing-0", value: "0px" },
  { name: "--spacing-1", value: "2px" },
  { name: "--spacing-2", value: "4px" },
  { name: "--spacing-3", value: "6px" },
  { name: "--spacing-4", value: "8px" },
  { name: "--spacing-5", value: "10px" },
  { name: "--spacing-6", value: "12px" },
  { name: "--spacing-8", value: "16px" },
  { name: "--spacing-10", value: "20px" },
  { name: "--spacing-12", value: "24px" },
  { name: "--spacing-14", value: "28px" },
  { name: "--spacing-16", value: "32px" },
  { name: "--spacing-32", value: "64px" },
];

const radii = [
  { name: "--radius-sm", value: "4px" },
  { name: "--radius-md", value: "6px" },
  { name: "--radius-lg", value: "8px" },
  { name: "--radius-xl", value: "12px" },
  { name: "--radius-full", value: "9999px" },
];

const shadows = [
  { name: "--shadow-1", value: "0 1px 4px rgba(0,0,0,0.04)" },
  { name: "--shadow-2", value: "0 2px 12px rgba(0,0,0,0.06)" },
  {
    name: "--shadow-3",
    value: "0 4px 16px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
  },
];

const sectionStyle: React.CSSProperties = {
  marginBottom: 48,
};

const headingStyle: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 600,
  marginBottom: 16,
  color: "rgb(32, 32, 33)",
  borderBottom: "1px solid rgb(237 225 223)",
  paddingBottom: 8,
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: 16,
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  fontFamily: "monospace",
  color: "#666",
  marginTop: 8,
};

const valueStyle: React.CSSProperties = {
  fontSize: 11,
  fontFamily: "monospace",
  color: "#999",
};

const meta = {
  title: "Design Tokens",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;

export const Colors: StoryFn = () => (
  <div style={sectionStyle}>
    <h2 style={headingStyle}>Colours</h2>
    <div style={gridStyle}>
      {colors.map(({ name, value }) => (
        <div key={name}>
          <div
            style={{
              width: "100%",
              height: 80,
              borderRadius: 8,
              backgroundColor: `rgb(${value})`,
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          />
          <div style={labelStyle}>{name}</div>
          <div style={valueStyle}>rgb({value})</div>
        </div>
      ))}
    </div>
  </div>
);

export const Typography: StoryFn = () => (
  <div style={sectionStyle}>
    <h2 style={headingStyle}>Font Sizes</h2>
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {fontSizes.map(({ name, value }) => (
        <div
          key={name}
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 16,
          }}
        >
          <code
            style={{
              width: 200,
              flexShrink: 0,
              fontSize: 12,
              color: "#666",
            }}
          >
            {name}
          </code>
          <span style={{ fontSize: value, color: "rgb(32, 32, 33)" }}>
            The quick brown fox ({value})
          </span>
        </div>
      ))}
    </div>
  </div>
);

export const Spacing: StoryFn = () => (
  <div style={sectionStyle}>
    <h2 style={headingStyle}>Spacing Scale</h2>
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {spacings.map(({ name, value }) => (
        <div
          key={name}
          style={{ display: "flex", alignItems: "center", gap: 16 }}
        >
          <code
            style={{
              width: 160,
              flexShrink: 0,
              fontSize: 12,
              color: "#666",
            }}
          >
            {name}
          </code>
          <div
            style={{
              width: value,
              height: 24,
              backgroundColor: "rgb(252, 77, 22)",
              borderRadius: 4,
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: 12, color: "#999" }}>{value}</span>
        </div>
      ))}
    </div>
  </div>
);

export const BorderRadius: StoryFn = () => (
  <div style={sectionStyle}>
    <h2 style={headingStyle}>Border Radius</h2>
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      {radii.map(({ name, value }) => (
        <div key={name} style={{ textAlign: "center" }}>
          <div
            style={{
              width: 80,
              height: 80,
              backgroundColor: "rgb(252, 77, 22)",
              borderRadius: value,
            }}
          />
          <div style={labelStyle}>{name}</div>
          <div style={valueStyle}>{value}</div>
        </div>
      ))}
    </div>
  </div>
);

export const Shadows: StoryFn = () => (
  <div style={sectionStyle}>
    <h2 style={headingStyle}>Shadows</h2>
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
      {shadows.map(({ name, value }) => (
        <div key={name} style={{ textAlign: "center" }}>
          <div
            style={{
              width: 120,
              height: 120,
              backgroundColor: "white",
              borderRadius: 8,
              boxShadow: `var(${name})`,
            }}
          />
          <div style={labelStyle}>{name}</div>
          <div style={{ ...valueStyle, maxWidth: 160 }}>{value}</div>
        </div>
      ))}
    </div>
  </div>
);

export const Sizes: StoryFn = () => (
  <div style={sectionStyle}>
    <h2 style={headingStyle}>Sizes</h2>
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {[
        { name: "--size-1", value: "14px" },
        { name: "--size-2", value: "16px" },
        { name: "--size-3", value: "20px" },
        { name: "--size-4", value: "24px" },
        { name: "--size-5", value: "32px" },
        { name: "--size-6", value: "48px" },
      ].map(({ name, value }) => (
        <div
          key={name}
          style={{ display: "flex", alignItems: "center", gap: 16 }}
        >
          <code
            style={{
              width: 120,
              flexShrink: 0,
              fontSize: 12,
              color: "#666",
            }}
          >
            {name}
          </code>
          <div
            style={{
              width: value,
              height: value,
              backgroundColor: "rgb(252, 77, 22)",
              borderRadius: 4,
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: 12, color: "#999" }}>{value}</span>
        </div>
      ))}
    </div>
  </div>
);

export const Transitions: StoryFn = () => (
  <div style={sectionStyle}>
    <h2 style={headingStyle}>Transitions</h2>
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {[
        { name: "--transition-fast", value: "150ms ease-in-out" },
        { name: "--transition-medium", value: "300ms ease-in-out" },
        { name: "--transition-slow", value: "500ms ease-in-out" },
      ].map(({ name, value }) => (
        <div
          key={name}
          style={{ display: "flex", alignItems: "center", gap: 16 }}
        >
          <code
            style={{
              width: 200,
              flexShrink: 0,
              fontSize: 12,
              color: "#666",
            }}
          >
            {name}
          </code>
          <div
            style={{
              width: 60,
              height: 40,
              backgroundColor: "rgb(252, 77, 22)",
              borderRadius: 8,
              transition: `transform ${value}, background-color ${value}`,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.3)";
              e.currentTarget.style.backgroundColor = "rgb(255, 98, 49)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.backgroundColor = "rgb(252, 77, 22)";
            }}
          />
          <span style={{ fontSize: 12, color: "#999" }}>
            {value} — hover to preview
          </span>
        </div>
      ))}
    </div>
  </div>
);
