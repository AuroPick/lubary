import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import merge from "deepmerge";
import { AdMobInterstitial, isAvailableAsync } from "expo-ads-admob";
import * as Font from "expo-font";
import { getNetworkStateAsync } from "expo-network";
import * as SplashScreen from "expo-splash-screen";
import { setStatusBarStyle, StatusBar } from "expo-status-bar";
import i18n from "i18n-js";
import React, { useContext, useEffect } from "react";
import { Alert, Platform } from "react-native";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { LanguageContext, ThemeContext } from "./contexts";
import { BottomTabRoutes } from "./routes";

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

const interstitialID =
  Platform.select({
    ios: "ca-app-pub-3940256099942544/4411468910",
    android: "ca-app-pub-3940256099942544/1033173712",
  }) || "";

AdMobInterstitial.addEventListener("interstitialDidLoad", () => {
  setTimeout(async () => {
    try {
      await AdMobInterstitial.showAdAsync();
    } catch (error) {
      console.log(`failed to show interstitial ad ${error}`);
    }
  }, 300);
});

AdMobInterstitial.addEventListener("interstitialDidFailToLoad", () => {
  console.log("failed to load interstitial ad");
});

export function App() {
  const { darkTheme, loadTheme } = useContext(ThemeContext);
  const { loadLanguage } = useContext(LanguageContext);

  AdMobInterstitial.addEventListener("interstitialDidOpen", () => {
    setStatusBarStyle("light");
  });

  AdMobInterstitial.addEventListener("interstitialDidClose", () => {
    darkTheme ? setStatusBarStyle("light") : setStatusBarStyle("dark");
  });

  useEffect(() => {
    const preLoad = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();

        loadLanguage();
        loadTheme();

        await Font.loadAsync({
          ...MaterialCommunityIcons.font,
          ...Ionicons.font,
        });

        try {
          const { isInternetReachable } = await getNetworkStateAsync();

          if (isInternetReachable) {
            await AdMobInterstitial.setAdUnitID(interstitialID);
            await AdMobInterstitial.requestAdAsync({
              servePersonalizedAds: true,
            });
          }
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        Alert.alert(
          i18n.t("settings.notLoaded"),
          i18n.t("settings.notLoadedSettings"),
          [
            { text: i18n.t("settings.cancel"), onPress: () => {} },
            { text: i18n.t("settings.ok"), onPress: () => {} },
          ]
        );

        console.log(error);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    (async () => {
      await preLoad();
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider
        theme={darkTheme ? CombinedDarkTheme : CombinedDefaultTheme}
      >
        <NavigationContainer
          theme={darkTheme ? CombinedDarkTheme : CombinedDefaultTheme}
        >
          <BottomTabRoutes />
          {darkTheme ? <StatusBar style="light" /> : <StatusBar style="dark" />}
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
