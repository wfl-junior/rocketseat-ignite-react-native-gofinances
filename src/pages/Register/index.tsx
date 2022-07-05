import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "react-native";
import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { InputForm } from "../../components/Form/InputForm";
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

interface FormData {
  name: string;
  amount: string;
}

export const Register: React.FC = () => {
  const { control, handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);
  const [transactionType, setTransactionType] =
    useState<TransactionType | null>(null);

  function handleRegister(values: FormData) {
    console.log({
      ...values,
      transactionType,
      category: category?.slug,
    });
  }

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
          <InputForm name="name" control={control} placeholder="Nome" />
          <InputForm name="amount" control={control} placeholder="Preço" />

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

        <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
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
