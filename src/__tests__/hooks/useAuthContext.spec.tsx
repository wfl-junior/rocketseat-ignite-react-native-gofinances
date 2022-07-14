import { act, renderHook } from "@testing-library/react-native";
import {
  AuthContextProvider,
  useAuthContext,
} from "../../contexts/AuthContext";

describe("useAuthContext hook", () => {
  it("should be able to sign in with Google", async () => {
    const { result } = renderHook(useAuthContext, {
      wrapper: AuthContextProvider,
    });

    await act(result.current.signInWithGoogle);

    expect(result.current.user).not.toBeNull();
  });
});
