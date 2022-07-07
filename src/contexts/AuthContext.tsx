import { startAsync } from "expo-auth-session";
import { createContext, useCallback, useContext, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface AuthContextData {
  user: User | null;
  singInWithGoogle: () => Promise<void>;
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

  const singInWithGoogle = useCallback(async () => {
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

      setUser({
        id: data.id,
        email: data.email,
        name: data.name,
        image: data.picture,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, singInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};
