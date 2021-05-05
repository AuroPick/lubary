import { AntDesign, Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { locale } from "expo-localization";
import i18n from "i18n-js";
import React from "react";
import { en, tr } from "../locales";
import { Home, Lullabies, Settings } from "../screens";

interface BottomTabRoutes {}

type BottomTabRoutesParamList = {
  Home: undefined;
  Lullabies: undefined;
  Settings: undefined;
};

i18n.translations = {
  en,
  tr,
};

i18n.locale = locale;

i18n.fallbacks = true;

const Tab = createMaterialBottomTabNavigator<BottomTabRoutesParamList>();

export const BottomTabRoutes: React.FC<BottomTabRoutes> = ({}) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          if (route.name === "Home") {
            return <AntDesign name={"home"} color={color} size={20} />;
          } else if (route.name === "Lullabies") {
            return <Ionicons name={"musical-note"} color={color} size={20} />;
          } else if (route.name === "Settings") {
            return <AntDesign name={"setting"} color={color} size={20} />;
          }
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarLabel: i18n.t("home.home") }}
      />
      <Tab.Screen
        name="Lullabies"
        component={Lullabies}
        options={{ tabBarLabel: i18n.t("lullabies.lullabies") }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ tabBarLabel: i18n.t("settings.settings") }}
      />
    </Tab.Navigator>
  );
};
