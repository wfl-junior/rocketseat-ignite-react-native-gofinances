import { Feather } from "@expo/vector-icons";
import Constants from "expo-constants";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const UserWrapper = styled.View`
  margin-top: ${RFValue(Constants.statusBarHeight)}px;
  width: 100%;
  padding: 0 ${RFValue(24)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px;
`;

export const User = styled.View`
  margin-left: ${RFValue(17)}px;
`;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const Icon = styled(Feather as any)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`;

export const HighlightCards = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingLeft: RFValue(24),
    paddingRight: RFValue(8),
  },
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`;

export const Transactions = styled.View`
  flex: 1;
  padding: 0 ${RFValue(24)}px;

  margin-top: ${RFPercentage(12)}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.textDark};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-bottom: ${RFValue(16)}px;
`;

export const TransactionList = styled.FlatList``;
