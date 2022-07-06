import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
import { categories } from "../../utils/categories";
import { transactionsKey } from "../../utils/constants";
import { formatAmount } from "../../utils/formatAmount";
import { formatDate } from "../../utils/formatDate";
import {
  Container,
  Header,
  HighlightCards,
  Icon,
  LogoutButton,
  Photo,
  Title,
  Transactions,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
} from "./styles";

interface Transaction extends TransactionCardProps {
  id: string;
}

interface HighlightData<T extends string | number = string> {
  income: T;
  outcome: T;
  total: T;
}

const formattedZero = formatAmount(0);

export const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({
    income: formattedZero,
    outcome: formattedZero,
    total: formattedZero,
  });

  const fetchTransactions = useCallback(() => {
    AsyncStorage.getItem(transactionsKey)
      .then(data => {
        if (data) {
          const transactions: Array<
            Omit<Transaction, "category"> & { categorySlug: string }
          > = JSON.parse(data);

          const newHighlightData: HighlightData<number> = {
            income: 0,
            outcome: 0,
            total: 0,
          };

          const formattedTransactions = transactions.map(transaction => {
            const amount = Number(transaction.amount);

            if (transaction.type === "positive") {
              newHighlightData.income += amount;
              newHighlightData.total += amount;
            } else {
              newHighlightData.outcome += amount;
              newHighlightData.total -= amount;
            }

            return {
              id: transaction.id,
              title: transaction.title,
              type: transaction.type,
              amount: formatAmount(amount),
              date: formatDate(transaction.date),
              category: categories.find(
                category => category.slug === transaction.categorySlug,
              )!,
            };
          });

          setTransactions(formattedTransactions);
          setHighlightData({
            income: formatAmount(newHighlightData.income),
            outcome: formatAmount(newHighlightData.outcome),
            total: formatAmount(newHighlightData.total),
          });
        }
      })
      .catch(console.log);
  }, []);

  useFocusEffect(fetchTransactions);

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: "https://github.com/wfl-junior.png" }} />

            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Wallace Júnior</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards horizontal showsHorizontalScrollIndicator={false}>
        <HighlightCard
          title="Entradas"
          amount={highlightData.income}
          lastTransaction="Última entrada dia 13 de abril"
          type="up"
        />

        <HighlightCard
          title="Saídas"
          amount={highlightData.outcome}
          lastTransaction="Última saída dia 03 de abril"
          type="down"
        />

        <HighlightCard
          title="Total"
          amount={highlightData.total}
          lastTransaction="01 à 16 de abril"
          type="total"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <FlatList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard {...item} />}
          showsVerticalScrollIndicator={false}
        />
      </Transactions>
    </Container>
  );
};
