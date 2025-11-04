import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Text } from "../src/Text/Text";

describe("Text Component", () => {
  describe("Basic Rendering", () => {
    it("renders basic text", () => {
      render(<Text>Hello World</Text>);
      const text = screen.getByText("Hello World");
      expect(text).toBeInTheDocument();
    });

    it("renders with default variant (body)", () => {
      render(<Text>Default text</Text>);
      const text = screen.getByText("Default text");
      expect(text.tagName.toLowerCase()).toBe("p");
    });

    it("renders with default color (blueText)", () => {
      render(<Text>Colored text</Text>);
      const text = screen.getByText("Colored text");
      expect(text).toBeInTheDocument();
    });
  });

  describe("Text Variants", () => {
    it("renders h1 variant with correct element", () => {
      render(<Text variant="h1">Heading 1</Text>);
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Heading 1");
    });

    it("renders h2 variant with correct element", () => {
      render(<Text variant="h2">Heading 2</Text>);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Heading 2");
    });

    it("renders h3 variant with correct element", () => {
      render(<Text variant="h3">Heading 3</Text>);
      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Heading 3");
    });

    it("renders body variant with paragraph element", () => {
      render(<Text variant="body">Body text</Text>);
      const text = screen.getByText("Body text");
      expect(text.tagName.toLowerCase()).toBe("p");
    });

    it("renders body-lg variant with paragraph element", () => {
      render(<Text variant="body-lg">Large body text</Text>);
      const text = screen.getByText("Large body text");
      expect(text.tagName.toLowerCase()).toBe("p");
    });

    it("renders body-sm variant with paragraph element", () => {
      render(<Text variant="body-sm">Small body text</Text>);
      const text = screen.getByText("Small body text");
      expect(text.tagName.toLowerCase()).toBe("p");
    });

    it("renders body-smBold variant with paragraph element", () => {
      render(<Text variant="body-smBold">Small bold text</Text>);
      const text = screen.getByText("Small bold text");
      expect(text.tagName.toLowerCase()).toBe("p");
    });

    it("renders label variant with label element", () => {
      render(<Text variant="label">Label text</Text>);
      const label = screen.getByText("Label text");
      expect(label.tagName.toLowerCase()).toBe("label");
    });

    it("renders button variant with span element", () => {
      render(<Text variant="button">Button text</Text>);
      const text = screen.getByText("Button text");
      expect(text.tagName.toLowerCase()).toBe("span");
    });

    it("renders nav variant with nav element", () => {
      render(<Text variant="nav">Navigation text</Text>);
      const nav = screen.getByText("Navigation text");
      expect(nav.tagName.toLowerCase()).toBe("nav");
    });
  });

  describe("Color Props", () => {
    it("renders with primary color", () => {
      render(<Text color="primary">Primary text</Text>);
      const text = screen.getByText("Primary text");
      expect(text).toBeInTheDocument();
    });

    it("renders with secondary color", () => {
      render(<Text color="secondary">Secondary text</Text>);
      const text = screen.getByText("Secondary text");
      expect(text).toBeInTheDocument();
    });

    it("renders with blackText color", () => {
      render(<Text color="blackText">Black text</Text>);
      const text = screen.getByText("Black text");
      expect(text).toBeInTheDocument();
    });

    it("renders with greyText color", () => {
      render(<Text color="greyText">Grey text</Text>);
      const text = screen.getByText("Grey text");
      expect(text).toBeInTheDocument();
    });

    it("renders with cardText color", () => {
      render(<Text color="cardText">Card text</Text>);
      const text = screen.getByText("Card text");
      expect(text).toBeInTheDocument();
    });
  });

  describe("Label Functionality", () => {
    it("renders label with htmlFor attribute", () => {
      render(
        <Text variant="label" htmlFor="input-id">
          Label for input
        </Text>
      );
      const label = screen.getByText("Label for input");
      expect(label.tagName.toLowerCase()).toBe("label");
      expect(label).toHaveAttribute("for", "input-id");
    });

    it("works as label without htmlFor", () => {
      render(<Text variant="label">Standalone label</Text>);
      const label = screen.getByText("Standalone label");
      expect(label.tagName.toLowerCase()).toBe("label");
      expect(label).not.toHaveAttribute("for");
    });
  });

  describe("Children Content", () => {
    it("renders string children", () => {
      render(<Text>Simple string</Text>);
      expect(screen.getByText("Simple string")).toBeInTheDocument();
    });

    it("renders number children", () => {
      render(<Text>{42}</Text>);
      expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("renders multiple text nodes", () => {
      render(<Text>Hello World</Text>);
      expect(screen.getByText("Hello World")).toBeInTheDocument();
    });

    it("renders with nested elements", () => {
      render(
        <Text>
          Text with <strong>bold</strong> content
        </Text>
      );
      expect(screen.getByText(/Text with/)).toBeInTheDocument();
      expect(screen.getByText("bold")).toBeInTheDocument();
    });

    it("renders with content", () => {
      render(<Text data-testid="with-content">Some content</Text>);
      const text = screen.getByTestId("with-content");
      expect(text).toBeInTheDocument();
      expect(text).toHaveTextContent("Some content");
    });
  });

  describe("Component Props", () => {
    it("accepts data attributes", () => {
      render(<Text data-testid="custom-text">Custom data</Text>);
      const text = screen.getByTestId("custom-text");
      expect(text).toBeInTheDocument();
    });

    it("renders with correct HTML element for variant", () => {
      render(
        <Text variant="button" data-testid="button-text">
          Button text
        </Text>
      );
      const text = screen.getByTestId("button-text");
      expect(text.tagName.toLowerCase()).toBe("span");
    });

    it("supports htmlFor on labels", () => {
      render(
        <Text variant="label" htmlFor="test-input">
          Test label
        </Text>
      );
      const label = screen.getByText("Test label");
      expect(label).toHaveAttribute("for", "test-input");
    });

    it("renders different variants with correct elements", () => {
      render(
        <Text variant="nav" data-testid="nav-text">
          Navigation
        </Text>
      );
      const nav = screen.getByTestId("nav-text");
      expect(nav.tagName.toLowerCase()).toBe("nav");
    });
  });

  describe("Accessibility", () => {
    it("heading variants have correct accessibility roles", () => {
      render(
        <div>
          <Text variant="h1">Main Heading</Text>
          <Text variant="h2">Sub Heading</Text>
          <Text variant="h3">Section Heading</Text>
        </div>
      );

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Main Heading"
      );
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "Sub Heading"
      );
      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
        "Section Heading"
      );
    });

    it("label variant creates proper label element", () => {
      render(
        <Text variant="label" htmlFor="test-input">
          Input Label
        </Text>
      );
      const label = screen.getByText("Input Label");
      expect(label.tagName.toLowerCase()).toBe("label");
    });

    it("renders semantic HTML elements correctly", () => {
      render(<Text variant="nav">Navigation text</Text>);
      const nav = screen.getByText("Navigation text");
      expect(nav.tagName.toLowerCase()).toBe("nav");
    });
  });

  describe("Combination Tests", () => {
    it("combines variant and color", () => {
      render(
        <Text variant="h2" color="primary">
          Primary Heading
        </Text>
      );
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent("Primary Heading");
    });

    it("combines label variant with htmlFor and color", () => {
      render(
        <Text variant="label" htmlFor="email" color="greyText">
          Email
        </Text>
      );
      const label = screen.getByText("Email");
      expect(label.tagName.toLowerCase()).toBe("label");
      expect(label).toHaveAttribute("for", "email");
    });

    it("combines variant, color and data attributes", () => {
      render(
        <Text variant="body-sm" color="cardText" data-testid="full-test">
          Fully configured text
        </Text>
      );

      const text = screen.getByTestId("full-test");
      expect(text).toHaveTextContent("Fully configured text");
      expect(text.tagName.toLowerCase()).toBe("p");
    });
  });

  describe("Edge Cases", () => {
    it("handles basic rendering", () => {
      render(<Text data-testid="basic-text">Basic text</Text>);
      const text = screen.getByTestId("basic-text");
      expect(text).toBeInTheDocument();
    });

    it("handles text content properly", () => {
      render(<Text data-testid="text-content">Test content</Text>);
      const text = screen.getByTestId("text-content");
      expect(text).toBeInTheDocument();
      expect(text).toHaveTextContent("Test content");
    });

    it("handles array of strings", () => {
      render(<Text>{["Hello", " ", "World"]}</Text>);
      expect(screen.getByText("Hello World")).toBeInTheDocument();
    });

    it("works without any props", () => {
      render(<Text>Minimal text</Text>);
      const text = screen.getByText("Minimal text");
      expect(text.tagName.toLowerCase()).toBe("p");
    });
  });
});
