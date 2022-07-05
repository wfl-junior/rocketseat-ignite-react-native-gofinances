import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dashboard } from "../pages/Dashboard";
import { Register } from "../pages/Register";

const { Navigator, Screen } = createBottomTabNavigator();

export const AppRoutes: React.FC = () => (
  // @ts-ignore
  <Navigator>
    <Screen name="Listagem" component={Dashboard} />
    <Screen name="Cadastrar" component={Register} />
    <Screen name="Resumo" component={Register} />
  </Navigator>
);
