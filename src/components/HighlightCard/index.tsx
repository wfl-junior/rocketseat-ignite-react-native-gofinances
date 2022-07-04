import {
  Amount,
  Container,
  Footer,
  Header,
  Icon,
  LastTransaction,
  Title,
} from "./styles";

export type HighlightCardType = "up" | "down" | "total";

interface HighlightCardProps {
  title: string;
  amount: string;
  lastTransaction: string;
  type: HighlightCardType;
}

const icon: Record<HighlightCardType, string> = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
  total: "dollar-sign",
};

export const HighlightCard: React.FC<HighlightCardProps> = ({
  title,
  amount,
  lastTransaction,
  type,
}) => (
  <Container type={type}>
    <Header>
      <Title type={type}>{title}</Title>
      <Icon name={icon[type]} type={type} />
    </Header>

    <Footer>
      <Amount type={type}>{amount}</Amount>
      <LastTransaction type={type}>{lastTransaction}</LastTransaction>
    </Footer>
  </Container>
);
