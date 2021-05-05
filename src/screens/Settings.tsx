import i18n from "i18n-js";
import React, { useContext } from "react";
import { Text } from "react-native-paper";
import { Feedback, LangaugeSelector, ThemeSelector } from "../components";
import { LanguageContext } from "../contexts";
import { HorizontalCenter, SafeAreaView } from "../utils";

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = () => {
  useContext(LanguageContext);

  return (
    <SafeAreaView>
      <HorizontalCenter
        style={{
          paddingTop: 10,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 28,
          }}
        >
          {i18n.t("settings.settings")}
        </Text>
      </HorizontalCenter>
      <ThemeSelector />
      <LangaugeSelector />
      <Feedback />
    </SafeAreaView>
  );
};
