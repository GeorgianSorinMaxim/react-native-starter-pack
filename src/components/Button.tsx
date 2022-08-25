import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { BodyText } from "./BodyText";

import { colors } from "../theme";

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export const Button = ({ title, onPress, disabled }: Props) => {
  return !disabled ? (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <BodyText color="white" fontWeight="bold" spacingSize="large" capitalized>
        {title}
      </BodyText>
    </TouchableOpacity>
  ) : (
    <View style={styles.disabledButtonContainer}>
      <BodyText color="white" fontWeight="bold" spacingSize="large" capitalized>
        {title}
      </BodyText>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 15,
    alignItems: "center",
    borderBottomWidth: 0,
    paddingHorizontal: 15,
    backgroundColor: colors.purple,
  },
  disabledButtonContainer: {
    paddingVertical: 15,
    alignItems: "center",
    borderBottomWidth: 0,
    paddingHorizontal: 15,
    backgroundColor: colors.grey,
  },
});
