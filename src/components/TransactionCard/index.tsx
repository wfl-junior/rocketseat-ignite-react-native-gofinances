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

interface Category {
  name: string;
  icon: string;
}

export type TransactionCardType = "positive" | "negative";

export interface TransactionCardProps {
  type: TransactionCardType;
  title: string;
  amount: string;
  category: Category;
  date: string;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  type,
  title,
  amount,
  category,
  date,
}) => (
  <Container>
    <Title>{title}</Title>
    <Amount type={type}>
      {type === "negative" && "- "}
      {amount}
    </Amount>

    <Footer>
      <Category>
        <Icon name={category.icon} />
        <CategoryName>{category.name}</CategoryName>
      </Category>

      <Date>{date}</Date>
    </Footer>
  </Container>
);
