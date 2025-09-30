import React, { InputHTMLAttributes, forwardRef } from "react";
import styled, { css } from "styled-components";
import { colors, radius, textWeb } from "./styles";

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
      background-color: #fff;
    }

    &:hover {
      background-color: #fff;
    }

    &:active {
      background-color: #fff;
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
      background-color: #fff;
    }

    &:hover {
      background-color: #fff;
    }

    &:active {
      background-color: #fff;
    }
  `,
  success: css`
    border: 1px solid ${colors.ok};
    background-color: #fff;
    color: ${colors.blackText};

    &:focus {
      outline: none;
      border-color: ${colors.okHover};
      background-color: #fff;
    }

    &:hover {
      background-color: #fff;
    }

    &:active {
      background-color: #fff;
    }
  `,
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-size: ${textWeb.body.md};
  font-family: "Inter Regular";
  color: ${colors.blueText};
`;

const StyledInput = styled.input<{ $variant: InputVariant; $size: InputSize }>`
  ${({ $size }) => sizeStyles[$size]};
  ${({ $variant }) => variantStyles[$variant]};
`;

const Hint = styled.span`
  font-size: ${textWeb.body.md};
  font-family: "Inter Regular";
  color: ${colors.greyText};
`;

const ErrorText = styled.span`
  font-size: ${textWeb.body.md};
  font-family: "Inter Regular";
  color: ${colors.critical};
`;

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { label, hint, error, variant = "default", inputSize = "md", id, ...rest },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;

    return (
      <InputWrapper>
        {label && <Label htmlFor={inputId}>{label}</Label>}

        <StyledInput
          id={inputId}
          ref={ref}
          $variant={error ? "error" : variant}
          $size={inputSize}
          aria-invalid={!!error}
          {...rest}
        />

        {error ? <ErrorText>{error}</ErrorText> : label && <Hint>{hint}</Hint>}
      </InputWrapper>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
