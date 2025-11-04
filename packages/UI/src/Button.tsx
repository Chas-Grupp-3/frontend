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
    background-color: ${colors.disabled};
    cursor: not-allowed;
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
  const textColor = textColorsConfig[disabled ? "disabled" : buttonVariant];
  return (
    <StyledButton
      type={type}
      onClick={disabled ? undefined : onClick}
      $buttonVariant={disabled ? "disabled" : buttonVariant}
      disabled={disabled || buttonVariant === "disabled"}
      role="button"
      aria-disabled={disabled || buttonVariant === "disabled"}
      aria-pressed="false"
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
