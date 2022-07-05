import { TouchableOpacityProps } from "react-native";
import { Category, Container, Icon } from "./styles";

interface CategorySelectButtonProps extends TouchableOpacityProps {
  title: string;
  activeCategoryName?: string;
}

export const CategorySelectButton: React.FC<CategorySelectButtonProps> = ({
  title,
  activeCategoryName,
  ...props
}) => (
  <Container activeOpacity={0.7} {...props}>
    <Category isActive={!!activeCategoryName}>
      {activeCategoryName ?? title}
    </Category>
    <Icon name="chevron-down" />
  </Container>
);
