import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationParamList } from "../routes/app.routes";

export function useBottomTabNavigation() {
  return useNavigation<BottomTabNavigationProp<BottomTabNavigationParamList>>();
}
