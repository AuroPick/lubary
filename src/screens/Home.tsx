import i18n from "i18n-js";
import React, { useContext } from "react";
import { Paragraph } from "react-native-paper";
import { Context } from "../context";
import { SafeAreaView } from "../utils";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  useContext(Context);
  return (
    <SafeAreaView>
      <Paragraph>{i18n.t("home.home")}</Paragraph>
    </SafeAreaView>
  );
};
