import { RectButtonProps } from "react-native-gesture-handler";
import { Button, Container, Icon, Title } from "./styles";

export type TransactionType = "positive" | "negative";

interface TransactionTypeButtonProps extends RectButtonProps {
  type: TransactionType;
  title: string;
  isActive: boolean;
}

const icons: Record<TransactionType, string> = {
  positive: "arrow-up-circle",
  negative: "arrow-down-circle",
};

export const TransactionTypeButton: React.FC<TransactionTypeButtonProps> = ({
  type,
  title,
  isActive,
  ...props
}) => (
  <Container isActive={isActive} type={type}>
    <Button activeOpacity={0.5} {...props}>
      <Icon name={icons[type]} type={type} />

      <Title>{title}</Title>
    </Button>
  </Container>
);
