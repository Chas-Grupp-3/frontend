import React from "react";
import { colors, textWeb, textMobile } from "./styles";
import styled from "styled-components";
import { css } from "styled-components";

interface FontProps {
  size?: FontSize;
  color?: keyof typeof colors;
  children: React.ReactNode;
  as?: FontAs;
}

type FontSize =
  | "H1"
  | "H2"
  | "H3"
  | "Body"
  | "Body-lg"
  | "Body-md"
  | "Body-sm"
  | "Button"
  | "Nav"
  | "Footer";

type FontAs = "h1" | "h2" | "h3" | "p" | "span" | "div" | "nav";

interface StyledTextProps {
  $variant: FontSize;
  $color: keyof typeof colors;
}

const getTextSize = (variant: StyledTextProps["$variant"]) => {
  switch (variant) {
    case "H1":
      return css`
        font-size: ${textMobile.H1};
        font-family: "Poppins", sans-serif;
        font-weight: 700; /* Bold */
        @media (min-width: 768px) {
          font-size: ${textWeb.H1};
          font-family: "Poppins", sans-serif;
          font-weight: 700;
        }
      `;
    case "H2":
      return css`
        font-size: ${textMobile.H2};
        font-family: "Poppins", sans-serif;
        font-weight: 600; /* Semi-bold */
        @media (min-width: 768px) {
          font-size: ${textWeb.H2};
          font-family: "Poppins", sans-serif;
          font-weight: 600;
        }
      `;
    case "H3":
      return css`
        font-size: ${textMobile.H3};
        font-family: "Poppins", sans-serif;
        font-weight: 500; /* Medium */
        @media (min-width: 768px) {
          font-size: ${textWeb.H3};
          font-family: "Poppins", sans-serif;
          font-weight: 500;
        }
      `;
    case "Body-lg":
      return css`
        font-size: ${textWeb.body.lg};
        font-family: "Inter", sans-serif;
        font-weight: 400;
      `;
    case "Body-md":
      return css`
        font-size: ${textWeb.body.md};
        font-family: "Inter", sans-serif;
        font-weight: 400;
      `;
    case "Button":
      return css`
        font-size: ${textWeb.button};
        font-family: "Poppins", sans-serif;
        font-weight: 600;
      `;
    case "Nav":
      return css`
        font-size: ${textWeb.nav};
        font-family: "Poppins", sans-serif;
        font-weight: 600;
      `;
    case "Footer":
      return css`
        font-size: ${textWeb.footer};
        font-family: "Poppins", sans-serif;
        font-weight: 600;
      `;
    default:
      return css`
        font-size: ${textWeb.body.md};
        font-family: "Inter", sans-serif;
        font-weight: 400;
      `;
  }
};

export const Text = ({
  size = "Body",
  color = "blackText",
  children,
  as = "div",
}: FontProps) => {
  return (
    <StyledText as={as} $variant={size} $color={color}>
      {children}
    </StyledText>
  );
};

const StyledText = styled.p<StyledTextProps>`
  margin: 0;
  color: ${({ $color }) => colors[$color]};
  ${({ $variant }) => getTextSize($variant)}
`;

export default Text;
