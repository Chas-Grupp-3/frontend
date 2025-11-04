import styled from "styled-components";
import Divider from "./Divider";
import ToggleItem from "./ToggleItem";
import { Fragment } from "react/jsx-runtime";
import type { ToggleOption } from "./types";

interface ToggleProps {
  name: string;
  options: ToggleOption[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  iconSize?: "sm" | "md" | "lg" | number;
}

export const Toggle = ({
  name,
  options,
  value,
  onChange,
  className,
  disabled = false,
  iconSize = "md",
}: ToggleProps) => {
  return (
    <ToggleContainer
      className={className}
      role="radiogroup"
      aria-label={`${name} selection`}
      aria-disabled={disabled}
    >
      {options.map((option, index) => (
        <Fragment key={option.value}>
          <ToggleItem
            option={option}
            name={name}
            isActive={value === option.value}
            disabled={disabled}
            iconSize={iconSize}
            onChange={onChange}
          />
          {index < options.length - 1 && <Divider />}
        </Fragment>
      ))}
    </ToggleContainer>
  );
};

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;
