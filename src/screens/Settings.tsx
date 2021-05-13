import { useFocusEffect } from "@react-navigation/core";
import { AdMobBanner } from "expo-ads-admob";
import i18n from "i18n-js";
import React, { useCallback, useContext, useState } from "react";
import { Platform, View } from "react-native";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feedback, LanguageSelector, ThemeSelector } from "../components";
import { LanguageContext } from "../contexts";
import { HorizontalCenter } from "../utils";

interface SettingsProps {}

const bannerID = Platform.select({
  ios: "ca-app-pub-3940256099942544/2934735716",
  android: "ca-app-pub-3940256099942544/6300978111",
});

export const Settings: React.FC<SettingsProps> = () => {
  const [render, setRender] = useState(false);

  const insets = useSafeAreaInsets();

  useContext(LanguageContext);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        setRender(true);
      });
    }, [])
  );

  return (
    <View style={{ marginTop: insets.top }}>
      <HorizontalCenter
        style={{
          paddingTop: 10,
        }}
      >
        <AdMobBanner
          bannerSize="banner"
          adUnitID={bannerID}
          servePersonalizedAds
          onDidFailToReceiveAdWithError={(err) => console.log(err)}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 28,
            marginTop: 10,
          }}
        >
          {i18n.t("settings.settings")}
        </Text>
      </HorizontalCenter>
      <ThemeSelector />
      <LanguageSelector />
      {render && <Feedback />}
    </View>
  );
};
