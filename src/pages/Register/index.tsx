import { useState } from "react";
import { Button } from "../../components/Form/Button";
import { CategorySelect } from "../../components/Form/CategorySelect";
import { Input } from "../../components/Form/Input";
import {
  TransactionType,
  TransactionTypeButton,
} from "../../components/Form/TransactionTypeButton";
import {
  Container,
  Fields,
  Form,
  Header,
  Title,
  TransactionTypeButtons,
} from "./styles";

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = () => {
  const [transactionType, setTransactionType] =
    useState<TransactionType | null>(null);

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <TransactionTypeButtons>
            <TransactionTypeButton
              type="up"
              title="Entrada"
              onPress={() => setTransactionType("up")}
              isActive={transactionType === "up"}
            />

            <TransactionTypeButton
              type="down"
              title="Saída"
              onPress={() => setTransactionType("down")}
              isActive={transactionType === "down"}
            />
          </TransactionTypeButtons>

          <CategorySelect title="Categoria" />
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  );
};
