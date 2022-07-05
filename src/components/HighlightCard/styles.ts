import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { HighlightCardType } from ".";

interface TypeProps {
  type: HighlightCardType;
}

export const Container = styled.View<TypeProps>`
  background-color: ${({ type, theme }) => {
    if (type === "total") {
      return theme.colors.secondary;
    }

    return theme.colors.shape;
  }};

  width: ${RFValue(300)}px;
  border-radius: 5px;
  padding: ${RFValue(19)}px ${RFValue(23)}px ${RFValue(42)}px;
  margin-right: ${RFValue(16)}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ type, theme }) => {
    if (type === "total") {
      return theme.colors.shape;
    }

    return theme.colors.title;
  }};
`;

interface IconProps extends TypeProps {
  name: string;
}

export const Icon = styled(Feather as any)<IconProps>`
  font-size: ${RFValue(40)}px;
  color: ${({ type, theme }) => {
    if (type === "up") {
      return theme.colors.success;
    }

    if (type === "down") {
      return theme.colors.attention;
    }

    return theme.colors.shape;
  }};
`;

export const Footer = styled.View``;

export const Amount = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;

  color: ${({ type, theme }) => {
    if (type === "total") {
      return theme.colors.shape;
    }

    return theme.colors.title;
  }};

  margin-top: ${RFValue(38)}px;
`;

export const LastTransaction = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;

  color: ${({ type, theme }) => {
    if (type === "total") {
      return theme.colors.shape;
    }

    return theme.colors.text;
  }};
`;
