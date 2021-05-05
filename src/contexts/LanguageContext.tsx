import AsyncStorage from "@react-native-async-storage/async-storage";
import { locale } from "expo-localization";
import i18n from "i18n-js";
import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { en, tr } from "../locales";

interface LanguageContextProps {
  children: React.ReactNode;
}

interface LanguageContextInterface {
  language: string;
  changeLanguage: ({ value, label }: { value: string; label: string }) => void;
  loadLanguage: () => void;
}

i18n.translations = {
  en,
  tr,
};

i18n.locale = locale;

i18n.fallbacks = true;

const defaultValues: LanguageContextInterface = {
  language: i18n.locale,
  changeLanguage: () => null,
  loadLanguage: () => null,
};

export const LanguageContext = createContext<LanguageContextInterface>(
  defaultValues
);

export const LanguageContextProvider: React.FC<LanguageContextProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState(
    i18n.locale.startsWith("en")
      ? "en"
      : i18n.locale.startsWith("tr")
      ? "tr"
      : "Select Language"
  );

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
  return (
    <LanguageContext.Provider
      value={{ language, changeLanguage, loadLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
