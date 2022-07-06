import {
  Amount,
  AmountContainer,
  Container,
  CurrencySymbol,
  Title,
} from "./styles";

interface HistoryCardProps {
  title: string;
  amount: string;
  borderColor: string;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({
  title,
  amount,
  borderColor,
}) => (
  <Container borderColor={borderColor}>
    <Title>{title}</Title>

    <AmountContainer>
      <CurrencySymbol>R$</CurrencySymbol>
      <Amount>{amount.replace("R$", "")}</Amount>
    </AmountContainer>
  </Container>
);
