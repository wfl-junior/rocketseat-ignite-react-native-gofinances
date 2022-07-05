import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import { TextInputProps } from "react-native";
import { Input } from "../Input";
import { Container, Error } from "./styles";

interface InputFormProps<T extends FieldValues = FieldValues>
  extends TextInputProps {
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
}

export const InputForm = <T extends FieldValues = FieldValues>({
  name,
  control,
  error,
  ...props
}: InputFormProps<T>): JSX.Element => (
  <Container>
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Input value={value} onChangeText={onChange} {...props} />
      )}
    />

    {error ? <Error>{error.message}</Error> : null}
  </Container>
);
