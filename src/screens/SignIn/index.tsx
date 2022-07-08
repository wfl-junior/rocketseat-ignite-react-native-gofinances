import { Alert, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppleIcon from "../../assets/apple-icon.svg";
import GoogleIcon from "../../assets/google-icon.svg";
import Logo from "../../assets/logo.svg";
import { SignInButton } from "../../components/SignInButton";
import { useAuthContext } from "../../contexts/AuthContext";
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
  const { signInWithGoogle, signInWithApple } = useAuthContext();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.warn(error);
      Alert.alert("Não foi possível conectar com a conta Google");
    }
  }

  async function handleSignInWithApple() {
    try {
      await signInWithApple();
    } catch (error) {
      console.warn(error);
      Alert.alert("Não foi possível conectar com a conta Apple");
    }
  }

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
          <SignInButton
            title="Entrar com Google"
            svg={GoogleIcon}
            onPress={handleSignInWithGoogle}
          />

          {Platform.OS === "ios" && (
            <SignInButton
              title="Entrar com Apple"
              svg={AppleIcon}
              onPress={handleSignInWithApple}
            />
          )}
        </ButtonsContainer>
      </Footer>
    </Container>
  );
};
