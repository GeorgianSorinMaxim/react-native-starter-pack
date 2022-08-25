import React from "react";
import { StyleSheet, View } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../theme";

interface Props {
  size?: number;
}

export const ImagePlaceholder = (props: Props) => {
  return (
    <View style={styles.container}>
      <Icon size={props.size || 35} name="image-outline" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["grey-50"],
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    padding: 0,
    margin: 0,
    alignSelf: "center",
    color: colors.grey,
  },
});
