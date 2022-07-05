import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import * as yup from "yup";
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

export interface RegisterFormData {
  name: string;
  amount: string;
}

const registerTransactionSchema = yup.object({
  name: yup.string().required("O nome é obrigatório"),
  amount: yup
    .number()
    .typeError("Informe um valor numérico")
    .positive("O preço não pode ser negativo")
    .required("O preço é obrigatório"),
});

export const Register: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerTransactionSchema),
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);
  const [transactionType, setTransactionType] =
    useState<TransactionType | null>(null);

  function handleRegister(values: RegisterFormData) {
    if (!transactionType) {
      return Alert.alert("Erro", "Selecione o tipo da transação");
    }

    if (!category) {
      return Alert.alert("Erro", "Selecione uma categoria");
    }

    console.log({
      ...values,
      transactionType,
      category: category.slug,
    });
  }

  function handleCategorySelectButtonPress() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name}
            />

            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount}
            />

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
            onClose={handleCloseModal}
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
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};
