import React from "react";
import { StyleSheet, View } from "react-native";
import * as Progress from "react-native-progress";

import { BodyText } from "./BodyText";

import { StringValues } from "../constants/StringValues";

import { colors } from "../theme";

export const Loader = () => (
  <View style={styles.loadingContainer}>
    <BodyText>{StringValues.loading}</BodyText>
    <Progress.Circle
      size={24}
      indeterminate
      color={colors.purple}
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
