const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const validateLogin = (values: { email: string; password: string }) => {
  const errors: { email?: string; password?: string } = {};
  if (!values.email) errors.email = "E-mail is required";
  else if (!isValidEmail(values.email))
    errors.email = "Please enter a valid e-mail address";
  if (!values.password) errors.password = "Please enter password";
  return errors;
};
