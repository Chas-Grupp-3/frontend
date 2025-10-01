import { useEffect, useCallback } from "react";
import type { ReactNode, MouseEvent } from "react";
import styled from "styled-components";
import { colors } from "./styles";
// import { Icon } from "./icon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  showCloseButton?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  //   showCloseButton = true,
}: ModalProps) => {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleEscape]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer>
        {/* {showCloseButton && (
          <CloseButton onClick={onClose}>
            {/* <Icon name="close" size="sm" alt="Close" /> 
          </CloseButton>
        )} */}
        <Content>{children}</Content>
      </ModalContainer>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
`;

const ModalContainer = styled.div`
  background: ${colors.background};
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-width: 90vw;
  width: 60%;
`;

// const CloseButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   padding: 8px;
//   border-radius: 4px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: ${colors.grayText || "#666666"};

//   &:hover {
//     background-color: ${colors.lightGray || "#f5f5f5"};
//   }
// `;

const Content = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
`;
