import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";
import {
  Container,
  Header,
  HighlightCards,
  Icon,
  Photo,
  Title,
  TransactionList,
  Transactions,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
} from "./styles";

const data = [
  {
    id: 1,
    type: "positive",
    title: "Desenvolvimento de site",
    amount: "R$ 12.000,00",
    date: "13/04/2020",
    category: {
      name: "Vendas",
      icon: "dollar-sign",
    },
  },
  {
    id: 2,
    type: "negative",
    title: "Hamburgueria Pizzy",
    amount: "R$ 59,00",
    date: "10/04/2020",
    category: {
      name: "Alimentação",
      icon: "coffee",
    },
  },
  {
    id: 3,
    type: "negative",
    title: "Aluguel do apartamento",
    amount: "R$ 1.200,00",
    date: "27/03/2020",
    category: {
      name: "Casa",
      icon: "shopping-bag",
    },
  },
];

export const Dashboard: React.FC = () => (
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

        <Icon name="power" />
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

      <TransactionList
        data={data}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => <TransactionCard {...item} />}
        showsVerticalScrollIndicator={false}
      />
    </Transactions>
  </Container>
);
