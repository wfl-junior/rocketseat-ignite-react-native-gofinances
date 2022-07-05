import { FlatList } from "react-native";
import { Button } from "../../components/Form/Button";
import { categories } from "../../utils/categories";
import {
  Category,
  Container,
  Footer,
  Header,
  Icon,
  Name,
  Separator,
  Title,
} from "./styles";

interface CategorySelectProps {
  category: string;
}

export const CategorySelect: React.FC<CategorySelectProps> = () => (
  <Container>
    <Header>
      <Title>Categoria</Title>
    </Header>

    <FlatList
      data={categories}
      style={{ flex: 1, width: "100%" }}
      keyExtractor={category => category.slug}
      ItemSeparatorComponent={() => <Separator />}
      renderItem={({ item: category }) => (
        <Category>
          <Icon name={category.icon} />

          <Name>{category.name}</Name>
        </Category>
      )}
    />

    <Footer>
      <Button title="Selecionar" />
    </Footer>
  </Container>
);
