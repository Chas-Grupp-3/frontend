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
        font-family: "Poppins Bold";
        @media (min-width: 768px) {
          font-size: ${textWeb.H1};
          font-family: "Poppins Bold";
        }
      `;
    case "H2":
      return css`
        font-size: ${textMobile.H2};
        font-family: "Poppins semiBold";
        @media (min-width: 768px) {
          font-size: ${textWeb.H2};
          font-family: "Poppins Bold";
        }
      `;
    case "H3":
      return css`
        font-size: ${textMobile.H3};
        font-family: "Poppins medium";
        @media (min-width: 768px) {
          font-size: ${textWeb.H3};
          font-family: "Poppins semiBold";
        }
      `;
    case "Body-lg":
      return css`
        font-size: ${textWeb.body.lg};
        font-family: "Inter Regular";
      `;
    case "Body-md":
      return css`
        font-size: ${textWeb.body.md};
        font-family: "Inter Regular";
      `;
    case "Body-sm":
      return css`
        font-size: ${textWeb.body.sm};
        font-family: "Inter Regular";
      `;
    case "Button":
      return css`
        font-size: ${textWeb.button};
        font-family: "Poppins semiBold";
      `;
    case "Nav":
      return css`
        font-size: ${textWeb.nav};
        font-family: "Poppins semiBold";
      `;
    case "Footer":
      return css`
        font-size: ${textWeb.footer};
        font-family: "Poppins semiBold";
      `;
    default:
      return css`
        font-size: ${textWeb.body.md};
        font-family: "Inter Regular";
      `;
  }
};

const StyledText = styled.p<StyledTextProps>`
  margin: 0;
  color: ${({ $color }) => colors[$color]};
  ${({ $variant }) => getTextSize($variant)}
`;
const Text = ({
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

export default Text;
