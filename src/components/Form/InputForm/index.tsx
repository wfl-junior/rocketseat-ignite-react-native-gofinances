import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";
import { Input } from "../Input";
import { Container } from "./styles";

interface InputFormProps extends TextInputProps {
  name: string;
  control: Control;
}

export const InputForm: React.FC<InputFormProps> = ({
  name,
  control,
  ...props
}) => (
  <Container>
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Input value={value} onChangeText={onChange} {...props} />
      )}
    />
  </Container>
);
