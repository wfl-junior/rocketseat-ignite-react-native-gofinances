import { HighlightCard } from "../../components/HighlightCard";
import {
  Container,
  Header,
  HighlightCards,
  Icon,
  Photo,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
} from "./styles";

interface DashboardProps {
  onLayout?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLayout }) => (
  <Container onLayout={onLayout}>
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
  </Container>
);
