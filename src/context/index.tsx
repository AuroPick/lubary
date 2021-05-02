import AsyncStorage from "@react-native-async-storage/async-storage";
import { locale } from "expo-localization";
import i18n from "i18n-js";
import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { en, tr } from "../locales";

interface ContextProviderProps {
  children: React.ReactNode;
}

interface ContextInterface {
  language: string;
  darkTheme: boolean;
  changeLanguage: ({ value, label }: { value: string; label: string }) => void;
  loadLanguage: () => void;
  changeTheme: (darkTheme: boolean) => void;
  loadTheme: () => void;
}

i18n.translations = {
  en,
  tr,
};

i18n.locale = locale;

i18n.fallbacks = true;

const defaultValues: ContextInterface = {
  language: i18n.locale,
  darkTheme: false,
  changeLanguage: () => null,
  loadLanguage: () => null,
  changeTheme: () => null,
  loadTheme: () => null,
};

export const Context = createContext<ContextInterface>(defaultValues);

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState(
    i18n.locale.startsWith("en")
      ? "en"
      : i18n.locale.startsWith("tr")
      ? "tr"
      : "Select Language"
  );
  const [darkTheme, setDarkTheme] = useState(false);

  const changeLanguage = async ({
    value,
    label,
  }: {
    value: string;
    label: string;
  }) => {
    try {
      await AsyncStorage.setItem("language", value);
      i18n.locale = value;
      setLanguage(value);
      Toast.show({
        type: "success",
        text1: i18n.t("settings.saved"),
        text2: i18n.t("settings.savedLanguageMessage", {
          language:
            label === "English" || label === "İngilizce"
              ? i18n.t("settings.english")
              : i18n.t("settings.turkish"),
        }),
      });
    } catch {
      Alert.alert(
        i18n.t("settings.notSaved"),
        i18n.t("settings.notSavedLanguageMessage"),
        [
          { text: i18n.t("settings.cancel"), onPress: () => {} },
          { text: i18n.t("settings.ok"), onPress: () => {} },
        ]
      );
    }
  };

  const loadLanguage = async () => {
    try {
      const language = await AsyncStorage.getItem("language");

      if (language !== null) {
        i18n.locale = language;
        setLanguage(language);
      }
    } catch {
      Alert.alert(
        i18n.t("settings.notLoaded"),
        i18n.t("settings.notLoadedLanguageMessage"),
        [
          { text: i18n.t("settings.cancel"), onPress: () => {} },
          { text: i18n.t("settings.ok"), onPress: () => {} },
        ]
      );
    }
  };

  const changeTheme = async (theme: boolean) => {
    try {
      await AsyncStorage.setItem("theme", `${theme}`);
      setDarkTheme((prevState) => !prevState);
      Toast.show({
        type: "success",
        text1: i18n.t("settings.saved"),
        text2: i18n.t("settings.savedThemeMessage", {
          theme: theme ? i18n.t("settings.dark") : i18n.t("settings.light"),
        }),
      });
    } catch {
      Alert.alert(
        i18n.t("settings.notSaved"),
        i18n.t("settings.notSavedThemeMessage"),
        [
          { text: i18n.t("settings.cancel"), onPress: () => {} },
          { text: i18n.t("settings.ok"), onPress: () => {} },
        ]
      );
    }
  };

  const loadTheme = async () => {
    try {
      const theme = await AsyncStorage.getItem("theme");

      theme && setDarkTheme(theme === "true");
    } catch {
      Alert.alert(
        i18n.t("settings.notLoaded"),
        i18n.t("settings.notLoadedThemeMessage"),
        [
          { text: i18n.t("settings.cancel"), onPress: () => {} },
          { text: i18n.t("settings.ok"), onPress: () => {} },
        ]
      );
    }
  };

  return (
    <Context.Provider
      value={{
        language,
        darkTheme,
        changeLanguage,
        loadLanguage,
        changeTheme,
        loadTheme,
      }}
    >
      {children}
    </Context.Provider>
  );
};
