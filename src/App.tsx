import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { loadAsync } from "expo-font";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import { Fragment, useCallback, useEffect, useState } from "react";
import { LogBox, StatusBar } from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "styled-components";
import { LoadingScreen } from "./components/LoadingScreen";
import { AuthContextProvider } from "./contexts/AuthContext";
import { theme } from "./global/styles/theme";
import { Routes } from "./routes";

LogBox.ignoreLogs([/deprecated/i]);

export const App: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await loadAsync({
          Poppins_400Regular,
          Poppins_500Medium,
          Poppins_700Bold,
        });
      } catch (error) {
        console.warn(error);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const handleLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        <LoadingScreen />
      </ThemeProvider>
    );
  }

  return (
    <Fragment>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <GestureHandlerRootView
        style={{ flex: 1 }}
        onLayout={handleLayoutRootView}
      >
        <ThemeProvider theme={theme}>
          <AuthContextProvider>
            <Routes />
          </AuthContextProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </Fragment>
  );
};
