import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import uuid from "react-native-uuid";
import * as yup from "yup";
import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { InputForm } from "../../components/Form/InputForm";
import {
  TransactionType,
  TransactionTypeButton,
} from "../../components/Form/TransactionTypeButton";
import { useBottomTabNavigation } from "../../hooks/useBottomTabNavigation";
import { categories } from "../../utils/categories";
import { transactionsKey } from "../../utils/constants";
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
  title: string;
  amount: string;
}

const registerTransactionSchema = yup.object({
  title: yup.string().required("O título é obrigatório"),
  amount: yup
    .number()
    .typeError("Informe um valor numérico")
    .positive("O preço não pode ser negativo")
    .required("O preço é obrigatório"),
});

export const Register: React.FC = () => {
  const { navigate } = useBottomTabNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerTransactionSchema),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);
  const [transactionType, setTransactionType] =
    useState<TransactionType | null>(null);

  async function handleRegister(values: RegisterFormData) {
    if (!transactionType) {
      return Alert.alert("Erro", "Selecione o tipo da transação");
    }

    if (!category) {
      return Alert.alert("Erro", "Selecione uma categoria");
    }

    try {
      const newTransaction = {
        ...values,
        id: String(uuid.v4()),
        type: transactionType,
        categorySlug: category.slug,
        date: new Date().toISOString(),
      };

      const existingTransactions = await AsyncStorage.getItem(transactionsKey);
      const transactions = existingTransactions
        ? JSON.parse(existingTransactions)
        : [];

      await AsyncStorage.setItem(
        transactionsKey,
        JSON.stringify([...transactions, newTransaction]),
      );

      reset();
      setCategory(null);
      setTransactionType(null);

      navigate("Listagem");
    } catch (error) {
      if (
        error instanceof TypeError &&
        error.message.toLowerCase().includes("invalid attempt to spread")
      ) {
        await AsyncStorage.removeItem(transactionsKey).catch(console.log);
      } else {
        console.log(error);
      }

      Alert.alert("Não foi possível salvar");
    }
  }

  function handleCategorySelectButtonPress() {
    setIsModalOpen(true);
  }

  function handleCloseCategorySelectModal() {
    setIsModalOpen(false);
  }

  function handleCategorySelect(slug: string) {
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
              name="title"
              control={control}
              placeholder="Título"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.title}
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
                type="positive"
                title="Entrada"
                onPress={() => setTransactionType("positive")}
                isActive={transactionType === "positive"}
              />

              <TransactionTypeButton
                type="negative"
                title="Saída"
                onPress={() => setTransactionType("negative")}
                isActive={transactionType === "negative"}
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
            onClose={handleCloseCategorySelectModal}
            onSelect={handleCategorySelect}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};
