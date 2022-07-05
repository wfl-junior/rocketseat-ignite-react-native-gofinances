import { useState } from "react";
import { Modal } from "react-native";
import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { Input } from "../../components/Form/Input";
import {
  TransactionType,
  TransactionTypeButton,
} from "../../components/Form/TransactionTypeButton";
import { categories } from "../../utils/categories";
import { CategorySelect } from "../CategorySelect";
import {
  Container,
  Fields,
  Form,
  Header,
  Title,
  TransactionTypeButtons,
} from "./styles";

interface Category {
  slug: string;
  name: string;
}

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);
  const [transactionType, setTransactionType] =
    useState<TransactionType | null>(null);

  function handleCategorySelectButtonPress() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

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

          <CategorySelectButton
            title="Categoria"
            activeCategoryName={category?.name}
            onPress={handleCategorySelectButtonPress}
          />
        </Fields>

        <Button title="Enviar" />
      </Form>

      <Modal visible={isModalOpen}>
        <CategorySelect
          activeCategorySlug={category?.slug}
          onSelect={slug => {
            const selectedCategory = categories.find(category => {
              return category.slug === slug;
            });

            if (selectedCategory) {
              return setCategory({
                slug: selectedCategory.slug,
                name: selectedCategory.name,
              });
            }

            setCategory(null);
          }}
          onClose={handleCloseModal}
        />
      </Modal>
    </Container>
  );
};
