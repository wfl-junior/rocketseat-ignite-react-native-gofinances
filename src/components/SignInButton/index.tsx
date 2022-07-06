import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";
import { Container, IconContainer, Title } from "./styles";

interface SignInButtonProps extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export const SignInButton: React.FC<SignInButtonProps> = ({
  title,
  svg: Icon,
  ...props
}) => (
  <Container {...props}>
    <IconContainer>
      <Icon />
    </IconContainer>

    <Title>{title}</Title>
  </Container>
);
