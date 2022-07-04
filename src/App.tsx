import React from "react";
import { StyleSheet, View } from "react-native";
import { Welcome } from "./components/Welcome";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121015",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const App: React.FC = () => (
  <View style={styles.container}>
    <Welcome />
  </View>
);
