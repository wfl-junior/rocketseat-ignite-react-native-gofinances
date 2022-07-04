import { Button } from "../../components/Form/Button";
import { Input } from "../../components/Form/Input";
import { Container, Fields, Form, Header, Title } from "./styles";

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = () => (
  <Container>
    <Header>
      <Title>Cadastro</Title>
    </Header>

    <Form>
      <Fields>
        <Input placeholder="Nome" />
        <Input placeholder="Preço" />
      </Fields>

      <Button title="Enviar" />
    </Form>
  </Container>
);
