import React from "react";
import {
  Platform,
  SafeAreaView as NativeSafeAreaView,
  StatusBar,
  StyleProp,
  ViewStyle
} from "react-native";

interface SafeAreaViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const SafeAreaView: React.FC<SafeAreaViewProps> = ({
  children,
  style,
}) => {
  return (
    <NativeSafeAreaView
      style={[
        {
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        },
        style,
      ]}
    >
      {children}
    </NativeSafeAreaView>
  );
};
