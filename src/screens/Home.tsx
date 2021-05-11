import i18n from "i18n-js";
import React, { useContext } from "react";
import { Paragraph } from "react-native-paper";
import { LanguageContext } from "../contexts";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  const insets = useSafeAreaInsets();

  useContext(LanguageContext);

  return (
    <View style={{ marginTop: insets.top }}>
      <Paragraph>{i18n.t("home.home")}</Paragraph>
    </View>
  );
};
