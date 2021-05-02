import i18n from "i18n-js";
import React, { useContext } from "react";
import { Text } from "react-native-paper";
import { LangaugeSelector, ThemeSelector } from "../components";
import { Context } from "../context";
import { HorizontalCenter, SafeAreaView } from "../utils";

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = () => {
  useContext(Context);

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
    </SafeAreaView>
  );
};
