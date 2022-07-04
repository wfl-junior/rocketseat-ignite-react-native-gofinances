import { TouchableOpacityProps } from "react-native";
import { Container, Title } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export const Button: React.FC<ButtonProps> = ({ title, ...props }) => (
  <Container {...props}>
    <Title>{title}</Title>
  </Container>
);
