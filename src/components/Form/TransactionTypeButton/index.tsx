import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./styles";

export type TransactionType = "up" | "down";

interface TransactionTypeButtonProps extends TouchableOpacityProps {
  type: TransactionType;
  title: string;
  isActive: boolean;
}

const icons: Record<TransactionType, string> = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

export const TransactionTypeButton: React.FC<TransactionTypeButtonProps> = ({
  type,
  title,
  isActive,
  ...props
}) => (
  <Container isActive={isActive} type={type} activeOpacity={0.5} {...props}>
    <Icon name={icons[type]} type={type} />

    <Title>{title}</Title>
  </Container>
);
