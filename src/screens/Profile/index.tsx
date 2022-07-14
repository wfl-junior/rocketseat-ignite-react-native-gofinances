import { Button, Text, TextInput, View } from "react-native";

export const Profile: React.FC = () => (
  <View>
    <Text testID="title">Perfil</Text>

    <TextInput
      testID="name-input"
      placeholder="Nome"
      autoCorrect={false}
      value="Wallace"
    />

    <TextInput
      testID="surname-input"
      placeholder="Sobrenome"
      autoCorrect={false}
      value="Júnior"
    />

    <Button testID="save-button" title="Salvar" onPress={() => {}} />
  </View>
);
