import * as React from "react";
import { StyleSheet, View } from "react-native";

import Colors from "../constants/Colors";
import { Carousel } from "../components";

export const AppsScreen = () => {
  const images = ["", ""];

  return (
    <View style={styles.screenContainer}>
      <Carousel data={images} height={200} />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 32,
    backgroundColor: Colors.white,
  },
});
