import { render } from "@testing-library/react-native";
import { Input } from "../../components/Form/Input";
import { theme } from "../../global/styles/theme";

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
    );

    const emailInput = getByTestId("email-input");

    expect(emailInput.props.style[0].borderColor).toBe(theme.colors.attention);
    expect(emailInput.props.style[0].borderWidth).toBe(3);
  });
});
