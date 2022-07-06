import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { theme } from "../global/styles/theme";
import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";
import { Summary } from "../screens/Summary";

export type BottomTabNavigationParamList = {
  Listagem: undefined;
  Cadastrar: undefined;
  Resumo: undefined;
};

const { Navigator, Screen } =
  createBottomTabNavigator<BottomTabNavigationParamList>();

export const AppRoutes: React.FC = () => (
  // @ts-ignore
  <Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: theme.colors.secondary,
      tabBarInactiveTintColor: theme.colors.titleLight,
      tabBarLabelPosition: "beside-icon",
      tabBarStyle: {
        height: RFValue(88),
        paddingVertical: Platform.OS === "ios" ? RFValue(20) : 0,
      },
    }}
  >
    <Screen
      name="Listagem"
      component={Dashboard}
      options={{
        tabBarIcon: ({ size, color }) => (
          // @ts-ignore
          <MaterialIcons
            name="format-list-bulleted"
            size={size}
            color={color}
          />
        ),
      }}
    />

    <Screen
      name="Cadastrar"
      component={Register}
      options={{
        tabBarIcon: ({ size, color }) => (
          // @ts-ignore
          <MaterialIcons name="attach-money" size={size} color={color} />
        ),
      }}
    />

    <Screen
      name="Resumo"
      component={Summary}
      options={{
        tabBarIcon: ({ size, color }) => (
          // @ts-ignore
          <MaterialIcons name="pie-chart-outlined" size={size} color={color} />
        ),
      }}
    />
  </Navigator>
);
