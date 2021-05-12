import { Ionicons } from "@expo/vector-icons";
import i18n from "i18n-js";
import React, { useContext, useEffect, useState } from "react";
import { Platform, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Flag from "react-native-flags-typescript";
import { Text, useTheme } from "react-native-paper";
import { LanguageContext, ThemeContext } from "../contexts";
import { VerticalCenter } from "../utils";

interface LanguageSelectorProps {}

export const LanguageSelector: React.FC<LanguageSelectorProps> = () => {
  const [zIndex, setZIndex] = useState(5000);

  const { language, changeLanguage } = useContext(LanguageContext);
  const { darkTheme } = useContext(ThemeContext);

  const { colors } = useTheme();

  useEffect(() => {
    setTimeout(() => {
      setZIndex(6000);
    }, 1);
  }, []);

  return (
    <View
      style={{
        marginHorizontal: 20,
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <VerticalCenter style={{ flexDirection: "row" }}>
        <Ionicons
          name="language-outline"
          size={24}
          color={darkTheme ? "white" : "black"}
          style={{ marginRight: 10 }}
        />
        <Text style={{ fontSize: 16 }}>{i18n.t("settings.language")}</Text>
      </VerticalCenter>
      <DropDownPicker
        items={[
          {
            label: i18n.t("settings.english"),
            value: "en",
            icon: () => <Flag code="US" size={16} type="flat" />,
          },
          {
            label: i18n.t("settings.turkish"),
            value: "tr",
            icon: () => <Flag code="TR" size={16} type="flat" />,
          },
        ]}
        defaultValue={language}
        onChangeItem={(language: { value: string; label: string }) =>
          changeLanguage({ value: language.value, label: language.label })
        }
        containerStyle={{ height: 40, width: 120 }}
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.surface,
        }}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        dropDownStyle={{
          backgroundColor: colors.surface,
          borderColor: colors.surface,
        }}
        labelStyle={{
          color: colors.text,
        }}
        arrowColor={colors.text}
        zIndex={Platform.OS === "android" ? zIndex : undefined}
      />
    </View>
  );
};
