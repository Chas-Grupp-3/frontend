import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TextInput } from "../src/TextInput";

describe("TextInput Component", () => {
  describe("Basic Rendering", () => {
    it("renders basic input", () => {
      render(<TextInput />);
      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
    });

    it("renders with custom id", () => {
      render(<TextInput id="test-input" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("id", "test-input");
    });

    it("renders with placeholder", () => {
      render(<TextInput placeholder="Enter text..." />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("placeholder", "Enter text...");
    });
  });

  describe("Label Functionality", () => {
    it("renders with label", () => {
      render(<TextInput label="Username" />);
      const input = screen.getByRole("textbox");
      const label = screen.getByText("Username");

      expect(input).toBeInTheDocument();
      expect(label).toBeInTheDocument();
    });

    it("associates label with input", () => {
      render(<TextInput id="username" label="Username" />);
      const input = screen.getByRole("textbox");
      const label = screen.getByText("Username");

      expect(label).toHaveAttribute("for", "username");
      expect(input).toHaveAttribute("id", "username");
    });

    it("works without label", () => {
      render(<TextInput />);
      expect(screen.queryByRole("label")).not.toBeInTheDocument();
    });
  });

  describe("Input Interactions", () => {
    it("handles onChange", () => {
      const handleChange = vi.fn();
      render(<TextInput onChange={handleChange} />);

      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "test" } });

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(input).toHaveValue("test");
    });

    it("handles focus and blur", () => {
      render(<TextInput />);
      const input = screen.getByRole("textbox");

      // Focus the input
      input.focus();
      expect(input).toHaveFocus();

      // Blur the input
      input.blur();
      expect(input).not.toHaveFocus();
    });

    it("handles controlled input", () => {
      const handleChange = vi.fn();
      render(<TextInput value="controlled" onChange={handleChange} />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("controlled");

      fireEvent.change(input, { target: { value: "new value" } });
      expect(handleChange).toHaveBeenCalled();
    });

    it("handles uncontrolled input", () => {
      render(<TextInput defaultValue="default" />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("default");

      fireEvent.change(input, { target: { value: "changed" } });
      expect(input).toHaveValue("changed");
    });
  });

  describe("Input States", () => {
    it("handles disabled state", () => {
      render(<TextInput disabled />);
      const input = screen.getByRole("textbox");
      expect(input).toBeDisabled();
    });

    it("handles required state", () => {
      render(<TextInput required />);
      const input = screen.getByRole("textbox");
      expect(input).toBeRequired();
    });

    it("handles different input types", () => {
      render(<TextInput type="email" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "email");
    });
  });

  describe("Error and Hint Messages", () => {
    it("displays error message", () => {
      render(<TextInput error="This field is required" />);

      const input = screen.getByRole("textbox");
      const errorMessage = screen.getByText("This field is required");

      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(errorMessage).toBeInTheDocument();
    });

    it("displays hint message", () => {
      render(<TextInput hint="Enter your username" />);

      const hint = screen.getByText("Enter your username");
      expect(hint).toBeInTheDocument();
    });

    it("error overrides hint", () => {
      render(<TextInput hint="Hint text" error="Error text" />);

      const error = screen.getByText("Error text");
      const hint = screen.queryByText("Hint text");

      expect(error).toBeInTheDocument();
      expect(hint).not.toBeInTheDocument();
    });
  });

  describe("Input Sizes", () => {
    it("renders with small size", () => {
      render(<TextInput inputSize="sm" data-testid="small-input" />);
      const input = screen.getByTestId("small-input");
      expect(input).toBeInTheDocument();
    });

    it("renders with medium size (default)", () => {
      render(<TextInput data-testid="medium-input" />);
      const input = screen.getByTestId("medium-input");
      expect(input).toBeInTheDocument();
    });

    it("renders with large size", () => {
      render(<TextInput inputSize="lg" data-testid="large-input" />);
      const input = screen.getByTestId("large-input");
      expect(input).toBeInTheDocument();
    });

    it("renders with search size", () => {
      render(<TextInput inputSize="search" data-testid="search-input" />);
      const input = screen.getByTestId("search-input");
      expect(input).toBeInTheDocument();
    });
  });

  describe("Input Variants", () => {
    it("renders with success variant", () => {
      render(<TextInput variant="success" data-testid="success-input" />);
      const input = screen.getByTestId("success-input");
      expect(input).toBeInTheDocument();
    });

    it("renders with error variant", () => {
      render(<TextInput variant="error" data-testid="error-input" />);
      const input = screen.getByTestId("error-input");
      expect(input).toBeInTheDocument();
    });

    it("error prop overrides variant", () => {
      render(<TextInput variant="success" error="Has error" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("Accessibility", () => {
    it("has correct aria-invalid when no error", () => {
      render(<TextInput />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-invalid", "false");
    });

    it("has correct aria-invalid when error exists", () => {
      render(<TextInput error="Error message" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    it("accepts custom ARIA attributes", () => {
      render(<TextInput aria-describedby="help-text" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-describedby", "help-text");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty string value", () => {
      render(<TextInput value="" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("");
    });

    it("handles undefined value", () => {
      render(<TextInput value={undefined} />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("");
    });

    it("works without onChange handler", () => {
      render(<TextInput />);
      const input = screen.getByRole("textbox");

      expect(() => {
        fireEvent.change(input, { target: { value: "test" } });
      }).not.toThrow();
    });

    it("generates unique IDs when not provided", () => {
      const { rerender } = render(<TextInput />);
      const input1 = screen.getByRole("textbox");
      const id1 = input1.getAttribute("id");

      rerender(<TextInput />);
      const input2 = screen.getByRole("textbox");
      const id2 = input2.getAttribute("id");

      expect(id1).toBeTruthy();
      expect(id2).toBeTruthy();
      expect(id1).not.toBe(id2);
    });
  });
});
