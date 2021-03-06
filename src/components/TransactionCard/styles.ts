import { Feather } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { TransactionCardType } from ".";

interface TypeProps {
  type: TransactionCardType;
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  padding: ${RFValue(17)}px ${RFValue(24)}px;
  margin-bottom: ${RFValue(16)}px;
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Amount = styled.Text<TypeProps>`
  font-size: ${RFValue(20)}px;
  margin-top: ${RFValue(2)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  color: ${({ type, theme }) => {
    if (type === "negative") {
      return theme.colors.attention;
    }

    return theme.colors.success;
  }};
`;

export const TrashButton = styled(BorderlessButton)`
  width: ${RFValue(24)}px;
  height: ${RFValue(24)}px;
  align-items: center;
  justify-content: center;
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${RFValue(19)}px;
`;

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(20)}px;
`;

export const CategoryName = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-left: ${RFValue(17)}px;
`;

export const Date = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
