import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Title } from "./styles";

interface ButtonProps extends RectButtonProps {
  title: string;
}

export const Button: React.FC<ButtonProps> = ({ title, ...props }) => (
  <Container {...props}>
    <Title>{title}</Title>
  </Container>
);
