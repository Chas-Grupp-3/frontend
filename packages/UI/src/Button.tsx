import styled from "styled-components";
import { colors, radius } from "./styles";
import Text from "./font";

type buttonVariant = "primary" | "secondary" | "disabled" | "destructive";

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
  const textColor: keyof typeof colors =
    buttonVariant === "primary"
      ? "accent"
      : buttonVariant === "secondary"
        ? "primary"
        : buttonVariant === "disabled"
          ? "greyText"
          : "pause";

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
  border: 2px solid ${colors.primary};

  ${({ $buttonVariant }) =>
    $buttonVariant === "primary"
      ? `
      background-color: ${colors.primary};
      &:hover{
      background-color: ${colors.buttonHover};
      }
    `
      : $buttonVariant === "secondary"
        ? `
      background-color: ${colors.background};
      &:hover{
      background-color: ${colors.pause};
      }
    `
        : $buttonVariant === "disabled"
          ? `
      background-color: ${colors.background};
      border: none;
      }
    `
          : $buttonVariant === "destructive"
            ? `
      background-color: ${colors.critical};
      border: none;
      &:hover{
      background-color: ${colors.criticalHover};
      border: none;
      }
    `
            : `
    background-color: ${colors.background};
      }
    `}
`;

export default Button;
