import styled from "styled-components";
import { TextInput, Text, Button } from "@chas/ui";

const ShipmentForm = () => {
  return (
    <Form>
      <Sender>
        <Text variant="button">Sender</Text>
        <SenderForm>
          <TextInput label="Full name" />
          <TextInput label="Company (not required)" />
          <TextInput label="Temperature range (°C)" />
          <TextInput label="humidity range" />
          <TextInput label="Estimated weight (kg)" />
          <TextInput label="Departure date & time" />
        </SenderForm>
      </Sender>
      <Recipient>
        <Text variant="button">Recipient</Text>
        <RecipientForm>
          <TextInput label="Full name" />
          <TextInput label="Company (not required)" />
          <TextInput label="Destination (Full adress)" />
        </RecipientForm>
      </Recipient>
      <Button type="submit">Generate QR code</Button>
    </Form>
  );
};

export default ShipmentForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 90%;
  height: 80%;
  justify-content: space-around;
`;

const Sender = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
`;

const SenderForm = styled.div``;

const Recipient = styled.div`
  width: 50vw;
`;

const RecipientForm = styled.div``;
