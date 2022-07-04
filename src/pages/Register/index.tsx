import { Input } from "../../components/Form/Input";
import { Container, Form, Header, Title } from "./styles";

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = () => (
  <Container>
    <Header>
      <Title>Cadastro</Title>
    </Header>

    <Form>
      <Input placeholder="Nome" />
      <Input placeholder="Preço" />
    </Form>
  </Container>
);
