import type { ReactNode } from "react";
import styled from "styled-components";
import { colors } from "../styles";
import { textVariantsConfig, defaultElementMap } from "./textConfig";
import type { TextVariant } from "./textConfig";

interface TextProps {
  variant?: TextVariant;
  color?: keyof typeof colors;
  children: ReactNode;
  className?: string;
  htmlFor?: string;
}

interface StyledTextProps {
  $variant: TextVariant;
  $color: keyof typeof colors;
}

const StyledText = styled.div<StyledTextProps>`
  margin: 0;
  color: ${({ $color }) => colors[$color]};
  ${({ $variant }) => textVariantsConfig[$variant]}
`;

export const Text = ({
  variant = "body",
  color = "blueText",
  children,
  htmlFor,
}: TextProps) => {
  const element = defaultElementMap[variant];

  return (
    <StyledText
      as={element}
      $variant={variant}
      $color={color}
      htmlFor={htmlFor}
    >
      {children}
    </StyledText>
  );
};

export default Text;
