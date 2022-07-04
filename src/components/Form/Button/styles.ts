import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(TouchableOpacity)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  align-items: center;
  justify-content: center;
  padding: ${RFValue(18)}px ${RFValue(16)}px;
  border-radius: 5px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
