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
      if (e.target === dialog) {
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

  return <StyledDialog ref={dialogRef}>{children}</StyledDialog>;
};

const StyledDialog = styled.dialog`
  background: ${colors.background};
  border: none;
  border-radius: ${radius.box};
  max-height: 90vh;
  max-width: 90vw;
  width: 60%;
  padding: 24px;
  overflow: hidden;

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }

  &:not([open]) {
    display: none;
  }
`;
