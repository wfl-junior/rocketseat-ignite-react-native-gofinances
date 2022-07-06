import { createContext, useContext } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface AuthContextData {
  user: User;
}

const AuthContext = createContext({} as AuthContextData);

export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const user: User = {
    id: "hello-world",
    name: "Wallace Júnior",
    email: "test@test.com",
    image: "https://github.com/wfl-junior.png",
  };

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
