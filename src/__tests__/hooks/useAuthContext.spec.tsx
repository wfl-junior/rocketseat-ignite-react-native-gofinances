import AsyncStorage from "@react-native-async-storage/async-storage";
import { act, renderHook } from "@testing-library/react-hooks";
import { startAsync } from "expo-auth-session";
import { mocked } from "jest-mock";
import {
  AuthContextProvider,
  useAuthContext,
} from "../../contexts/AuthContext";
import { userStorageKey } from "../../utils/constants";
import { fetchGoogleUser } from "../../utils/fetchGoogleUser";

jest.mock("expo-auth-session");
jest.mock("../../utils/fetchGoogleUser");

describe("useAuthContext hook", () => {
  beforeEach(async () => {
    // para impedir que local storage mantenha user entre os testes
    await AsyncStorage.removeItem(userStorageKey);
  });

  it("should be able to sign in with Google", async () => {
    const mockedStartAsync = mocked(startAsync);
    const mockedFetchGoogleUser = mocked(fetchGoogleUser);

    mockedStartAsync.mockReturnValueOnce(
      Promise.resolve({
        type: "success",
        params: {
          access_token: "fake-access-token",
        },
      } as any),
    );

    mockedFetchGoogleUser.mockReturnValueOnce(
      Promise.resolve({
        id: "userInfo.id",
        email: "userInfo.email",
        name: "userInfo.name",
        picture: "userInfo.picture",
      }),
    );

    const { result } = renderHook(useAuthContext, {
      wrapper: AuthContextProvider,
    });

    await act(result.current.signInWithGoogle);

    expect(result.current.user).not.toBeNull();
  });

  it("should not be able to sign in with Google if user cancels authentication", async () => {
    const mockedStartAsync = mocked(startAsync);

    mockedStartAsync.mockReturnValueOnce(
      Promise.resolve({
        type: "cancel",
      } as any),
    );

    const { result } = renderHook(useAuthContext, {
      wrapper: AuthContextProvider,
    });

    await act(result.current.signInWithGoogle);

    expect(result.current.user).toBeNull();
  });
});
