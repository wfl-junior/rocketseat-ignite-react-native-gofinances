import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import { TransactionType } from ".";

interface TypeProps {
  type: TransactionType;
}

interface ContainerProps extends TypeProps {
  isActive: boolean;
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: ${RFValue(16)}px;
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
          if (type === "down") {
            return theme.colors.attentionLight;
          }

          return theme.colors.successLight;
        }};
      `;
    }
  }}
`;

export const Icon = styled(Feather as any)<TypeProps>`
  font-size: ${RFValue(24)}px;
  margin-right: ${RFValue(12)}px;

  color: ${({ type, theme }) => {
    if (type === "down") {
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
