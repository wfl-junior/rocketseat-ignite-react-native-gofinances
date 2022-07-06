import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Spinner = styled.ActivityIndicator.attrs({ size: RFValue(48) })`
  color: ${({ theme }) => theme.colors.shape};
`;
