import { RFValue } from "react-native-responsive-fontsize";
import AppleIcon from "../../assets/apple-icon.svg";
import GoogleIcon from "../../assets/google-icon.svg";
import Logo from "../../assets/logo.svg";
import {
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
        <GoogleIcon />
        <AppleIcon />
      </Footer>
    </Container>
  );
};
