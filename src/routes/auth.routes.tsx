import { createStackNavigator } from "@react-navigation/stack";
import { SignIn } from "../screens/SignIn";

const { Navigator, Screen } = createStackNavigator();

export const AuthRoutes: React.FC = () => (
  // @ts-ignore
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen name="SignIn" component={SignIn} />
  </Navigator>
);
