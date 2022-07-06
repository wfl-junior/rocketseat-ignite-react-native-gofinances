import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: 70%;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: flex-end;
  padding: 0 ${RFValue(48)}px;
`;

export const TitleWrapper = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  text-align: center;
  margin-top: ${RFValue(40)}px;
`;

export const SignInTitle = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  text-align: center;
  margin-top: ${RFValue(80)}px;
  margin-bottom: ${RFValue(67)}px;
`;

export const Footer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondary};
`;
