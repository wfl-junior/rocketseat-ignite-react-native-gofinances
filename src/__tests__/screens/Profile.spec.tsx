import { render } from "@testing-library/react-native";
import { Profile } from "../../screens/Profile";

it("should render the correct name input placeholder", () => {
  const { debug } = render(<Profile />);

  debug();
});
