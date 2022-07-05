import { Category, Container, Icon } from "./styles";

interface SelectProps {
  title: string;
}

export const Select: React.FC<SelectProps> = ({ title }) => (
  <Container activeOpacity={0.7}>
    <Category>{title}</Category>
    <Icon name="chevron-down" />
  </Container>
);
