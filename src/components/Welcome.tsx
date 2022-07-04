import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
});

export const Welcome: React.FC = () => (
  <Text style={styles.text}>React Native Bare Workflow com TypeScript</Text>
);
