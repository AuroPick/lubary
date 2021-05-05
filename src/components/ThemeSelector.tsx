import { MaterialCommunityIcons } from "@expo/vector-icons";
import i18n from "i18n-js";
import React, { useContext } from "react";
import { View } from "react-native";
import { Switch, Text, useTheme } from "react-native-paper";
import { ThemeContext } from "../contexts";
import { VerticalCenter } from "../utils";

interface ThemeSelectorProps {}

export const ThemeSelector: React.FC<ThemeSelectorProps> = () => {
  const { darkTheme, changeTheme } = useContext(ThemeContext);
  const { colors } = useTheme();

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
        <MaterialCommunityIcons
          name="theme-light-dark"
          size={24}
          color={darkTheme ? "white" : "black"}
          style={{ marginRight: 10 }}
        />
        <Text style={{ fontSize: 16 }}>{i18n.t("settings.darkTheme")}</Text>
      </VerticalCenter>
      <Switch
        value={darkTheme}
        onValueChange={(value) => changeTheme(value)}
        color={darkTheme ? "#333333" : colors.surface}
      />
    </View>
  );
};
