import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import { TransactionType } from ".";

interface TypeProps {
  type: TransactionType;
}

interface ContainerProps extends TypeProps {
  isActive: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 48%;
  border-radius: 5px;

  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-width: ${({ isActive }) => {
    if (isActive) {
      return "0";
    }

    return "1.5px";
  }};

  ${({ type, isActive }) => {
    if (isActive) {
      return css`
        background-color: ${({ theme }) => {
          if (type === "negative") {
            return theme.colors.attentionLight;
          }

          return theme.colors.successLight;
        }};
      `;
    }

    return "";
  }}
`;

export const Button = styled(RectButton)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${RFValue(16)}px;
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(24)}px;
  margin-right: ${RFValue(12)}px;

  color: ${({ type, theme }) => {
    if (type === "negative") {
      return theme.colors.attention;
    }

    return theme.colors.success;
  }};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
