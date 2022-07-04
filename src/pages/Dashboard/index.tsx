import { Container, Title } from "./styles";

interface DashboardProps {
  onLayout?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLayout }) => (
  <Container onLayout={onLayout}>
    <Title>Dashboard</Title>
  </Container>
);
