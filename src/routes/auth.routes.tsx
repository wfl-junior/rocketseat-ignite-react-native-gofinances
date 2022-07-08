import { createStackNavigator } from "@react-navigation/stack";
import { SignIn } from "../screens/SignIn";

const { Navigator, Screen } = createStackNavigator();

export const AuthRoutes: React.FC = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen name="SignIn" component={SignIn} />
  </Navigator>
);
