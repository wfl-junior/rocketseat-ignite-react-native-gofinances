import { RectButtonProps } from "react-native-gesture-handler";
import { Category, Container, Icon } from "./styles";

interface CategorySelectButtonProps extends RectButtonProps {
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
