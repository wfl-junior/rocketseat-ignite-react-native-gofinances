import { ThemeProvider } from "styled-components";
import { theme } from "./global/styles/theme";
import { Dashboard } from "./pages/Dashboard";

export const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Dashboard />
  </ThemeProvider>
);
