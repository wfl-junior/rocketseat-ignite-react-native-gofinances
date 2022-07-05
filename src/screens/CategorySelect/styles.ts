import { Feather } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  RectButton,
} from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${RFValue(19)}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

interface CategoryProps {
  isActive: boolean;
}

export const Category = styled(RectButton as any)<CategoryProps>`
  width: 100%;
  padding: ${RFValue(16)}px;
  flex-direction: row;
  align-items: center;

  background-color: ${({ isActive, theme }) => {
    if (isActive) {
      return theme.colors.secondaryLight;
    }

    return theme.colors.background;
  }};
`;

export const Icon = styled(Feather as any)`
  font-size: ${RFValue(20)}px;
  margin-right: ${RFValue(16)}px;
`;

export const Name = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.View`
  width: 100%;
  padding: ${RFValue(24)}px;
`;
