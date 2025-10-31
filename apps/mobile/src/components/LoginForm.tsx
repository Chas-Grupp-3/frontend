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
      aria-labelledby="login-heading"
      aria-describedby="login-description"
      noValidate
    >
      <ScreenReaderOnly as="h1" id="login-heading">
        Log in
      </ScreenReaderOnly>

      <ScreenReaderOnly id="login-description">
        Enter your email address and password to log in to ThermoTrack.
      </ScreenReaderOnly>

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
        aria-required="true"
        aria-invalid={
          touched.email && validationErrors.email ? "true" : "false"
        }
        aria-describedby={
          touched.email && validationErrors.email ? "email-error" : undefined
        }
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
        aria-required="true"
        aria-invalid={
          touched.password && validationErrors.password ? "true" : "false"
        }
        aria-describedby={
          touched.password && validationErrors.password
            ? "password-error"
            : undefined
        }
      />
      {/* <Text variant="body-smBold">Forgot password?</Text> */}
      {serverError && (
        <Text color="critical" variant="body-sm" aria-live="assertive">
          Something went wrong, please try again
        </Text>
      )}
      <ButtonContainer>
        {loading ? (
          <LoadingContainer
            role="status"
            aria-live="polite"
            aria-label="Logging in, please wait"
          >
            <ClipLoader size={42} color={colors.primary} />
            <ScreenReaderOnly>Logging in...</ScreenReaderOnly>
          </LoadingContainer>
        ) : (
          <Button
            type="submit"
            buttonVariant="primary"
            disabled={loading || !values.email || !values.password}
            aria-label={
              loading || !values.email || !values.password
                ? "Login - disabled. Please enter both email and password"
                : "Log in to ThermoTrack"
            }
            aria-describedby={serverError ? "server-error" : undefined}
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
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const ScreenReaderOnly = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
