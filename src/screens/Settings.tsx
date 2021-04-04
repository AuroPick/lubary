import React from "react";
import { Paragraph } from "react-native-paper";
import { Center } from "../utils/Center";

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = ({}) => {
  return (
    <Center>
      <Paragraph>Ayarlar</Paragraph>
    </Center>
  );
};
