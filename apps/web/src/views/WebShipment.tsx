import { Text, colors } from "@chas/ui";
import styled from "styled-components";
import ShipmentForm from "../components/ShipmentForm";
import HamburgerMenu from "../components/HamburgerMenu";
import LogoWeb from "../components/LogoWeb";
import { useState } from "react";

const WebShipment = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Container className="page">
      <Header>
        <LogoWeb />
        <HamburgerMenu onToggle={setMenuOpen} />
        <List menuOpen={menuOpen}>
          <ul>
            <li>
              <Text variant="body">Create Shipment</Text>
            </li>
            <li>
              <Text variant="body">Dashboard</Text>
            </li>
            <li>
              <Text variant="body">Profile</Text>
            </li>
            <li>
              <Text variant="body">Log out</Text>
            </li>
          </ul>
        </List>
      </Header>
      <MiddleContainor>
        <ShipmentCard>
          <Text variant="h3">Create Shipment</Text>
          <Divider />
          <ShipmentForm />
        </ShipmentCard>
        <QrCard>
          <Text variant="h3">QR Code Generator</Text>
          <Divider />
        </QrCard>
      </MiddleContainor>
      <Footer>
        <Text variant="body-sm">© 2024 ThermoTrack. All rights reserved.</Text>
      </Footer>
    </Container>
  );
};

export default WebShipment;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.background};

  @media (min-width: 768px) {
    padding: 0;
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3rem;
  background-color: ${"#fff"};
  padding: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    gap: 2rem;
    width: 100vw;
  }
`;

const List = styled.nav<{ menuOpen: boolean }>`
  ul {
    display: ${({ menuOpen }) => (menuOpen ? "flex" : "none")};
    flex-direction: column;
    gap: 8px;
    list-style: none;
    padding: 0;

    @media (min-width: 768px) {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }
`;

const MiddleContainor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const ShipmentCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  background: ${"#fff"};
  padding: 16px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;

  @media (min-width: 768px) {
  }
`;

const QrCard = styled.div`
  background: ${"#fff"};
  padding: 16px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
`;

const Divider = styled.hr`
  border: none;
  border-top: 2px solid ${colors.secondary};
  margin: 16px 0;
  position: relative;
  width: 100%;
  z-index: 10;
`;

const Footer = styled.footer`
  display: flex;
  background-color: ${colors.primary};
  text-color: ${"#fff"};
  margin-top: 3rem;
  padding: 16px;
  width: 100vw;
`;
