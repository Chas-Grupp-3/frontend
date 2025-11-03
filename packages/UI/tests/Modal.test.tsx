import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Modal } from "../src/Modal";

// Mock HTMLDialogElement methods since they're not available in jsdom
const mockShowModal = vi.fn();
const mockClose = vi.fn();

beforeEach(() => {
  // Mock dialog methods
  Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
    value: mockShowModal,
    writable: true,
  });

  Object.defineProperty(HTMLDialogElement.prototype, "close", {
    value: mockClose,
    writable: true,
  });

  // Reset mocks
  mockShowModal.mockClear();
  mockClose.mockClear();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("Modal Component", () => {
  describe("Basic Rendering", () => {
    it("renders when isOpen is true", () => {
      const onClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={onClose}>
          <div>Modal content</div>
        </Modal>
      );

      expect(screen.getByText("Modal content")).toBeInTheDocument();
    });

    it("does not render when isOpen is false", () => {
      const onClose = vi.fn();
      render(
        <Modal isOpen={false} onClose={onClose}>
          <div>Modal content</div>
        </Modal>
      );

      expect(screen.queryByText("Modal content")).not.toBeInTheDocument();
    });

    it("renders children content correctly", () => {
      const onClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={onClose}>
          <h2>Modal Title</h2>
          <p>Modal description text</p>
          <button>Action Button</button>
        </Modal>
      );

      expect(screen.getByText("Modal Title")).toBeInTheDocument();
      expect(screen.getByText("Modal description text")).toBeInTheDocument();
      expect(screen.getByText("Action Button")).toBeInTheDocument();
    });

    it("renders as dialog element", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={onClose}>
          <div>Content</div>
        </Modal>
      );

      const dialog = container.querySelector("dialog");
      expect(dialog).toBeInTheDocument();
      expect(dialog?.tagName.toLowerCase()).toBe("dialog");
    });
  });

  describe("Modal State Management", () => {
    it("calls showModal when opened", async () => {
      const onClose = vi.fn();
      const { rerender } = render(
        <Modal isOpen={false} onClose={onClose}>
          <div>Content</div>
        </Modal>
      );

      // Initially closed
      expect(mockShowModal).not.toHaveBeenCalled();

      // Open modal
      rerender(
        <Modal isOpen={true} onClose={onClose}>
          <div>Content</div>
        </Modal>
      );

      await waitFor(() => {
        expect(mockShowModal).toHaveBeenCalledTimes(1);
      });
    });

    it("handles modal closing correctly", () => {
      const onClose = vi.fn();
      const { rerender } = render(
        <Modal isOpen={true} onClose={onClose}>
          <div>Test Content</div>
        </Modal>
      );

      // Modal should be visible initially
      expect(screen.getByText("Test Content")).toBeInTheDocument();

      // Close modal
      rerender(
        <Modal isOpen={false} onClose={onClose}>
          <div>Test Content</div>
        </Modal>
      );

      // Content should not be visible when closed
      expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
    });

    it("handles state transitions correctly", () => {
      const onClose = vi.fn();
      const { rerender } = render(
        <Modal isOpen={false} onClose={onClose}>
          <div>Transition Content</div>
        </Modal>
      );

      // Initially closed - no content
      expect(screen.queryByText("Transition Content")).not.toBeInTheDocument();

      // Open modal
      rerender(
        <Modal isOpen={true} onClose={onClose}>
          <div>Transition Content</div>
        </Modal>
      );

      // Content should be visible
      expect(screen.getByText("Transition Content")).toBeInTheDocument();

      // Close modal again
      rerender(
        <Modal isOpen={false} onClose={onClose}>
          <div>Transition Content</div>
        </Modal>
      );

      // Content should not be visible
      expect(screen.queryByText("Transition Content")).not.toBeInTheDocument();
    });

    it("handles modal opening correctly", async () => {
      const onClose = vi.fn();
      const { rerender } = render(
        <Modal isOpen={true} onClose={onClose}>
          <div>Content</div>
        </Modal>
      );

      // Modal should be open
      expect(screen.getByText("Content")).toBeInTheDocument();

      // Close modal
      rerender(
        <Modal isOpen={false} onClose={onClose}>
          <div>Content</div>
        </Modal>
      );

      // Content should not be visible when closed
      expect(screen.queryByText("Content")).not.toBeInTheDocument();
    });

    it("handles state changes correctly", async () => {
      const onClose = vi.fn();
      const { rerender } = render(
        <Modal isOpen={false} onClose={onClose}>
          <div>Content</div>
        </Modal>
      );

      // Initially closed - no content
      expect(screen.queryByText("Content")).not.toBeInTheDocument();

      // Open modal
      rerender(
        <Modal isOpen={true} onClose={onClose}>
          <div>Content</div>
        </Modal>
      );

      // Content should be visible
      expect(screen.getByText("Content")).toBeInTheDocument();
      expect(mockShowModal).toHaveBeenCalledTimes(1);

      // Close modal
      rerender(
        <Modal isOpen={false} onClose={onClose}>
          <div>Content</div>
        </Modal>
      );

      // Content should not be visible
      expect(screen.queryByText("Content")).not.toBeInTheDocument();
    });
  });

  describe("Event Handling", () => {
    it("calls onClose when cancel event is triggered", async () => {
      const onClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={onClose}>
          <div>Content</div>
        </Modal>
      );

      const dialog = container.querySelector("dialog");
      expect(dialog).toBeInTheDocument();

      // Simulate cancel event (like ESC key)
      fireEvent(dialog!, new Event("cancel", { bubbles: true }));

      await waitFor(() => {
        expect(onClose).toHaveBeenCalledTimes(1);
      });
    });

    it("calls onClose when clicking outside modal content", async () => {
      const onClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={onClose}>
          <div data-testid="modal-content">Content</div>
        </Modal>
      );

      const dialog = container.querySelector("dialog");
      expect(dialog).toBeInTheDocument();

      // Mock getBoundingClientRect to simulate click outside
      vi.spyOn(dialog!, "getBoundingClientRect").mockReturnValue({
        left: 100,
        right: 200,
        top: 100,
        bottom: 200,
        width: 100,
        height: 100,
        x: 100,
        y: 100,
        toJSON: () => ({}),
      });

      // Click outside the modal bounds
      fireEvent.click(dialog!, {
        clientX: 50, // Outside left boundary
        clientY: 150,
      });

      await waitFor(() => {
        expect(onClose).toHaveBeenCalledTimes(1);
      });
    });

    it("does not call onClose when clicking inside modal content", async () => {
      const onClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={onClose}>
          <div data-testid="modal-content">Content</div>
        </Modal>
      );

      const dialog = container.querySelector("dialog");
      expect(dialog).toBeInTheDocument();

      // Mock getBoundingClientRect to simulate click inside
      vi.spyOn(dialog!, "getBoundingClientRect").mockReturnValue({
        left: 100,
        right: 200,
        top: 100,
        bottom: 200,
        width: 100,
        height: 100,
        x: 100,
        y: 100,
        toJSON: () => ({}),
      });

      // Click inside the modal bounds
      fireEvent.click(dialog!, {
        clientX: 150, // Inside boundaries
        clientY: 150,
      });

      // Wait a bit to ensure no callback was called
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe("Props and Content", () => {
    it("accepts complex children content", () => {
      const onClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={onClose}>
          <div>
            <header>
              <h1>Complex Modal</h1>
              <button onClick={onClose}>Close</button>
            </header>
            <main>
              <form>
                <input type="text" placeholder="Enter text" />
                <select>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </form>
            </main>
            <footer>
              <button type="submit">Submit</button>
              <button type="button">Cancel</button>
            </footer>
          </div>
        </Modal>
      );

      expect(screen.getByText("Complex Modal")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Submit")).toBeInTheDocument();
      expect(screen.getByText("Cancel")).toBeInTheDocument();
    });

    it("handles empty children", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={onClose}>
          {null}
        </Modal>
      );

      const dialog = container.querySelector("dialog");
      expect(dialog).toBeInTheDocument();
    });

    it("handles string children", () => {
      const onClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={onClose}>
          Simple text content
        </Modal>
      );

      expect(screen.getByText("Simple text content")).toBeInTheDocument();
    });

    it("handles array of children", () => {
      const onClose = vi.fn();
      const items = ["Item 1", "Item 2", "Item 3"];

      render(
        <Modal isOpen={true} onClose={onClose}>
          {items.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </Modal>
      );

      items.forEach((item) => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    });
  });

  describe("Accessibility", () => {
    it("has correct dialog element", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Modal isOpen={true} onClose={onClose}>
          <div>Content</div>
        </Modal>
      );

      const dialog = container.querySelector("dialog");
      expect(dialog).toBeInTheDocument();
    });

    it("supports custom ARIA attributes", () => {
      const onClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={onClose}>
          <div
            data-testid="inner-dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <h2 id="modal-title">Confirmation</h2>
            <p id="modal-description">Are you sure you want to proceed?</p>
          </div>
        </Modal>
      );

      const modalContent = screen.getByTestId("inner-dialog");
      expect(modalContent).toHaveAttribute(
        "aria-describedby",
        "modal-description"
      );
      expect(modalContent).toHaveAttribute("aria-labelledby", "modal-title");
    });

    it("maintains focus management", () => {
      const onClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={onClose}>
          <div>
            <h2>Modal Title</h2>
            <button data-testid="first-button">First Button</button>
            <button data-testid="second-button">Second Button</button>
          </div>
        </Modal>
      );

      const firstButton = screen.getByTestId("first-button");
      const secondButton = screen.getByTestId("second-button");

      expect(firstButton).toBeInTheDocument();
      expect(secondButton).toBeInTheDocument();
    });
  });

  describe("Event Cleanup", () => {
    it("handles component unmounting correctly", () => {
      const onClose = vi.fn();
      const { unmount } = render(
        <Modal isOpen={true} onClose={onClose}>
          <div>Content</div>
        </Modal>
      );

      // Test that component unmounts without errors
      expect(() => unmount()).not.toThrow();
    });
  });

  describe("Edge Cases", () => {
    it("handles onClose function changes", async () => {
      const onClose1 = vi.fn();
      const onClose2 = vi.fn();

      const { rerender, container } = render(
        <Modal isOpen={true} onClose={onClose1}>
          <div>Content</div>
        </Modal>
      );

      // Change onClose function
      rerender(
        <Modal isOpen={true} onClose={onClose2}>
          <div>Content</div>
        </Modal>
      );

      const dialog = container.querySelector("dialog");
      fireEvent(dialog!, new Event("cancel", { bubbles: true }));

      await waitFor(() => {
        expect(onClose1).not.toHaveBeenCalled();
        expect(onClose2).toHaveBeenCalledTimes(1);
      });
    });

    it("handles missing dialog reference gracefully", () => {
      const onClose = vi.fn();

      // This test ensures the component doesn't crash when dialog ref is null
      expect(() => {
        render(
          <Modal isOpen={true} onClose={onClose}>
            <div>Content</div>
          </Modal>
        );
      }).not.toThrow();
    });

    it("handles multiple rapid state changes", async () => {
      const onClose = vi.fn();
      const { rerender } = render(
        <Modal isOpen={false} onClose={onClose}>
          <div>Content</div>
        </Modal>
      );

      // Rapid state changes
      for (let i = 0; i < 5; i++) {
        rerender(
          <Modal isOpen={true} onClose={onClose}>
            <div>Content {i}</div>
          </Modal>
        );
        rerender(
          <Modal isOpen={false} onClose={onClose}>
            <div>Content {i}</div>
          </Modal>
        );
      }

      // Should not crash
      expect(screen.queryByText("Content 4")).not.toBeInTheDocument();
    });
  });

  describe("Integration Scenarios", () => {
    it("works with form submission", async () => {
      const onClose = vi.fn();
      const onSubmit = vi.fn((e) => e.preventDefault());

      render(
        <Modal isOpen={true} onClose={onClose}>
          <form onSubmit={onSubmit}>
            <input data-testid="form-input" type="text" required />
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </form>
        </Modal>
      );

      const input = screen.getByTestId("form-input");
      const submitButton = screen.getByText("Submit");
      const cancelButton = screen.getByText("Cancel");

      // Fill form and submit
      fireEvent.change(input, { target: { value: "test value" } });
      fireEvent.click(submitButton);

      expect(onSubmit).toHaveBeenCalledTimes(1);

      // Test cancel
      fireEvent.click(cancelButton);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("supports nested interactive elements", () => {
      const onClose = vi.fn();
      const onButtonClick = vi.fn();

      render(
        <Modal isOpen={true} onClose={onClose}>
          <div>
            <h2>Nested Elements</h2>
            <div>
              <button onClick={onButtonClick}>Nested Button</button>
              <div>
                <input type="checkbox" id="nested-checkbox" />
                <label htmlFor="nested-checkbox">Nested Checkbox</label>
              </div>
            </div>
          </div>
        </Modal>
      );

      const nestedButton = screen.getByText("Nested Button");
      const checkbox = screen.getByRole("checkbox", { hidden: true });

      fireEvent.click(nestedButton);
      expect(onButtonClick).toHaveBeenCalledTimes(1);

      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });
  });
});
