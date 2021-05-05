import i18n from "i18n-js";
import React, { useContext } from "react";
import { Paragraph } from "react-native-paper";
import { LanguageContext } from "../contexts";
import { SafeAreaView } from "../utils";

interface LullabiesProps {}

export const Lullabies: React.FC<LullabiesProps> = ({}) => {
  useContext(LanguageContext);

  return (
    <SafeAreaView>
      <Paragraph>{i18n.t("lullabies.lullabies")}</Paragraph>
    </SafeAreaView>
  );
};
