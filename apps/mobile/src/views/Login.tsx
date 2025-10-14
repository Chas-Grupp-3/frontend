import { Text, TextInput, Button, colors, Icon } from "@chas/ui";
import GlobalStyles from "../styles/GlobalStyles";

const Login = () => {
  return (
    <>
      <GlobalStyles />
      <main style={styles.main}>
        <section style={styles.card}>
          <header style={styles.logo}>
            <Icon name="smallTempHot" size={64} alt="ThermoTrack Logo" />
            <div style={styles.logoText}>
              <Text variant="h2">ThermoTrack</Text>
              <Text variant="body-sm">Climate-Controlled Transport</Text>
            </div>
          </header>
          <Text variant="h1">Log in</Text>
          <div style={styles.divider} />
          <form style={styles.form}>
            <TextInput label="E-mail" />
            <TextInput label="Password" type="password" />
            <Text variant="body-smBold">Forgot password?</Text>
            <div>
              <Button buttonVariant="primary">Log in</Button> 
            </div>
          </form>
          <div style={styles.footer}>
            <Text variant="body-sm">New user?</Text>
            <Text variant="body-smBold">Create account</Text>
          </div>
          <footer>
            <Icon name="truckPin" size={300} alt="TruckPin Logo" />
          </footer>
        </section>
      </main>
    </>
  );
};
export default Login;

const styles = {
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: colors.background,
  },
  card: {
    padding: "4rem",
    width: "100%",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "1rem",
  },
  logo: {
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1rem",
  },
  logoText: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-start",
    text: colors.primary,
  },
  divider: {
    width: "100%",
    height: "2px",
    backgroundColor: colors.secondary,
    margin: "1rem 0",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "1rem",
    width: "100%",
  },
  footer: {
    display: "flex",
    gap: "1rem",
    marginTop: "1rem",
  },
};
