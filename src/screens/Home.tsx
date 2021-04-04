import React from "react";
import { StyleSheet } from "react-native";
import { Paragraph } from "react-native-paper";
import { Center } from "../utils/Center";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  return (
    <Center>
      <Paragraph>Ana Sayfa</Paragraph>
    </Center>
  );
};
