import { act, renderHook } from "@testing-library/react-native";
import {
  AuthContextProvider,
  useAuthContext,
} from "../../contexts/AuthContext";

jest.mock("expo-auth-session", () => ({
  startAsync: async () => ({
    type: "success",
    params: {
      access_token: "fake-access-token",
    },
  }),
}));

describe("useAuthContext hook", () => {
  it("should be able to sign in with Google", async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => ({
        id: "userInfo.id",
        email: "userInfo.email",
        name: "userInfo.name",
        picture: "userInfo.picture",
      }),
    })) as jest.Mock;

    const { result } = renderHook(useAuthContext, {
      wrapper: AuthContextProvider,
    });

    await act(result.current.signInWithGoogle);

    expect(result.current.user).not.toBeNull();
  });
});
