import Lottie from "lottie-react-native";
import React from "react";
import { Center } from "../utils";

interface LoadingIndicatorProps {}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({}) => {
  return (
    <Center style={{ flex: 1 }}>
      <Lottie source={require("../animations/loading.json")} autoPlay loop style={{ width: 150 }} />
    </Center>
  );
};
