import React from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";

import { Colors } from "../constants/Colors";

interface OwnProps {
  label: string;
}

type Props = ViewProps & OwnProps;

export const Title = ({ label }: Props) => (
  <View style={styles.container}>
    <Text style={styles.title}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.gold,
  },
});
