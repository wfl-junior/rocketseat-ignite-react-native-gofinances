import { Category, Container, Icon } from "./styles";

interface CategorySelectProps {
  title: string;
}

export const CategorySelect: React.FC<CategorySelectProps> = ({ title }) => (
  <Container activeOpacity={0.7}>
    <Category>{title}</Category>
    <Icon name="chevron-down" />
  </Container>
);
