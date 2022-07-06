import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { HistoryCard } from "../../components/HistoryCard";
import { LoadingScreen } from "../../components/LoadingScreen";
import { categories } from "../../utils/categories";
import { transactionsKey } from "../../utils/constants";
import { formatAmount } from "../../utils/formatAmount";
import { TransactionInStorage } from "../Dashboard";
import { Container, Content, Header, Title } from "./styles";

interface CategoryData {
  slug: string;
  name: string;
  color: string;
  total: string;
}

export const Summary: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categoriesData, setCategoriesData] = useState<CategoryData[]>([]);

  const fetchTransactions = useCallback(() => {
    AsyncStorage.getItem(transactionsKey)
      .then(async data => {
        if (data) {
          const transactions: TransactionInStorage[] = JSON.parse(data);

          const formattedCategories = categories.reduce<CategoryData[]>(
            (data, category) => {
              const total = transactions.reduce<number>(
                (total, transaction) => {
                  if (transaction.categorySlug === category.slug) {
                    total += Number(transaction.amount);
                  }

                  return total;
                },
                0,
              );

              if (total > 0) {
                data.push({
                  slug: category.slug,
                  name: category.name,
                  color: category.color,
                  total: formatAmount(total),
                });
              }

              return data;
            },
            [],
          );

          setCategoriesData(formattedCategories);
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert("Ocorreu um erro inesperado");
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
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        {categoriesData.map(category => (
          <HistoryCard
            key={category.slug}
            title={category.name}
            amount={category.total}
            borderColor={category.color}
          />
        ))}
      </Content>
    </Container>
  );
};
