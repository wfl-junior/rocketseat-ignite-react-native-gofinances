import { RFValue } from "react-native-responsive-fontsize";
import AppleIcon from "../../assets/apple-icon.svg";
import GoogleIcon from "../../assets/google-icon.svg";
import Logo from "../../assets/logo.svg";
import { SignInButton } from "../../components/SignInButton";
import {
  ButtonsContainer,
  Container,
  Footer,
  Header,
  SignInTitle,
  Title,
  TitleWrapper,
} from "./styles";

export const SignIn: React.FC = () => {
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <Logo width={RFValue(120)} height={RFValue(68)} />

          <Title>Controle suas finanças de forma muito simples</Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {"\n"} uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <ButtonsContainer>
          <SignInButton title="Entrar com Google" svg={GoogleIcon} />
          <SignInButton title="Entrar com Apple" svg={AppleIcon} />
        </ButtonsContainer>
      </Footer>
    </Container>
  );
};
