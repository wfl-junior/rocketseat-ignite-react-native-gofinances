import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useUpdateEffect } from "./useUpdateEffect";

export function useAsyncStorageState<T>(
  key: string,
  initialState: T | (() => T),
) {
  const [state, setState] = useState<T>(initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(key)
      .then(data => {
        if (data) {
          setState(JSON.parse(data));
        }
      })
      .catch(error => {
        console.warn(error);
        Alert.alert("Ocorreu um erro ao carregar dados");
      })
      .finally(() => setIsLoading(false));
  }, [key]);

  useUpdateEffect(() => {
    AsyncStorage.setItem(key, JSON.stringify(state)).catch(error => {
      console.warn(error);
      Alert.alert("Ocorreu um erro ao salvar dados");
    });
  }, [key, state]);

  return [state, setState, isLoading, setIsLoading] as const;
}
