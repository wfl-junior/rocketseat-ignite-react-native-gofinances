import {
  Amount,
  Category,
  CategoryName,
  Container,
  Date,
  Footer,
  Icon,
  Title,
} from "./styles";

interface TransactionCardProps {}

export const TransactionCard: React.FC<TransactionCardProps> = () => (
  <Container>
    <Title>Desenvolvimento de site</Title>
    <Amount>R$ 12.000,00</Amount>

    <Footer>
      <Category>
        <Icon name="dollar-sign" />
        <CategoryName>Vendas</CategoryName>
      </Category>

      <Date>13/04/2020</Date>
    </Footer>
  </Container>
);
