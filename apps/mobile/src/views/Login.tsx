import { Text, TextInput, Button, colors, Icon } from "@chas/ui";
import styled from "styled-components";

const Login = () => {
  return (
    <Container className="page">
      <Card>
        <Logo>
          <Icon name="smallTempHot" size={64} alt="ThermoTrack Logo" />
          <LogoText>
            <Text variant="h2">ThermoTrack</Text>
            <Text variant="body-sm">Climate-Controlled Transport</Text>
          </LogoText>
        </Logo>
        <Title>
          <Text variant="h1">Log in</Text>
        </Title>
        <Divider />
        <Form>
          <TextInput label="E-mail" />
          <TextInput label="Password" type="password" />
          <Text variant="body-smBold">Forgot password?</Text>
          <ButtonContainer>
            <Button buttonVariant="primary">Log in</Button>
          </ButtonContainer>
        </Form>
        <CreateUser>
          <Text variant="body-sm">New user?</Text>
          <Text variant="body-smBold">Create account</Text>
        </CreateUser>
        <Footer>
          <Icon name="truckPin" alt="TruckPin Logo" size={300} />
        </Footer>
      </Card>
    </Container>
  );
};
export default Login;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`

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

const Title = styled.h1`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${colors.secondary};
  margin: 1rem 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const CreateUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  flex-direction: row;
`;

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
`;
