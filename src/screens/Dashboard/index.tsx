import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
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

export const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(transactionsKey)
      .then(data => {
        if (data) {
          const transactions: Array<Transaction & { categorySlug: string }> =
            JSON.parse(data);

          setTransactions(
            transactions.map(transaction => ({
              ...transaction,
              amount: formatAmount(Number(transaction.amount)),
              date: formatDate(transaction.date),
              category: categories.find(
                category => category.slug === transaction.categorySlug,
              )!,
            })),
          );
        }
      })
      .catch(console.log);
  }, []);

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
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
          type="up"
        />

        <HighlightCard
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
          type="down"
        />

        <HighlightCard
          title="Total"
          amount="R$ 16.141,00"
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
