import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { BottomTabRoutesParamList } from "../params/BottomTabRoutesParamList";
import { Home, Ninni, Settings } from "../screens";
import { AntDesign, Ionicons } from "@expo/vector-icons";

interface BottomTabRoutes {}

const Tab = createMaterialBottomTabNavigator<BottomTabRoutesParamList>();

export const BottomTabRoutes: React.FC<BottomTabRoutes> = ({}) => {
  return (
    <Tab.Navigator
      initialRouteName="Ana Sayfa"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          if (route.name === "Ana Sayfa") {
            return <AntDesign name={"home"} color={color} size={20} />;
          } else if (route.name === "Ninniler") {
            return <Ionicons name={"musical-note"} color={color} size={20} />;
          } else if (route.name === "Ayarlar") {
            return <AntDesign name={"setting"} color={color} size={20} />;
          }
        },
      })}
    >
      <Tab.Screen name="Ana Sayfa" component={Home} />
      <Tab.Screen name="Ninniler" component={Ninni} />
      <Tab.Screen name="Ayarlar" component={Settings} />
    </Tab.Navigator>
  );
};
