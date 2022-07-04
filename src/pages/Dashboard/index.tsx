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
    title: "Desenvolvimento de site",
    amount: "R$ 12.000,00",
    date: "13/04/2020",
    category: {
      name: "Vendas",
      icon: "dollar-sign",
    },
  },
  {
    id: 3,
    title: "Desenvolvimento de site",
    amount: "R$ 12.000,00",
    date: "13/04/2020",
    category: {
      name: "Vendas",
      icon: "dollar-sign",
    },
  },
  {
    id: 4,
    title: "Desenvolvimento de site",
    amount: "R$ 12.000,00",
    date: "13/04/2020",
    category: {
      name: "Vendas",
      icon: "dollar-sign",
    },
  },
  {
    id: 5,
    title: "Desenvolvimento de site",
    amount: "R$ 12.000,00",
    date: "13/04/2020",
    category: {
      name: "Vendas",
      icon: "dollar-sign",
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
