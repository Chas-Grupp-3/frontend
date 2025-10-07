import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { colors, radius, textWeb } from "./styles";
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
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;

    return (
      <InputWrapper>
        {label && (
          <TextWrapper>
            <Text variant="label" htmlFor={inputId}>
              {label}
            </Text>
          </TextWrapper>
        )}

        <StyledInput
          id={inputId}
          ref={ref}
          $variant={error ? "error" : variant}
          $size={inputSize}
          aria-invalid={!!error}
          {...rest}
        />
        <TextWrapper>
          {error && <Text color="critical">{error}</Text>}
          {!error && hint && (
            <Text color="greyText" variant="body">
              {hint}
            </Text>
          )}
        </TextWrapper>
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
    border: 1px solid ${colors.greyLines};
    background-color: #fff;
    color: ${colors.blackText};

    &:focus {
      outline: none;
      border-color: ${colors.primary};
    }
  `,
  error: css`
    border: 1px solid ${colors.critical};
    background-color: #fff;
    color: ${colors.blackText};

    &:focus {
      outline: none;
      border-color: ${colors.criticalHover};
      box-shadow: 0 0 0 2px ${colors.criticalHover};
    }
  `,
  success: css`
    border: 1px solid ${colors.ok};
    background-color: #fff;
    color: ${colors.blackText};

    &:focus {
      outline: none;
      border-color: ${colors.okHover};
    }
  `,
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;
const TextWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding-left: 0.2rem;
`;

const StyledInput = styled.input<{ $variant: InputVariant; $size: InputSize }>`
  ${({ $size }) => sizeStyles[$size]};
  ${({ $variant }) => variantStyles[$variant]};
`;
