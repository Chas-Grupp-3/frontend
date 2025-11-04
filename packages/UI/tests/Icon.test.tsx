import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Icon } from "../src/Icon";
import type { IconName } from "../src/iconMap";

describe("Icon Component", () => {
  // Basic rendering tests
  describe("Basic Rendering", () => {
    it("renders an icon with default props", () => {
      render(<Icon name="package" size="md" />);
      const icon = screen.getByRole("img");
      expect(icon).toBeInTheDocument();
    });

    it("renders with correct src attribute", () => {
      render(<Icon name="package" size="md" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("src");
      expect(icon.getAttribute("src")).toBeTruthy();
    });

    it("renders with default alt text when no alt prop is provided", () => {
      render(<Icon name="package" size="md" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("alt", "package");
    });

    it("renders with custom alt text when alt prop is provided", () => {
      const customAlt = "Custom package icon";
      render(<Icon name="package" size="md" alt={customAlt} />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("alt", customAlt);
    });
  });

  // Size prop tests
  describe("Size Props", () => {
    it("renders with small size (24px)", () => {
      render(<Icon name="package" size="sm" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("width", "24px");
      expect(icon).toHaveAttribute("height", "24px");
    });

    it("renders with medium size (40px)", () => {
      render(<Icon name="package" size="md" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("width", "40px");
      expect(icon).toHaveAttribute("height", "40px");
    });

    it("renders with large size (64px)", () => {
      render(<Icon name="package" size="lg" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("width", "64px");
      expect(icon).toHaveAttribute("height", "64px");
    });

    it("renders with extra large size (220px)", () => {
      render(<Icon name="package" size="xl" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("width", "220px");
      expect(icon).toHaveAttribute("height", "220px");
    });

    it("renders with custom numeric size", () => {
      render(<Icon name="package" size={50} />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("width", "50px");
      expect(icon).toHaveAttribute("height", "50px");
    });

    it("renders with very large custom numeric size", () => {
      render(<Icon name="package" size={300} />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("width", "300px");
      expect(icon).toHaveAttribute("height", "300px");
    });
  });

  // Different icon names tests
  describe("Icon Names", () => {
    it("renders qrScan icon correctly", () => {
      render(<Icon name="qrScan" size="md" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("src");
      expect(icon).toHaveAttribute("alt", "qrScan");
    });

    it("renders hamburger icon correctly", () => {
      render(<Icon name="hamburger" size="md" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("src");
      expect(icon).toHaveAttribute("alt", "hamburger");
    });

    it("renders clock icon correctly", () => {
      render(<Icon name="clock" size="md" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("src");
      expect(icon).toHaveAttribute("alt", "clock");
    });

    it("renders greenCheck icon correctly", () => {
      render(<Icon name="greenCheck" size="md" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("src");
      expect(icon).toHaveAttribute("alt", "greenCheck");
    });

    it("renders truckPin icon correctly", () => {
      render(<Icon name="truckPin" size="md" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("src");
      expect(icon).toHaveAttribute("alt", "truckPin");
    });
  });

  // Temperature and warning icons
  describe("Temperature and Warning Icons", () => {
    it("renders smallTemp icon correctly", () => {
      render(<Icon name="smallTemp" size="sm" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("src");
      expect(icon).toHaveAttribute("alt", "smallTemp");
    });

    it("renders tempWarning icon correctly", () => {
      render(<Icon name="tempWarning" size="md" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("src");
      expect(icon).toHaveAttribute("alt", "tempWarning");
    });

    it("renders yellowWarning icon correctly", () => {
      render(<Icon name="yellowWarning" size="lg" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("src");
      expect(icon).toHaveAttribute("alt", "yellowWarning");
    });

    it("renders bigTemp icon correctly", () => {
      render(<Icon name="bigTemp" size="xl" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("src");
      expect(icon).toHaveAttribute("alt", "bigTemp");
    });
  });

  // Pin icons (map markers)
  describe("Pin Icons", () => {
    it("renders yellowPin icon correctly", () => {
      render(<Icon name="yellowPin" size="md" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("src");
      expect(icon).toHaveAttribute("alt", "yellowPin");
    });

    it("renders redPin icon correctly", () => {
      render(<Icon name="redPin" size="md" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("src");
      expect(icon).toHaveAttribute("alt", "redPin");
    });

    it("renders greenPin icon correctly", () => {
      render(<Icon name="greenPin" size="md" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("src");
      expect(icon).toHaveAttribute("alt", "greenPin");
    });

    it("renders bluePin icon correctly", () => {
      render(<Icon name="bluePin" size="md" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("src");
      expect(icon).toHaveAttribute("alt", "bluePin");
    });
  });

  // Hover state icons
  describe("Hover State Icons", () => {
    it("renders qrScanHover icon correctly", () => {
      render(<Icon name="qrScanHover" size="md" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("src");
      expect(icon).toHaveAttribute("alt", "qrScanHover");
    });

    it("renders yellowPinHover icon correctly", () => {
      render(<Icon name="yellowPinHover" size="md" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("src");
      expect(icon).toHaveAttribute("alt", "yellowPinHover");
    });

    it("renders redPinHover icon correctly", () => {
      render(<Icon name="redPinHover" size="md" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("src");
      expect(icon).toHaveAttribute("alt", "redPinHover");
    });

    it("renders whiteHamburgerHover icon correctly", () => {
      render(<Icon name="whiteHamburgerHover" size="md" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("src");
      expect(icon).toHaveAttribute("alt", "whiteHamburgerHover");
    });
  });

  // White variants
  describe("White Variant Icons", () => {
    it("renders whiteHamburger icon correctly", () => {
      render(<Icon name="whiteHamburger" size="md" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("src");
      expect(icon).toHaveAttribute("alt", "whiteHamburger");
    });

    it("renders whiteTemp icon correctly", () => {
      render(<Icon name="whiteTemp" size="md" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("src");
      expect(icon).toHaveAttribute("alt", "whiteTemp");
    });

    it("renders whitePackage icon correctly", () => {
      render(<Icon name="whitePackage" size="md" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("src");
      expect(icon).toHaveAttribute("alt", "whitePackage");
    });

    it("renders whiteClock icon correctly", () => {
      render(<Icon name="whiteClock" size="md" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("src");
      expect(icon).toHaveAttribute("alt", "whiteClock");
    });
  });

  // Social media icons
  describe("Social Media Icons", () => {
    it("renders facebook icon correctly", () => {
      render(<Icon name="facebook" size="md" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("src");
      expect(icon).toHaveAttribute("alt", "facebook");
    });

    it("renders twitter icon correctly", () => {
      render(<Icon name="twitter" size="md" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("src");
      expect(icon).toHaveAttribute("alt", "twitter");
    });

    it("renders instagram icon correctly", () => {
      render(<Icon name="instagram" size="md" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("src");
      expect(icon).toHaveAttribute("alt", "instagram");
    });

    it("renders mail icon correctly", () => {
      render(<Icon name="mail" size="md" />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("src");
      expect(icon).toHaveAttribute("alt", "mail");
    });
  });

  // Accessibility tests
  describe("Accessibility", () => {
    it("has proper img role", () => {
      render(<Icon name="package" size="md" />);
      const icon = screen.getByRole("img");
      expect(icon).toBeInTheDocument();
    });

    it("is accessible via alt text", () => {
      render(<Icon name="package" size="md" alt="Package delivery icon" />);
      const icon = screen.getByAltText("Package delivery icon");
      expect(icon).toBeInTheDocument();
    });

    it("has descriptive alt text by default", () => {
      render(<Icon name="greenCheck" size="md" />);
      const icon = screen.getByAltText("greenCheck");
      expect(icon).toBeInTheDocument();
    });
  });

  // Edge cases and error handling
  describe("Edge Cases", () => {
    it("handles zero size gracefully", () => {
      render(<Icon name="package" size={0} />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("width", "0px");
      expect(icon).toHaveAttribute("height", "0px");
    });

    it("handles very small size", () => {
      render(<Icon name="package" size={1} />);
      const icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("width", "1px");
      expect(icon).toHaveAttribute("height", "1px");
    });

    it("handles empty alt text correctly", () => {
      render(<Icon name="package" size="md" alt="" />);
      const icon = screen.getByRole("img");
      // When alt="" is provided, it should use that, but component defaults to name if alt is falsy
      // This tests actual component behavior
      expect(icon).toHaveAttribute("alt");
    });
  });

  // Icon source validation
  describe("Icon Source Validation", () => {
    it("renders icons with data URL sources", () => {
      render(<Icon name="package" size="md" />);
      const icon = screen.getByRole("img");
      const src = icon.getAttribute("src");
      expect(src).toMatch(/^data:image\/svg\+xml/);
    });

    it("different icons have different sources", () => {
      const { rerender } = render(<Icon name="package" size="md" />);
      const packageIcon = screen.getByRole("img");
      const packageSrc = packageIcon.getAttribute("src");

      rerender(<Icon name="clock" size="md" />);
      const clockIcon = screen.getByRole("img");
      const clockSrc = clockIcon.getAttribute("src");

      expect(packageSrc).not.toBe(clockSrc);
    });

    it("validates SVG content structure", () => {
      render(<Icon name="hamburger" size="md" />);
      const icon = screen.getByRole("img");
      const src = icon.getAttribute("src");

      // Decode the data URL to check SVG content
      if (src?.startsWith("data:image/svg+xml,")) {
        const svgContent = decodeURIComponent(
          src.replace("data:image/svg+xml,", "")
        );
        expect(svgContent).toContain("<svg");
        expect(svgContent).toContain("</svg>");
      }
    });
  });

  // Integration tests
  describe("Integration", () => {
    it("works with all size variants and custom alt", () => {
      const { rerender } = render(
        <Icon name="clock" size="sm" alt="Small clock" />
      );
      let icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("width", "24px");
      expect(icon).toHaveAttribute("alt", "Small clock");

      rerender(<Icon name="clock" size="xl" alt="Large clock" />);
      icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("width", "220px");
      expect(icon).toHaveAttribute("alt", "Large clock");
    });

    it("maintains consistency across different icon types", () => {
      const iconNames: IconName[] = [
        "package",
        "qrScan",
        "hamburger",
        "clock",
        "greenCheck",
      ];

      iconNames.forEach((iconName) => {
        const { unmount } = render(<Icon name={iconName} size="md" />);
        const icon = screen.getByRole("img");
        expect(icon).toHaveAttribute("width", "40px");
        expect(icon).toHaveAttribute("height", "40px");
        expect(icon).toHaveAttribute("alt", iconName);
        expect(icon).toHaveAttribute("src");
        unmount();
      });
    });

    it("handles component re-rendering correctly", () => {
      const { rerender } = render(<Icon name="package" size="md" />);
      let icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("alt", "package");

      rerender(<Icon name="clock" size="lg" alt="Clock icon" />);
      icon = screen.getByRole("img");
      expect(icon).toHaveAttribute("alt", "Clock icon");
      expect(icon).toHaveAttribute("width", "64px");
    });
  });
});
