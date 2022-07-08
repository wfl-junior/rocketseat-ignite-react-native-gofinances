import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, View } from "react-native";
import { useAuthContext } from "../../contexts/AuthContext";
import { TransactionInStorage } from "../../screens/Dashboard";
import { transactionsStorageKey } from "../../utils/constants";
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

export interface TransactionCardProps {
  id: string;
  type: TransactionCardType;
  title: string;
  amount: string;
  category: Category;
  date: string;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  id,
  type,
  title,
  amount,
  category,
  date,
}) => {
  const { user } = useAuthContext();

  async function handleDeleteTransaction() {
    Alert.alert(
      "Remover transação",
      "Tem certeza que você deseja remover essa transação?",
      [
        { text: "Não" },
        {
          text: "Sim",
          onPress: async () => {
            const storageKey = `${transactionsStorageKey}_user:${user!.id}`;
            const data = await AsyncStorage.getItem(storageKey);

            if (data) {
              const transactions: TransactionInStorage[] = JSON.parse(data);

              const newTransactions = transactions.filter(
                transaction => transaction.id !== id,
              );

              await AsyncStorage.setItem(
                storageKey,
                JSON.stringify(newTransactions),
              );
            }
          },
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
