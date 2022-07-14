import { Button, Text, TextInput, View } from "react-native";

export const Profile: React.FC = () => (
  <View>
    <Text>Perfil</Text>
    <TextInput placeholder="Nome" autoCorrect={false} />
    <TextInput placeholder="Sobrenome" autoCorrect={false} />
    <Button title="Salvar" onPress={() => {}} />
  </View>
);
