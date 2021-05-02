import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface HorizontalCenterProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const HorizontalCenter: React.FC<HorizontalCenterProps> = ({
  children,
  style,
}) => {
  const styleObj = StyleSheet.flatten(style);
  return (
    <View
      style={[
        styleObj?.flexDirection === "row"
          ? { justifyContent: "center" }
          : { alignItems: "center" },
        style,
      ]}
    >
      {children}
    </View>
  );
};
