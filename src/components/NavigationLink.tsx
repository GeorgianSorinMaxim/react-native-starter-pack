import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";

type Props = {
  text: string;
  onPress: () => void;
};

export const NavigationLink = ({ text, onPress }: Props) => (
  <TouchableOpacity style={styles.linkContainer} onPress={onPress}>
    <Text style={styles.linkText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  linkContainer: {
    paddingVertical: 12,
    alignSelf: "center",
  },
  linkText: {
    fontSize: 14,
    color: Colors.gold,
  },
});
