export const colors = {
  primary: "#1F4F82",
  secondary: "#46BCEC",
  accent: "#E0F2FE",

  blueText: "#06305D",
  blueBackground: "#9DC1DA",
  blackText: "#111827",
  background: "#F3F4F6",
  greyText: "#6F6F6F",
  whiteBackground: "#E7E7E7",
  cardText: "#153B63",

  ok: "#2CEB72",
  minor: "#FFA712",
  critical: "#B62D2D",
  paus: "#C6CCD8",

  okHover: "#208D48",
  minorHover: "#D08403",
  criticalHover: "#882020",
  pausHover: "#525E77",
  buttonHover: "#063464",

  greyLines: "#0E7490",
  blueLines: "#1F4F82",
} as const;

export const radius = {
  box: "20px",
  button: "10px",
  input: "5px",
  lines: "2px",
} as const;

export const textMobile = {
  H1: "25px",
  H2: "22px",
  H3: "10px",
  H4: "16px",
  H5: "14px",
} as const;

export const textWeb = {
  H1: "48px",
  H2: "32px",
  H3: "28px", //20-32?
  body: {
    lg: "25px",
    md: "18px",
    sm: "12px",
  },
  button: "20px",
  nav: "30px", //25-36px???
  footer: "36px",
} as const;
