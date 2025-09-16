import styled from "styled-components";
import { colors, radius } from "./styles";
import Text from "./font";

type buttonStyle = "primary" | "secondary" | "disabled" | "destructive";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  buttonStyle: buttonStyle;
}

interface styledButtonProps {
  $buttonStyle: buttonStyle;
}

export const Button = ({
  label,
  onClick,
  type = "button",
  buttonStyle = "primary",
}: ButtonProps) => {
  const textColor: keyof typeof colors =
    buttonStyle === "primary"
      ? "accent"
      : buttonStyle === "secondary"
        ? "primary"
        : buttonStyle === "disabled"
          ? "greyText"
          : "pause";

  return (
    <StyledButton type={type} onClick={onClick} $buttonStyle={buttonStyle}>
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
  ${({ $buttonStyle }) =>
    $buttonStyle === "primary"
      ? `
      background-color: ${colors.primary};
      &:hover{
      background-color: ${colors.buttonHover};
      }
    `
      : `
    background-color: ${colors.background};
    `}
`;

export default Button;
