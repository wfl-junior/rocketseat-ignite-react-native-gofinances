import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AppleAuthenticationScope,
  signInAsync,
} from "expo-apple-authentication";
import { startAsync } from "expo-auth-session";
import { createContext, useCallback, useContext } from "react";
import { useAsyncStorageState } from "../hooks/useAsyncStorageState";
import { userStorageKey } from "../utils/constants";
import { fetchGoogleUser } from "../utils/fetchGoogleUser";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface AuthContextData {
  user: User | null;
  isLoggedIn: boolean;
  isLoadingUser: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

interface SignInWithGoogleResponse {
  params: {
    access_token: string;
  };
  type: "cancel" | "dismiss" | "opened" | "locked" | "error" | "success";
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser, isLoadingUser, setIsLoadingUser] =
    useAsyncStorageState<User | null>(userStorageKey, null);

  const signInWithGoogle = useCallback(async () => {
    setIsLoadingUser(true);

    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
    const RESPONSE_TYPE = "token";
    const SCOPE = encodeURI("profile email");

    const { type, params } = (await startAsync({
      authUrl: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`,
    })) as SignInWithGoogleResponse;

    if (type === "success") {
      const googleUser = await fetchGoogleUser(params.access_token);

      setUser({
        id: googleUser.id,
        email: googleUser.email,
        name: googleUser.name,
        image: googleUser.picture,
      });
    }

    setIsLoadingUser(false);
  }, []);

  const signInWithApple = useCallback(async () => {
    setIsLoadingUser(true);

    const credential = await signInAsync({
      requestedScopes: [
        AppleAuthenticationScope.EMAIL,
        AppleAuthenticationScope.FULL_NAME,
      ],
    });

    if (credential) {
      const { givenName, familyName } = credential.fullName || {};
      const name = `${givenName ?? "John"} ${familyName ?? "Doe"}`;

      setUser({
        id: credential.user,
        email: credential.email!,
        name,
        image: `https://ui-avatars.com/api/?name=${name}&size=48`,
      });
    }

    setIsLoadingUser(false);
  }, []);

  const signOut = useCallback(async () => {
    setUser(null);
    await AsyncStorage.removeItem(userStorageKey);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoadingUser,
        signInWithGoogle,
        signInWithApple,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
