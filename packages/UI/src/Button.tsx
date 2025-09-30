import styled, { css } from "styled-components";
import { colors, radius } from "./styles";
import Text from "./font";
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
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  buttonVariant: buttonVariant;
  disabled?: boolean;
}
interface styledButtonProps {
  $buttonVariant: buttonVariant;
}
export const Button = ({
  label,
  onClick,
  type = "button",
  buttonVariant = "primary",
  disabled = false,
}: ButtonProps) => {
  const textColor = textColorsConfig[buttonVariant];
  return (
    <StyledButton
      type={type}
      onClick={disabled ? undefined : onClick}
      $buttonVariant={buttonVariant}
      disabled={disabled || buttonVariant === "disabled"}
    >
      <Text size="Button" color={textColor}>
        {label}
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
