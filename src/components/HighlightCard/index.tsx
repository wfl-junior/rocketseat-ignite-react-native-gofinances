import {
  Amount,
  Container,
  Footer,
  Header,
  Icon,
  LastTransaction,
  Title,
} from "./styles";

interface HighlightCardProps {}

export const HighlightCard: React.FC<HighlightCardProps> = () => (
  <Container>
    <Header>
      <Title>Entradas</Title>
      <Icon name="arrow-up-circle" />
    </Header>

    <Footer>
      <Amount>R$ 17.400,00</Amount>
      <LastTransaction>Última entrada dia 13 de abril</LastTransaction>
    </Footer>
  </Container>
);
