import styled from "styled-components";
import { useState } from "react";
import { colors } from "@chas/ui";

interface HamburgerMenuProps {
  onToggle: (isOpen: boolean) => void;
}

const HamburgerMenu = ({ onToggle }: HamburgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle(newState);
  };

  return (
    <HamburgerButton onClick={handleToggle}>
      <span />
      <span />
      <span />
    </HamburgerButton>
  );
};

export default HamburgerMenu;

const HamburgerButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  span {
    width: 24px;
    height: 3px;
    background: ${colors.primary};
    border-radius: 2px;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;
