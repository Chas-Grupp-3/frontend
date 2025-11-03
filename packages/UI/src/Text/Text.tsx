import type { ReactNode, HTMLAttributes } from "react";
import styled from "styled-components";
import { colors } from "../styles";
import { textVariantsConfig } from "./textConfig";
import type { TextVariant } from "./textConfig";

interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  color?: keyof typeof colors;
  children: ReactNode;
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
  ...rest
}: TextProps) => {
  return (
    <StyledText $variant={variant} $color={color} {...rest}>
      {children}
    </StyledText>
  );
};

export default Text;
