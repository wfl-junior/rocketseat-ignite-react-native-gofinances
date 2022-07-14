import { render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { Input } from "../../components/Form/Input";
import { theme } from "../../global/styles/theme";

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("Input component", () => {
  it("should have border when active", () => {
    const { getByTestId } = render(
      <Input
        testID="email-input"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCorrect={false}
        autoCapitalize="none"
        active
      />,
      { wrapper: Providers },
    );

    const input = getByTestId("email-input");
    const inputStyle = input.props.style[0];

    expect(inputStyle.borderColor).toBe(theme.colors.attention);
    expect(inputStyle.borderWidth).toBe(3);
    expect(inputStyle.borderStyle).toBe("solid");
  });

  it("should not have border when not active", () => {
    const { getByTestId } = render(
      <Input
        testID="email-input"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCorrect={false}
        autoCapitalize="none"
      />,
      { wrapper: Providers },
    );

    const input = getByTestId("email-input");
    const inputStyle = input.props.style[0];

    expect(inputStyle.borderColor).toBeUndefined();
    expect(inputStyle.borderWidth).toBeUndefined();
    expect(inputStyle.borderStyle).toBeUndefined();
  });
});
