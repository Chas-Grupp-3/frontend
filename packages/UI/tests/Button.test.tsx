import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "../src/Button"; // Using the alias we set up

describe("Button", () => {
  it("renders with children", () => {
    render(<Button> Test Button </Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Test Button");
  });
});
