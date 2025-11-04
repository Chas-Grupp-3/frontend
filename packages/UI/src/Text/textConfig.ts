import { css } from "styled-components";
import {
  textWeb,
  textMobile,
  breakpoints,
  fontFamily,
  fontWeight,
} from "../styles";

export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "body-lg"
  | "body"
  | "body-sm"
  | "body-smBold"
  | "label"
  | "button"
  | "nav";

type TextElement = "h1" | "h2" | "h3" | "p" | "span" | "label" | "nav";
const mobileBreakpoint = breakpoints.mobile;

export const textVariantsConfig: Record<TextVariant, ReturnType<typeof css>> = {
  h1: css`
    font-size: ${textMobile.h1.fontSize};
    font-family: ${textMobile.h1.fontFamily};
    font-weight: ${textMobile.h1.fontWeight};
    @media (min-width: mobileBreakpoint) {
      font-size: ${textWeb.h1.fontSize};
      font-family: ${textWeb.h1.fontFamily};
      font-weight: ${textWeb.h1.fontWeight};
    }
  `,
  h2: css`
    font-size: ${textMobile.h2.fontSize};
    font-family: ${textMobile.h2.fontFamily};
    font-weight: ${textMobile.h2.fontWeight};
    @media (min-width: mobileBreakpoint) {
      font-size: ${textWeb.h2.fontSize};
      font-family: ${textWeb.h2.fontFamily};
      font-weight: ${textWeb.h2.fontWeight};
    }
  `,
  h3: css`
    font-size: ${textMobile.h3.fontSize};
    font-family: ${textMobile.h3.fontFamily};
    font-weight: ${textMobile.h3.fontWeight};
    @media (min-width: ${mobileBreakpoint}) {
      font-size: ${textWeb.h3.fontSize};
      font-family: ${textWeb.h3.fontFamily};
      font-weight: ${textWeb.h3.fontWeight};
    }
  `,
  body: css`
    font-size: ${textMobile.body.md.fontSize};
    font-family: ${textMobile.body.md.fontFamily};
    font-weight: ${textMobile.body.md.fontWeight};
    @media (min-width: ${mobileBreakpoint}) {
      font-size: ${textWeb.body.md.fontSize};
      font-family: ${textWeb.body.md.fontFamily};
      font-weight: ${textWeb.body.md.fontWeight};
    }
  `,
  "body-lg": css`
    @media (max-width: ${mobileBreakpoint}) {
      font-size: ${textWeb.body.lg.fontSize};
      font-family: ${textWeb.body.lg.fontFamily};
      font-weight: ${textWeb.body.lg.fontWeight};
    }
  `,
  "body-sm": css`
    font-size: ${textMobile.body.sm.fontSize};
    font-family: ${textMobile.body.sm.fontFamily};
    font-weight: ${textMobile.body.sm.fontWeight};
  `,
  "body-smBold": css`
    font-size: ${textMobile.body.smBold.fontSize};
    font-family: ${textMobile.body.smBold.fontFamily};
    font-weight: ${textMobile.body.smBold.fontWeight};
  `,

  label: css`
    font-size: ${textMobile.body.md.fontSize};
    font-family: ${textMobile.body.md.fontFamily};
    font-weight: ${textMobile.body.md.fontWeight};
    @media (min-width: ${mobileBreakpoint}) {
      font-size: ${textWeb.body.md.fontSize};
      font-family: ${textWeb.body.md.fontFamily};
      font-weight: ${textWeb.body.md.fontWeight};
    }
  `,
  button: css`
    font-size: ${textMobile.body.md.fontSize};
    font-family: ${fontFamily.poppins};
    font-weight: ${fontWeight.poppinsSemiBold};
    @media (min-width: ${mobileBreakpoint}) {
      font-size: ${textWeb.button.fontSize};
      font-family: ${textWeb.button.fontFamily};
      font-weight: ${textWeb.button.fontWeight};
    }
  `,
  nav: css`
    @media (max-width: ${mobileBreakpoint}) {
      font-size: ${textWeb.nav.fontSize};
      font-family: ${textWeb.nav.fontFamily};
      font-weight: ${textWeb.nav.fontWeight};
    }
  `,
};

// Default semantic element for each variant
export const defaultElementMap: Record<TextVariant, TextElement> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  "body-lg": "p",
  body: "p",
  "body-sm": "p",
  "body-smBold": "p",
  label: "label",
  button: "span",
  nav: "nav",
};
