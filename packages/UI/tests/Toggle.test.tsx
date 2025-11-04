import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Toggle } from "../src/Toggle/Toggle";
import type { ToggleOption } from "../src/Toggle/types";

const mockOptions: ToggleOption[] = [
  { value: "option1", label: "Option 1", icon: "solidWhiteTemp" },
  { value: "option2", label: "Option 2", icon: "humidity" },
  { value: "option3", label: "Option 3", icon: "solidWhiteTemp", count: 5 },
];

describe("Toggle Component", () => {
  describe("Rendering", () => {
    it("renders all toggle options", () => {
      const mockOnChange = vi.fn();
      render(
        <Toggle
          name="test-toggle"
          options={mockOptions}
          onChange={mockOnChange}
        />
      );

      // Check that radiogroup is rendered
      expect(screen.getByRole("radiogroup")).toBeInTheDocument();

      // Check that all radio buttons are rendered
      const radioButtons = screen.getAllByRole("radio");
      expect(radioButtons).toHaveLength(3);

      // Check that values are present
      expect(screen.getByDisplayValue("option1")).toBeInTheDocument();
      expect(screen.getByDisplayValue("option2")).toBeInTheDocument();
      expect(screen.getByDisplayValue("option3")).toBeInTheDocument();
    });

    it("renders with count when provided", () => {
      const mockOnChange = vi.fn();
      render(
        <Toggle
          name="test-toggle"
          options={mockOptions}
          onChange={mockOnChange}
        />
      );

      // Check that count is displayed for option3
      expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("renders dividers between options", () => {
      const mockOnChange = vi.fn();
      render(
        <Toggle
          name="test-toggle"
          options={mockOptions}
          onChange={mockOnChange}
        />
      );

      // Check for divider elements by class since they don't have separator role yet
      const container = screen.getByRole("radiogroup");
      const dividers = container.querySelectorAll('div[class*="sc-bRKDuR"]');
      expect(dividers).toHaveLength(2);
    });
  });

  describe("ARIA Accessibility", () => {
    it("has radiogroup role", () => {
      const mockOnChange = vi.fn();
      render(
        <Toggle
          name="test-toggle"
          options={mockOptions}
          onChange={mockOnChange}
        />
      );

      const radiogroup = screen.getByRole("radiogroup");
      expect(radiogroup).toBeInTheDocument();
    });

    it("has proper radio button structure", () => {
      const mockOnChange = vi.fn();
      render(
        <Toggle
          name="test-toggle"
          options={mockOptions}
          value="option1"
          onChange={mockOnChange}
        />
      );

      const radioButtons = screen.getAllByRole("radio");

      // First radio should be checked
      expect(radioButtons[0]).toBeChecked();

      // Others should not be checked
      expect(radioButtons[1]).not.toBeChecked();
      expect(radioButtons[2]).not.toBeChecked();
    });

    it("has proper alt text on images", () => {
      const mockOnChange = vi.fn();
      render(
        <Toggle
          name="test-toggle"
          options={mockOptions}
          onChange={mockOnChange}
        />
      );

      // Check that images have proper alt text
      expect(screen.getByAltText("Option 1")).toBeInTheDocument();
      expect(screen.getByAltText("Option 2")).toBeInTheDocument();
      expect(screen.getByAltText("Option 3")).toBeInTheDocument();
    });
  });

  describe("User Interactions", () => {
    it("calls onChange when option is selected", () => {
      const mockOnChange = vi.fn();

      render(
        <Toggle
          name="test-toggle"
          options={mockOptions}
          onChange={mockOnChange}
        />
      );

      const secondOption = screen.getByDisplayValue("option2");
      fireEvent.click(secondOption);

      expect(mockOnChange).toHaveBeenCalledWith("option2");
    });

    it("handles click events properly", () => {
      const mockOnChange = vi.fn();

      render(
        <Toggle
          name="test-toggle"
          options={mockOptions}
          value="option1"
          onChange={mockOnChange}
        />
      );

      const thirdOption = screen.getByDisplayValue("option3");
      fireEvent.click(thirdOption);

      expect(mockOnChange).toHaveBeenCalledWith("option3");
    });

    it("respects disabled state", () => {
      const mockOnChange = vi.fn();

      render(
        <Toggle
          name="test-toggle"
          options={mockOptions}
          onChange={mockOnChange}
          disabled={true}
        />
      );

      const radioButtons = screen.getAllByRole("radio");

      // All buttons should be disabled
      radioButtons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });
  });

  describe("State Management", () => {
    it("shows correct active state", () => {
      const mockOnChange = vi.fn();

      render(
        <Toggle
          name="test-toggle"
          options={mockOptions}
          value="option2"
          onChange={mockOnChange}
        />
      );

      const radioButtons = screen.getAllByRole("radio");
      expect(radioButtons[0]).not.toBeChecked();
      expect(radioButtons[1]).toBeChecked();
      expect(radioButtons[2]).not.toBeChecked();
    });

    it("handles no initial selection", () => {
      const mockOnChange = vi.fn();

      render(
        <Toggle
          name="test-toggle"
          options={mockOptions}
          onChange={mockOnChange}
        />
      );

      const radioButtons = screen.getAllByRole("radio");
      radioButtons.forEach((button) => {
        expect(button).not.toBeChecked();
      });
    });
  });

  describe("Props Validation", () => {
    it("handles different icon sizes", () => {
      const mockOnChange = vi.fn();

      render(
        <Toggle
          name="test-toggle"
          options={mockOptions}
          onChange={mockOnChange}
          iconSize="lg"
        />
      );

      // Component should render without errors
      expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const mockOnChange = vi.fn();

      render(
        <Toggle
          name="test-toggle"
          options={mockOptions}
          onChange={mockOnChange}
          className="custom-toggle"
        />
      );

      const toggle = screen.getByRole("radiogroup");
      expect(toggle).toHaveClass("custom-toggle");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty options array", () => {
      const mockOnChange = vi.fn();

      render(
        <Toggle name="test-toggle" options={[]} onChange={mockOnChange} />
      );

      expect(screen.getByRole("radiogroup")).toBeInTheDocument();
      expect(screen.queryAllByRole("radio")).toHaveLength(0);
    });

    it("handles single option", () => {
      const singleOption: ToggleOption[] = [
        { value: "single", label: "Single Option", icon: "solidWhiteTemp" },
      ];
      const mockOnChange = vi.fn();

      render(
        <Toggle
          name="test-toggle"
          options={singleOption}
          onChange={mockOnChange}
        />
      );

      expect(screen.getAllByRole("radio")).toHaveLength(1);
      // Should have no dividers for single option
      const container = screen.getByRole("radiogroup");
      const dividers = container.querySelectorAll('div[class*="sc-bRKDuR"]');
      expect(dividers).toHaveLength(0);
    });
  });
});
