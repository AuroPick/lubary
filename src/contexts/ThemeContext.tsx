import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18n-js";
import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";

interface ThemeContextProps {
  children: React.ReactNode;
}

interface ThemeContextInterface {
  darkTheme: boolean;
  changeTheme: (darkTheme: boolean) => void;
  loadTheme: () => void;
}

const defaultValues: ThemeContextInterface = {
  darkTheme: false,
  changeTheme: () => null,
  loadTheme: () => null,
};

export const ThemeContext = createContext<ThemeContextInterface>(defaultValues);

export const ThemeContextProvider: React.FC<ThemeContextProps> = ({
  children,
}) => {
  const [darkTheme, setDarkTheme] = useState(false);

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
    <ThemeContext.Provider value={{ darkTheme, changeTheme, loadTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
