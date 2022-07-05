import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
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
import { asyncStorageKeyPrefix } from "../../utils/constants";
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

const transactionsKey = `${asyncStorageKeyPrefix}transactions`;

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

  useEffect(() => {
    AsyncStorage.getItem(transactionsKey)
      .then(transactions => {
        if (transactions) {
          return console.log(JSON.parse(transactions));
        }

        console.log("no transactions");
      })
      .catch(console.error);
  }, []);

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
        transactionType,
        category: category.slug,
      };

      const existingTransactions = await AsyncStorage.getItem(transactionsKey);
      const transactions = existingTransactions
        ? JSON.parse(existingTransactions)
        : [];

      await AsyncStorage.setItem(
        transactionsKey,
        JSON.stringify([...transactions, newTransaction]),
      );

      Alert.alert("Sucesso", "Transação salva com sucesso");
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
