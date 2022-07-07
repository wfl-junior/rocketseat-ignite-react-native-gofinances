import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AppleAuthenticationScope,
  signInAsync,
} from "expo-apple-authentication";
import { startAsync } from "expo-auth-session";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { userStorageKey } from "../utils/constants";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface AuthContextData {
  user: User | null;
  isLoggedIn: boolean;
  isUserLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
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
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(userStorageKey)
      .then(data => {
        if (data) {
          setUser(JSON.parse(data));
        }
      })
      .catch(console.log)
      .finally(() => setIsUserLoading(false));
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
    const RESPONSE_TYPE = "token";
    const SCOPE = encodeURI("profile email");

    const { type, params } = (await startAsync({
      authUrl: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`,
    })) as SignInWithGoogleResponse;

    if (type === "success") {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${params.access_token}`,
      );

      const data = await response.json();

      const user: User = {
        id: data.id,
        email: data.email,
        name: data.name,
        image: data.picture,
      };

      setUser(user);
      await AsyncStorage.setItem(userStorageKey, JSON.stringify(user));
    }
  }, []);

  const signInWithApple = useCallback(async () => {
    const credential = await signInAsync({
      requestedScopes: [
        AppleAuthenticationScope.EMAIL,
        AppleAuthenticationScope.FULL_NAME,
      ],
    });

    if (credential) {
      const user: User = {
        id: credential.user,
        email: credential.email!,
        name: credential.fullName?.givenName!,
      };

      setUser(user);
      await AsyncStorage.setItem(userStorageKey, JSON.stringify(user));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isUserLoading,
        signInWithGoogle,
        signInWithApple,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
