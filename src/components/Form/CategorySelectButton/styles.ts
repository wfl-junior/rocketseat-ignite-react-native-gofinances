import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(RectButton)`
  background-color: ${({ theme }) => theme.colors.shape};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${RFValue(18)}px ${RFValue(16)}px;
  border-radius: 5px;
`;

interface CategoryProps {
  isActive: boolean;
}

export const Category = styled.Text<CategoryProps>`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ isActive, theme }) => {
    if (isActive) {
      return theme.colors.textDark;
    }

    return theme.colors.text;
  }};
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(20)}px;
`;
