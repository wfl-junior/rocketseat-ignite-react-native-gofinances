import { Feather } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(113)}px;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${RFValue(19)}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Content = styled.ScrollView`
  flex: 1;
  padding: 0 ${RFValue(24)}px;
`;

export const MonthSelect = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${RFValue(24)}px;
`;

export const MonthSelectButton = styled(BorderlessButton as any)``;

export const MonthSelectIcon = styled(Feather as any)`
  font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;
