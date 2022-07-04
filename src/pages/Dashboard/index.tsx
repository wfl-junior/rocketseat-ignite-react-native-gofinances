import {
  Container,
  Header,
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
  </Container>
);
