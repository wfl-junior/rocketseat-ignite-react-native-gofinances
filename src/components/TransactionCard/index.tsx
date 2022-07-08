import { Alert, View } from "react-native";
import { useTransactionsContext } from "../../contexts/TransactionsContext";
import {
  Amount,
  Category,
  CategoryName,
  Container,
  Date,
  Footer,
  Header,
  Icon,
  Title,
  TrashButton,
} from "./styles";

interface Category {
  name: string;
  icon: string;
}

export type TransactionCardType = "positive" | "negative";

export interface Transaction {
  id: string;
  type: TransactionCardType;
  title: string;
  amount: string;
  category: Category;
  date: string;
}

export const TransactionCard: React.FC<Transaction> = ({
  id,
  type,
  title,
  amount,
  category,
  date,
}) => {
  const { deleteTransaction } = useTransactionsContext();

  async function handleDeleteTransaction() {
    Alert.alert(
      "Remover transação",
      "Tem certeza que você deseja remover essa transação?",
      [
        { text: "Não" },
        {
          text: "Sim",
          onPress: () => deleteTransaction(id),
        },
      ],
    );
  }

  return (
    <Container>
      <Header>
        <View>
          <Title>{title}</Title>

          <Amount type={type}>
            {type === "negative" && "- "}
            {amount}
          </Amount>
        </View>

        <TrashButton onPress={handleDeleteTransaction}>
          <Icon name="trash-2" />
        </TrashButton>
      </Header>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>

        <Date>{date}</Date>
      </Footer>
    </Container>
  );
};
