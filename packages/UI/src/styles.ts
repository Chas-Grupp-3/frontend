import "@fontsource/poppins/500.css"; // Medium
import "@fontsource/poppins/600.css"; // semi-bold
import "@fontsource/poppins/700.css"; // bold
import "@fontsource/inter/400.css"; // regular

export const fontWeight = {
  poppinsMedium: 500,
  poppinsSemiBold: 600,
  poppinsBold: 700,
  interRegular: 400,
};
export const fontFamily = {
  poppins: "'Poppins', sans-serif",
  inter: "'Inter', sans-serif",
};

export const breakpoints = {
  mobile: "768px",
  tablet: "1024px",
  desktop: "1200px",
};

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
  pause: "#C6CCD8",

  okHover: "#208D48",
  minorHover: "#D08403",
  criticalHover: "#882020",
  pauseHover: "#525E77",
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
  h1: {
    fontSize: "22px",
    fontWeight: fontWeight.poppinsBold,
    fontFamily: fontFamily.poppins,
  },
  h2: {
    fontSize: "32px",
    fontWeight: fontWeight.poppinsBold,
    fontFamily: fontFamily.poppins,
  },
  h3: {
    fontSize: "25px",
    fontWeight: fontWeight.poppinsMedium,
    fontFamily: fontFamily.poppins,
  },
  h4: {
    fontSize: "22px",
    fontWeight: fontWeight.poppinsMedium,
    fontFamily: fontFamily.poppins,
  },
  body: {
    md: {
      fontSize: "18px",
      fontWeight: fontWeight.interRegular,
      fontFamily: fontFamily.inter,
    },
    sm: {
      fontSize: "14px",
      fontWeight: fontWeight.interRegular,
      fontFamily: fontFamily.inter,
    },
  },
} as const;

export const textWeb = {
  h1: {
    fontSize: "48px",
    fontWeight: fontWeight.poppinsBold,
    fontFamily: fontFamily.poppins,
  },
  h2: {
    fontSize: "32px",
    fontWeight: fontWeight.poppinsBold,
    fontFamily: fontFamily.poppins,
  },
  h3: {
    fontSize: "28px",
    fontWeight: fontWeight.poppinsSemiBold,
    fontFamily: fontFamily.poppins,
  },
  body: {
    lg: {
      fontSize: "25px",
      fontWeight: fontWeight.interRegular,
      fontFamily: fontFamily.inter,
    },
    md: {
      fontSize: "18px",
      fontWeight: fontWeight.interRegular,
      fontFamily: fontFamily.inter,
    },
  },
  button: {
    fontSize: "20px",
    fontWeight: fontWeight.poppinsSemiBold,
    fontFamily: fontFamily.poppins,
  },
  nav: {
    fontSize: "30px",
    fontWeight: fontWeight.poppinsSemiBold,
    fontFamily: fontFamily.poppins,
  },
} as const;
