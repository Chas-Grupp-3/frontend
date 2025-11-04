import { useEffect, useRef, useCallback } from "react";
import type { ReactNode } from "react";
import styled from "styled-components";
import { colors, radius } from "./styles";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      const dialogBounds = dialog.getBoundingClientRect();
      const isInDialog =
        e.clientX >= dialogBounds.left &&
        e.clientX <= dialogBounds.right &&
        e.clientY >= dialogBounds.top &&
        e.clientY <= dialogBounds.bottom;

      if (!isInDialog) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("click", handleClick);

    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("click", handleClick);
    };
  }, [handleCancel, handleClick]);

  if (!isOpen) return null;

  return (
    <StyledDialog
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Modal Dialog"
    >
      {children}
    </StyledDialog>
  );
};

const StyledDialog = styled.dialog`
  background: ${colors.background};
  border: none;
  border-radius: ${radius.box};
  max-height: 90vh;
  max-width: 90vw;
  min-width: 60%;
  padding: 1rem;
  overflow: visible;

  width: max-content;
  min-height: max-content;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;

  /* Ensure content doesn't overflow */
  box-sizing: border-box;

  /* Add flexbox for better content layout */
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }

  &:not([open]) {
    display: none;
  }
`;
