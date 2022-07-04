import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(TextInput)`
  background-color: ${({ theme }) => theme.colors.shape};
  color: ${({ theme }) => theme.colors.textDark};
  width: 100%;
  padding: ${RFValue(18)}px ${RFValue(16)}px;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  border-radius: 5px;
  margin-bottom: ${RFValue(8)}px;
`;
