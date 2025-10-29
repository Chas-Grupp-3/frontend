import styled from "styled-components";
import { TextInput, Button, Text, colors } from "@chas/ui";
import { ClipLoader } from "react-spinners";
import { useAuthContext } from "../context/auth/useAuthContext";
import { useFormValidation } from "../hooks/useFormValidation";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { validateLogin } from "../utils/login";

const LoginForm = () => {
  const {
    login,
    loading,
    error: authError,
    isAuthenticated,
    role,
  } = useAuthContext();
  const {
    values,
    errors: validationErrors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormValidation<{ email: string; password: string }>(validateLogin);
  const [serverError, setServerError] = useState<string | null | undefined>(
    undefined
  );
  const navigate = useNavigate();

  useEffect(() => {
    setServerError(authError);
  }, [authError]);

  useEffect(() => {
    if (isAuthenticated && role) {
      navigate(`/${role}`);
    }
  }, [isAuthenticated, role, navigate]);

  const onSubmit = async (formValues: { email: string; password: string }) => {
    await login(formValues);
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit);
      }}
    >
      <TextInput
        autoComplete="email"
        label="E-mail"
        type="email"
        value={values.email || ""}
        onChange={(e) => {
          if (serverError) setServerError(undefined);
          handleChange("email")(e);
        }}
        onBlur={handleBlur("email")}
        error={touched.email ? validationErrors.email : undefined}
      />
      <TextInput
        label="Password"
        type="password"
        value={values.password || ""}
        onChange={(e) => {
          if (serverError) setServerError(undefined);
          handleChange("password")(e);
        }}
        onBlur={handleBlur("password")}
        error={touched.password ? validationErrors.password : undefined}
      />
      {/* <Text variant="body-smBold">Forgot password?</Text> */}
      {serverError && (
        <Text color="critical" variant="body-sm">
          Something went wrong, please try again
        </Text>
      )}
      <ButtonContainer>
        {loading ? (
          <ClipLoader size={42} color={colors.primary} />
        ) : (
          <Button
            type="submit"
            buttonVariant="primary"
            disabled={loading || !values.email || !values.password}
          >
            Log in
          </Button>
        )}
      </ButtonContainer>
    </Form>
  );
};

export default LoginForm;

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
