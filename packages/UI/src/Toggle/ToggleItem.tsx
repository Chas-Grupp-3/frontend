import styled from "styled-components";
import { Icon } from "../icon";
import { Text } from "../Text/Text";
import { colors } from "../styles";
import type { ToggleOption } from "./types";

interface ToggleItemProps {
  option: ToggleOption;
  name: string;
  isActive: boolean;
  disabled: boolean;
  iconSize: "sm" | "md" | "lg" | number;
  onChange: (value: string) => void;
}

const ToggleItem = ({
  option,
  name,
  isActive,
  disabled,
  iconSize,
  onChange,
}: ToggleItemProps) => {
  return (
    <ToggleLabel $isActive={isActive} $disabled={disabled} title={option.label}>
      <HiddenRadio
        type="radio"
        name={name}
        value={option.value}
        checked={isActive}
        onChange={() => onChange(option.value)}
        disabled={disabled}
      />
      <ContentWrapper>
        <IconWrapper>
          <Icon
            name={option.icon}
            size={iconSize}
            alt={option.label || option.value}
          />
        </IconWrapper>
        {option.count !== undefined && (
          <CountWrapper>
            <Text variant="button" color="primary">
              {option.count}
            </Text>
          </CountWrapper>
        )}
      </ContentWrapper>
    </ToggleLabel>
  );
};

const ToggleLabel = styled.label<{ $isActive: boolean; $disabled: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;

  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  background-color: ${({ $isActive }) =>
    $isActive ? colors.accent : colors.background};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};

  &:hover:not(:disabled) {
    border-color: ${({ $isActive }) =>
      $isActive ? colors.buttonHover : colors.blueLines};
    background-color: ${({ $isActive }) =>
      $isActive ? colors.secondary : colors.whiteBackground};
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HiddenRadio = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CountWrapper = styled.span`
  display: flex;
  align-items: center;
`;

export default ToggleItem;
