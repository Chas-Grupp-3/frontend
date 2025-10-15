import { forwardRef, useState } from "react";
import type { InputHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { colors, radius, textMobile, textWeb } from "./styles";
import { Text } from "./Text/Text";

type InputVariant = "default" | "error" | "success";
type InputSize = "sm" | "md" | "lg";

interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  hint?: string;
  error?: string;
  variant?: InputVariant;
  inputSize?: InputSize;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { label, hint, error, variant = "default", inputSize = "md", id, ...rest },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [inputValue, setInputValue] = useState(
      rest.defaultValue || rest.value || ""
    );
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;

    const hasValue = Boolean(
      rest.value !== undefined
        ? String(rest.value).length > 0
        : String(inputValue).length > 0
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (rest.value === undefined) {
        setInputValue(e.target.value);
      }
      rest.onChange?.(e);
    };

    return (
      <InputWrapper>
        <InputContainer>
          <StyledInput
            id={inputId}
            ref={ref}
            $variant={error ? "error" : variant}
            $size={inputSize}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={handleChange}
            aria-invalid={!!error}
            {...rest}
          />
          {label && (
            <FloatingLabel
              htmlFor={inputId}
              $focused={focused || hasValue}
              $error={!!error}
            >
              {label}
            </FloatingLabel>
          )}
        </InputContainer>

        <HintWrapper>
          {error && <Text color="critical">{error}</Text>}
          {!error && hint && (
            <Text color="greyText" variant="body">
              {hint}
            </Text>
          )}
        </HintWrapper>
      </InputWrapper>
    );
  }
);

export default TextInput;

const sizeStyles: Record<InputSize, ReturnType<typeof css>> = {
  sm: css`
    font-size: ${textWeb.body.md};
    padding: 6px 10px;
    border-radius: ${radius.input};
  `,
  md: css`
    font-size: ${textWeb.body.md};
    padding: 8px 12px;
    border-radius: ${radius.input};
  `,
  lg: css`
    font-size: ${textWeb.body.lg};
    padding: 12px 16px;
    border-radius: ${radius.input};
  `,
};

const variantStyles: Record<InputVariant, ReturnType<typeof css>> = {
  default: css`
    border: 1px solid ${colors.pause};
    background-color: #fff;
    color: ${colors.blueText};
    padding: 1rem;

    &:focus {
      outline: none;
      border-color: ${colors.primary};
    }
  `,
  error: css`
    border: 1px solid ${colors.critical};
    background-color: #fff;
    padding: 1rem;

    &:focus {
      outline: none;
      border-color: ${colors.criticalHover};
      box-shadow: 0 0 0 2px ${colors.criticalHover};
    }
  `,
  success: css`
    border: 1px solid ${colors.ok};
    background-color: #fff;
    padding: 1rem;

    &:focus {
      outline: none;
      border-color: ${colors.okHover};
    }
  `,
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  position: relative;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input<{ $variant: InputVariant; $size: InputSize }>`
  ${({ $size }) => sizeStyles[$size]};
  ${({ $variant }) => variantStyles[$variant]};
  width: 100%;
  font-family: ${textWeb.body.md.fontFamily};
  color: ${colors.blueText};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: transparent;
  }
`;

const FloatingLabel = styled.label<{ $focused: boolean; $error: boolean }>`
  position: absolute;
  left: 1rem;
  top: ${({ $focused }) => ($focused ? "6px" : "50%")};
  transform: translateY(${({ $focused }) => ($focused ? "0" : "-50%")});
  font-size: ${({ $focused }) => ($focused ? "10px" : textMobile.body.md)};
  font-family: ${textMobile.body.md};
  font-weight: ${textMobile.body.md};
  color: ${({ $error }) => ($error ? colors.critical : colors.blueText)};
  background-color: #fff;
  padding: 0 4px;
  transition: all 0.2s ease;
  pointer-events: none;
`;

const HintWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0.25rem;
`;
