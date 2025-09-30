import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/Button"; // Using the alias we set up

describe("Button", () => {
  it("renders with label", () => {
    render(<Button label="Test Button" />);
    expect(screen.getByRole("button")).toHaveTextContent("Test Button");
  });
});
