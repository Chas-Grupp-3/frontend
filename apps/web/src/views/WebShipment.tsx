import { Text, colors, Icon, TextInput } from "@chas/ui";
import styled from "styled-components";

const WebShipment = () => {
  return (
    <Container className="page">
      <Header>
        <Logo>
          <Icon name="smallTempHot" size={64} alt="ThermoTrack Logo" />
          <LogoText>
            <Text variant="h2">ThermoTrack</Text>
            <Text variant="body-sm">Climate-Controlled Transport</Text>
          </LogoText>
        </Logo>
        <List>
          <ul>
            <li>
              <Text variant="h3">Create Shipment</Text>
            </li>
            <li>
              <Text variant="h3">Dashboard</Text>
            </li>
            <li>
              <Text variant="h3">Profile</Text>
            </li>
            <li>
              <Text variant="h3">Log out</Text>
            </li>
          </ul>
        </List>
      </Header>
      <MittleContainor>
        <ShipmentCard>
          <Text variant="h2">Create Shipment</Text>
          <Form>
            <Sender>
              <Text>Sender</Text>
              <SenderForm>
                <TextInput label="Full name" />
                <TextInput label="Company (not required)" />
                <TextInput label="Goods type" />
                <TextInput label="Temperature range (°C)" />
                <TextInput label="Estimated weight (kg)" />
                <TextInput label="Pickup location (Full adress)" />
                <TextInput label="Departure date & time" />
                <TextInput label="Notes → any additional instructions (“may not be opened while driving”, etc.)" />
              </SenderForm>
            </Sender>
            <Recipient>
              <Text>Recipient</Text>
              <RecipientForm>
                <TextInput label="Full name" />
                <TextInput label="Company (not required)" />
                <TextInput label="Destination (Full adress)" />
              </RecipientForm>
            </Recipient>
          </Form>
        </ShipmentCard>
        <QrCard>
          <Text>QR Code Generator</Text>
        </QrCard>
      </MittleContainor>
    </Container>
  );
};

export default WebShipment;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${colors.background};
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  background-color: #fff;
  width: 100%;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  align-items: flex-start;
  color: ${colors.primary};
`;

const List = styled.div`
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    gap: 2rem;
  }
`;

const MittleContainor = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  height: 100%;
`;

const ShipmentCard = styled.div`
  width: 60%;
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

const Sender = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SenderForm = styled.div``;

const Recipient = styled.div`
  width: 100%;
`;

const RecipientForm = styled.div``;

const QrCard = styled.div`
  width: 40%;
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
