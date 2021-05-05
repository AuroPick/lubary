import i18n from "i18n-js";
import React, { useContext } from "react";
import { Paragraph } from "react-native-paper";
import { LanguageContext } from "../contexts";
import { SafeAreaView } from "../utils";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  useContext(LanguageContext);

  return (
    <SafeAreaView>
      <Paragraph>{i18n.t("home.home")}</Paragraph>
    </SafeAreaView>
  );
};
