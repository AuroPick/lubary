import i18n from "i18n-js";
import React, { useContext } from "react";
import { Paragraph } from "react-native-paper";
import { Context } from "../context";
import { SafeAreaView } from "../utils";

interface LullabiesProps {}

export const Lullabies: React.FC<LullabiesProps> = ({}) => {
  useContext(Context);
  return (
    <SafeAreaView>
      <Paragraph>{i18n.t("lullabies.lullabies")}</Paragraph>
    </SafeAreaView>
  );
};
