import React from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Progress from "react-native-progress";

import { StringValues } from "../constants/StringValues";

import { Colors } from "../constants/Colors";

export const Loader = () => (
  <View style={styles.loadingContainer}>
    <Text>{StringValues.loading}</Text>
    <Progress.Circle
      size={24}
      indeterminate
      color={Colors.gold}
      style={styles.loader}
    />
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    paddingVertical: 24,
    alignSelf: "center",
  },
});
