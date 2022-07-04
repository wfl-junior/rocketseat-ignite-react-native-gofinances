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

interface TransactionCardProps {
  title: string;
  amount: string;
  category: Category;
  date: string;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  title,
  amount,
  category,
  date,
}) => (
  <Container>
    <Title>{title}</Title>
    <Amount>{amount}</Amount>

    <Footer>
      <Category>
        <Icon name={category.icon} />
        <CategoryName>{category.name}</CategoryName>
      </Category>

      <Date>{date}</Date>
    </Footer>
  </Container>
);
