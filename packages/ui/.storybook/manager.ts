import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

const kwikpikTheme = create({
  base: "light",
  brandTitle: "Kwikpik Design System",
  brandUrl: "https://kwikpik.io",
  brandImage: "/kwikpik-logo-full.svg",
  brandTarget: "_self",

  colorPrimary: "#564cd8",
  colorSecondary: "#564cd8",

  appBg: "#f6f7f7",
  appContentBg: "#ffffff",
  appBorderColor: "#e3e3e4",
  appBorderRadius: 8,

  textColor: "#0b0c0c",
  textInverseColor: "#ffffff",

  barTextColor: "#717477",
  barSelectedColor: "#564cd8",
  barBg: "#ffffff",

  inputBg: "#ffffff",
  inputBorder: "#e3e3e4",
  inputTextColor: "#0b0c0c",
  inputBorderRadius: 8,

  fontBase: '"Satoshi", "Inter", ui-sans-serif, system-ui, sans-serif',
});

addons.setConfig({
  theme: kwikpikTheme,
});
