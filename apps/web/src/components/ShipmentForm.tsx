import styled from "styled-components";
import { TextInput, Text, Button, Icon } from "@chas/ui";

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
          <InputWithIcon>
            <TextInput label="Departure date & time" />
            <StyledIcon name="blueClock" size={23} alt="Clock" />
          </InputWithIcon>
        </SenderForm>
      </Sender>
      <Recipient>
        <Text variant="button">Recipient</Text>
        <RecipientForm>
          <TextInput label="Full name" />
          <TextInput label="Company (not required)" />
          <InputWithIcon>
            <TextInput label="Destination (Full adress)" />
            <StyledIcon name="bluePin" size={23} alt="Clock" />
          </InputWithIcon>
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

const InputWithIcon = styled.div`
  position: relative;
  width: 100%;
`;

const StyledIcon = styled(Icon)`
  height: 1.5rem;
  width: 1.5rem;
  padding: 4px;
  position: absolute;
  box-sizing: border-box;
  top: 50%;
  left: 2px;
  transform: translateY(-50%);
`;
