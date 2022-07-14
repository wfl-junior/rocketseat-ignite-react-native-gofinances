import { render } from "@testing-library/react-native";
import { Profile } from "../../screens/Profile";

describe("Profile screen", () => {
  it("should render the correct name input placeholder", () => {
    const { getByTestId } = render(<Profile />);
    const nameInput = getByTestId("name-input");

    expect(nameInput).toBeTruthy();
    expect(nameInput.props.placeholder).toBe("Nome");
  });

  it("should load user data", () => {
    const { getByTestId } = render(<Profile />);
    const nameInput = getByTestId("name-input");
    const surnameInput = getByTestId("surname-input");

    expect(nameInput).toBeTruthy();
    expect(nameInput.props.value).toBe("Wallace");
    expect(surnameInput).toBeTruthy();
    expect(surnameInput.props.value).toBe("Júnior");
  });

  it("should render the title correctly", () => {
    const { getByTestId } = render(<Profile />);
    const title = getByTestId("title");

    expect(title).toBeTruthy();
    expect(title.props.children).toBe("Perfil");
  });
});
