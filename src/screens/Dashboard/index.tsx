import { useMemo, useState } from "react";
import { FlatList } from "react-native";
import { HighlightCard } from "../../components/HighlightCard";
import { LoadingScreen } from "../../components/LoadingScreen";
import { Transaction, TransactionCard } from "../../components/TransactionCard";
import { useAuthContext } from "../../contexts/AuthContext";
import { useTransactionsContext } from "../../contexts/TransactionsContext";
import { categories } from "../../utils/categories";
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

export type TransactionInStorage = Omit<Transaction, "category"> & {
  categorySlug: string;
};

interface HighlightData<T = { amount: string; date: string }> {
  income: T;
  outcome: T;
  total: T;
}

const formattedZero = formatAmount(0);
const noTransactionsMessage = "Não há transações";

const initialHighlightData: HighlightData = {
  income: {
    amount: formattedZero,
    date: noTransactionsMessage,
  },
  outcome: {
    amount: formattedZero,
    date: noTransactionsMessage,
  },
  total: {
    amount: formattedZero,
    date: noTransactionsMessage,
  },
};

export const Dashboard: React.FC = () => {
  const { transactions, isTransactionsLoading } = useTransactionsContext();
  const [highlightData, setHighlightData] = useState(initialHighlightData);
  const { user, signOut } = useAuthContext();

  const transactionsFormatted = useMemo((): Transaction[] => {
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

    const formattedTransactions = transactions.map(
      (transaction): Transaction => {
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
      },
    );

    const lastIncomeDate = Math.max(...dates.income);
    const lastOutcomeDate = Math.max(...dates.outcome);
    const firstTotalDate = Math.min(...dates.total);
    const lastTotalDate = Math.max(...dates.total);

    const incomeDateMessage =
      dates.income.length > 0
        ? `Última entrada dia ${formatLastTransactionDate(lastIncomeDate)}`
        : noTransactionsMessage;

    const outcomeDateMessage =
      dates.outcome.length > 0
        ? `Última saída dia ${formatLastTransactionDate(lastOutcomeDate)}`
        : noTransactionsMessage;

    let totalDateMessage = "";

    if (dates.income.length > 0 && dates.outcome.length > 0) {
      totalDateMessage = formatTotalTransactionsDate(
        firstTotalDate,
        lastTotalDate,
      );
    } else {
      if (!dates.income.length) {
        totalDateMessage = outcomeDateMessage;
      } else {
        totalDateMessage = incomeDateMessage;
      }
    }

    setHighlightData({
      income: {
        amount: formatAmount(newHighlightData.income),
        date: incomeDateMessage,
      },
      outcome: {
        amount: formatAmount(newHighlightData.outcome),
        date: outcomeDateMessage,
      },
      total: {
        amount: formatAmount(newHighlightData.total),
        date: totalDateMessage,
      },
    });

    return formattedTransactions;
  }, [transactions]);

  if (isTransactionsLoading) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: user!.image }} />

            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>{user!.name}</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={signOut}>
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
          data={transactionsFormatted}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard {...item} />}
          showsVerticalScrollIndicator={false}
        />
      </Transactions>
    </Container>
  );
};
