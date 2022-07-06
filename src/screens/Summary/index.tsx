import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { VictoryPie } from "victory-native";
import { HistoryCard } from "../../components/HistoryCard";
import { LoadingScreen } from "../../components/LoadingScreen";
import { theme } from "../../global/styles/theme";
import { categories } from "../../utils/categories";
import { transactionsKey } from "../../utils/constants";
import { formatAmount } from "../../utils/formatAmount";
import { TransactionInStorage } from "../Dashboard";
import { ChartContainer, Container, Content, Header, Title } from "./styles";

interface CategoryData {
  slug: string;
  name: string;
  color: string;
  total: number;
  formattedTotal: string;
  percentage: string;
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
              const { total, categoryTotal } = transactions.reduce(
                ({ total, categoryTotal }, transaction) => {
                  const amount = Number(transaction.amount);

                  if (transaction.categorySlug === category.slug) {
                    categoryTotal += amount;
                  }

                  return {
                    total: total + amount,
                    categoryTotal,
                  };
                },
                {
                  total: 0,
                  categoryTotal: 0,
                },
              );

              if (categoryTotal > 0) {
                data.push({
                  slug: category.slug,
                  name: category.name,
                  color: category.color,
                  total: categoryTotal,
                  formattedTotal: formatAmount(categoryTotal),
                  percentage: `${((categoryTotal / total) * 100).toFixed(1)}%`,
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

      <Content showsVerticalScrollIndicator={false}>
        <ChartContainer>
          {/* @ts-ignore */}
          <VictoryPie
            data={categoriesData}
            colorScale={categoriesData.map(category => category.color)}
            x="percentage"
            y="total"
            labelRadius={50}
            style={{
              labels: {
                fontSize: RFValue(16.65),
                fontWeight: "bold",
                fill: theme.colors.shape,
              },
            }}
          />
        </ChartContainer>

        {categoriesData.map(category => (
          <HistoryCard
            key={category.slug}
            title={category.name}
            amount={category.formattedTotal}
            borderColor={category.color}
          />
        ))}
      </Content>
    </Container>
  );
};
