import { TextInputProps } from "react-native";
import { Container } from "./styles";

interface InputProps extends TextInputProps {
  active?: boolean;
}

export const Input: React.FC<InputProps> = ({ active, ...props }) => (
  <Container active={active} {...props} />
);
