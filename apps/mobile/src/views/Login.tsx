import { Text, colors, Icon } from "@chas/ui";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import Logo from "../components/Logo";

const Login = () => {
  return (
    <Container className="page">
      <Logo />
      <StyledForm>
        <Text variant="h2">Log in</Text>
        <Divider />
        <LoginForm />
      </StyledForm>
      {/* <CreateUser>
        <Text variant="body-sm">New user?</Text>
        <Text variant="body-smBold">Create account</Text>
      </CreateUser> */}
      <Footer>
        <Icon name="truckPin" alt="TruckPin Logo" size={300} />
      </Footer>
    </Container>
  );
};
export default Login;

const Container = styled.div`
  align-items: center;
  justify-content: space-around;
  padding: 2rem;
  background-color: ${colors.background};
`;

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
`;

const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${colors.secondary};
  margin: 1rem 0;
`;

// const CreateUser = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 1rem;
//   margin-top: 1rem;
//   flex-direction: row;
// `;

const Footer = styled.footer`
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
`;
