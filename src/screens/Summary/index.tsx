import { HistoryCard } from "../../components/HistoryCard";
import { Container, Header, Title } from "./styles";

export const Summary: React.FC = () => (
  <Container>
    <Header>
      <Title>Resumo por categoria</Title>
    </Header>

    <HistoryCard title="Comprar" amount="R$ 150,50" borderColor="red" />
  </Container>
);
