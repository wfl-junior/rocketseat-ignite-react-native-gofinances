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
  activeCategorySlug?: string;
  onSelect: (category: string) => void;
  onClose: () => void;
}

export const CategorySelect: React.FC<CategorySelectProps> = ({
  activeCategorySlug,
  onSelect,
  onClose,
}) => {
  function handleSelect() {
    onClose();
  }

  return (
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
          // TODO: fix para active
          <Category
            onPress={() => onSelect(category.slug)}
            isActive={category.slug === activeCategorySlug}
          >
            <Icon name={category.icon} />

            <Name>{category.name}</Name>
          </Category>
        )}
      />

      <Footer>
        <Button title="Selecionar" onPress={handleSelect} />
      </Footer>
    </Container>
  );
};
