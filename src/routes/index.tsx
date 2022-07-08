import { NavigationContainer } from "@react-navigation/native";
import { LoadingScreen } from "../components/LoadingScreen";
import { useAuthContext } from "../contexts/AuthContext";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export const Routes: React.FC = () => {
  const { isLoggedIn, isLoadingUser } = useAuthContext();

  if (isLoadingUser) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
