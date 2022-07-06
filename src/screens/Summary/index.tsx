import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import {
  addMonths,
  format,
  isSameMonth,
  isSameYear,
  subMonths,
} from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
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
import {
  ChartContainer,
  Container,
  Content,
  Header,
  Month,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Title,
} from "./styles";

interface CategoryData {
  slug: string;
  name: string;
  color: string;
  total: number;
  formattedTotal: string;
  percentage: string;
}

interface SelectedDate {
  date: Date;
  formatted: string;
}

function formatSelectedDate(date: Date) {
  return format(date, "MMMM, yyyy", {
    locale: ptBR,
  });
}

export const Summary: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categoriesData, setCategoriesData] = useState<CategoryData[]>([]);
  const bottomTabBarHeight = useBottomTabBarHeight();
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(() => {
    const date = new Date();

    return {
      date,
      formatted: formatSelectedDate(date),
    };
  });

  const fetchTransactions = useCallback(() => {
    AsyncStorage.getItem(transactionsKey)
      .then(async data => {
        if (data) {
          const transactions: TransactionInStorage[] = JSON.parse(data);

          const formattedCategories = categories.reduce<CategoryData[]>(
            (data, category) => {
              const { total, categoryTotal } = transactions.reduce(
                (totals, transaction) => {
                  const transactionDate = new Date(transaction.date);

                  if (
                    transaction.type === "negative" &&
                    isSameYear(selectedDate.date, transactionDate) &&
                    isSameMonth(selectedDate.date, transactionDate)
                  ) {
                    const amount = Number(transaction.amount);

                    if (transaction.categorySlug === category.slug) {
                      totals.categoryTotal += amount;
                    }

                    totals.total += amount;
                  }

                  return totals;
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
        Alert.alert("Houston, we have a problem.");
      })
      .finally(() => setIsLoading(false));
  }, [selectedDate]);

  useFocusEffect(fetchTransactions);

  if (isLoading) {
    return <LoadingScreen />;
  }

  function handleDateChange(action: "next" | "previous") {
    setIsLoading(true);

    const newDate =
      action === "next"
        ? addMonths(selectedDate.date, 1)
        : subMonths(selectedDate.date, 1);

    setSelectedDate({
      date: newDate,
      formatted: formatSelectedDate(newDate),
    });
  }

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomTabBarHeight }}
      >
        <MonthSelect>
          <MonthSelectButton onPress={() => handleDateChange("previous")}>
            <MonthSelectIcon name="chevron-left" />
          </MonthSelectButton>

          <Month>{selectedDate.formatted}</Month>

          <MonthSelectButton onPress={() => handleDateChange("next")}>
            <MonthSelectIcon name="chevron-right" />
          </MonthSelectButton>
        </MonthSelect>

        <ChartContainer>
          {/* @ts-ignore */}
          <VictoryPie
            data={categoriesData}
            colorScale={categoriesData.map(category => category.color)}
            x="percentage"
            y="total"
            labelRadius={95}
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
