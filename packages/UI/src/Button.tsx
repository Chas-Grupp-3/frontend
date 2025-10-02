import styled, { css } from "styled-components";
import { colors, radius } from "./styles";
import Text from "./Text/Text";
type buttonVariant = "primary" | "secondary" | "disabled" | "destructive";

const buttonVariantsConfig = {
  primary: css`
    background-color: ${colors.primary};
    border: 2px solid ${colors.primary};
    &:hover {
      background-color: ${colors.buttonHover};
      border: 2px solid ${colors.buttonHover};
    }
  `,
  secondary: css`
    background-color: ${colors.background};
    border: 2px solid ${colors.primary};
    &:hover {
      background-color: ${colors.pause};
    }
  `,
  disabled: css`
    background-color: ${colors.background};
    border: none;
  `,
  destructive: css`
    background-color: ${colors.critical};
    border: none;
    &:hover {
      background-color: ${colors.criticalHover};
    }
  `,
};
const textColorsConfig: Record<buttonVariant, keyof typeof colors> = {
  primary: "accent",
  secondary: "primary",
  disabled: "greyText",
  destructive: "background",
};
interface ButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  buttonVariant?: buttonVariant;
  disabled?: boolean;
  children: React.ReactNode;
}
interface styledButtonProps {
  $buttonVariant: buttonVariant;
}
export const Button = ({
  onClick,
  type = "button",
  buttonVariant = "primary",
  disabled = false,
  children,
}: ButtonProps) => {
  const textColor = textColorsConfig[buttonVariant];
  return (
    <StyledButton
      type={type}
      onClick={disabled ? undefined : onClick}
      $buttonVariant={buttonVariant}
      disabled={disabled || buttonVariant === "disabled"}
    >
      <Text variant="button" color={textColor}>
        {children}
      </Text>
    </StyledButton>
  );
};
const StyledButton = styled.button<styledButtonProps>`
  border-radius: ${radius.button};
  padding: 8px 16px;

  ${({ $buttonVariant }) => buttonVariantsConfig[$buttonVariant]}
`;
export default Button;
