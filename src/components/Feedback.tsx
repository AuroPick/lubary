import { openURL } from "expo-linking";
import i18n from "i18n-js";
import Lottie from "lottie-react-native";
import React, { useContext, useEffect, useRef } from "react";
import { Animated } from "react-native";
import { Button } from "react-native-paper";
import { LanguageContext } from "../contexts";
import { Center, HorizontalCenter } from "../utils";

interface FeedbackProps {}

export const Feedback: React.FC<FeedbackProps> = ({}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const animation = useRef<Lottie>(null);

  useContext(LanguageContext);

  useEffect(() => {
    animation.current?.play();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        zIndex: -5,
      }}
    >
      <Center>
        <HorizontalCenter style={{ marginTop: 50 }}>
          <Lottie
            ref={animation}
            style={{ width: 200 }}
            source={require("../animations/feedback.json")}
            loop
          />
          <Button
            style={{ marginTop: 20 }}
            icon="star"
            mode="contained"
            onPress={() => openURL("https://github.com/AuroPick/lubary")}
          >
            {i18n.t("settings.feedback")}
          </Button>
        </HorizontalCenter>
      </Center>
    </Animated.View>
  );
};
