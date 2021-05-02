import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface CenterProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Center: React.FC<CenterProps> = ({ children, style }) => {
  return (
    <View style={[{ alignItems: "center", justifyContent: "center" }, style]}>
      {children}
    </View>
  );
};
