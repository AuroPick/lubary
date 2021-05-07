import { openURL } from "expo-linking";
import i18n from "i18n-js";
import Lottie from "lottie-react-native";
import React, { useContext, useEffect, useRef } from "react";
import { Button } from "react-native-paper";
import feedbackAnimation from "../animations/feedback.json";
import { LanguageContext } from "../contexts";
import { Center, HorizontalCenter } from "../utils";

interface FeedbackProps {}

export const Feedback: React.FC<FeedbackProps> = ({}) => {
  const animation = useRef<Lottie>(null);

  useContext(LanguageContext);

  useEffect(() => {
    animation.current?.play();
  }, []);

  return (
    <Center style={{ zIndex: -5 }}>
      <HorizontalCenter style={{ marginTop: 50 }}>
        <Lottie
          ref={animation}
          style={{ width: 200 }}
          source={feedbackAnimation}
          loop
        />
        <Button
          style={{ marginTop: 20 }}
          icon="star"
          mode="contained"
          onPress={() => openURL("https://github.com/AuroPick/ninni-app")}
        >
          {i18n.t("settings.feedback")}
        </Button>
      </HorizontalCenter>
    </Center>
  );
};
