import { fireEvent, render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { theme } from "../../global/styles/theme";
import { Register } from "../../screens/Register";

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("Register screen", () => {
  it("should open the category modal when user clicks on the category button", () => {
    const { getByTestId } = render(<Register />, { wrapper: Providers });
    const categoryModal = getByTestId("category-modal");
    const categoryButton = getByTestId("category-button");

    expect(categoryModal).toBeTruthy();
    expect(categoryModal.props.visible).toBe(false);

    fireEvent.press(categoryButton);

    expect(categoryModal.props.visible).toBe(true);
  });
});
