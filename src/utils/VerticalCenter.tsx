import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface VerticalCenterProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const VerticalCenter: React.FC<VerticalCenterProps> = ({
  children,
  style,
}) => {
  const styleObj = StyleSheet.flatten(style);
  return (
    <View
      style={[
        styleObj?.flexDirection === "row"
          ? { alignItems: "center" }
          : { justifyContent: "center" },
        style,
      ]}
    >
      {children}
    </View>
  );
};
