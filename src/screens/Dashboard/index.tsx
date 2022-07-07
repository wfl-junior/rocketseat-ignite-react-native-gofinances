import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Alert, FlatList } from "react-native";
import { HighlightCard } from "../../components/HighlightCard";
import { LoadingScreen } from "../../components/LoadingScreen";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
import { categories } from "../../utils/categories";
import {
  defaultErrorMessage,
  transactionsStorageKey,
} from "../../utils/constants";
import { formatAmount } from "../../utils/formatAmount";
import { formatDate } from "../../utils/formatDate";
import { formatLastTransactionDate } from "../../utils/formatLastTransactionDate";
import { formatTotalTransactionsDate } from "../../utils/formatTotalTransactionsDate";
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

export type TransactionInStorage = Omit<Transaction, "category"> & {
  categorySlug: string;
};

interface HighlightData<T = { amount: string; date: string }> {
  income: T;
  outcome: T;
  total: T;
}

const formattedZero = formatAmount(0);

const initialHighlightData: HighlightData = {
  income: {
    amount: formattedZero,
    date: "",
  },
  outcome: {
    amount: formattedZero,
    date: "",
  },
  total: {
    amount: formattedZero,
    date: "",
  },
};

export const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [highlightData, setHighlightData] = useState(initialHighlightData);

  const fetchTransactions = useCallback(() => {
    AsyncStorage.getItem(transactionsStorageKey)
      .then(async data => {
        if (data) {
          const transactions: TransactionInStorage[] = JSON.parse(data);

          const newHighlightData: HighlightData<number> = {
            income: 0,
            outcome: 0,
            total: 0,
          };

          const dates: HighlightData<number[]> = {
            income: [],
            outcome: [],
            total: [],
          };

          const formattedTransactions = transactions.map(transaction => {
            const amount = Number(transaction.amount);
            const date = new Date(transaction.date);

            if (transaction.type === "positive") {
              newHighlightData.income += amount;
              newHighlightData.total += amount;

              dates.income.push(date.getTime());
              dates.total.push(date.getTime());
            } else {
              newHighlightData.outcome += amount;
              newHighlightData.total -= amount;

              dates.outcome.push(date.getTime());
              dates.total.push(date.getTime());
            }

            return {
              id: transaction.id,
              title: transaction.title,
              type: transaction.type,
              amount: formatAmount(amount),
              date: formatDate(date),
              category: categories.find(
                category => category.slug === transaction.categorySlug,
              )!,
            };
          });

          setTransactions(formattedTransactions);

          const lastIncomeDate = Math.max(...dates.income);
          const lastOutcomeDate = Math.max(...dates.outcome);
          const firstTotalDate = Math.min(...dates.total);
          const lastTotalDate = Math.max(...dates.total);

          const formattedLastIncomeDate =
            formatLastTransactionDate(lastIncomeDate);
          const formattedLastOutcomeDate =
            formatLastTransactionDate(lastOutcomeDate);

          setHighlightData({
            income: {
              amount: formatAmount(newHighlightData.income),
              date: `Última entrada dia ${formattedLastIncomeDate}`,
            },
            outcome: {
              amount: formatAmount(newHighlightData.outcome),
              date: `Última saída dia ${formattedLastOutcomeDate}`,
            },
            total: {
              amount: formatAmount(newHighlightData.total),
              date: formatTotalTransactionsDate(firstTotalDate, lastTotalDate),
            },
          });
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert(defaultErrorMessage);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useFocusEffect(fetchTransactions);

  if (isLoading) {
    return <LoadingScreen />;
  }

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
          amount={highlightData.income.amount}
          lastTransaction={highlightData.income.date}
          type="up"
        />

        <HighlightCard
          title="Saídas"
          amount={highlightData.outcome.amount}
          lastTransaction={highlightData.outcome.date}
          type="down"
        />

        <HighlightCard
          title="Total"
          amount={highlightData.total.amount}
          lastTransaction={highlightData.total.date}
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
