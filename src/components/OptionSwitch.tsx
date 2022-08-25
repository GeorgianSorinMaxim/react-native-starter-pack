import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { BodyText } from "./BodyText";

import { colors } from "../theme";

interface Props {
  value: boolean | null;
  onValueChange: (value: boolean) => void;
  required?: boolean;
}

export const OptionSwitch = ({ value, onValueChange, required }: Props) => (
  <View
    style={[
      styles.container,
      required
        ? { borderBottomColor: colors.error, borderBottomWidth: 1 }
        : null,
    ]}>
    <TouchableOpacity onPress={() => onValueChange(true)}>
      <BodyText
        style={[styles.labelStyle, value === true ? styles.active : null]}>
        Yes
      </BodyText>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => onValueChange(false)}>
      <BodyText
        style={[styles.labelStyle, value === false ? styles.active : null]}>
        No
      </BodyText>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    maxWidth: 150,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    marginRight: 1,
    marginBottom: 8,
  },
  labelStyle: {
    flex: 1,
    padding: 12,
    paddingHorizontal: 24,
    fontSize: 16,
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.grey,
    backgroundColor: colors["grey-100"],
    borderRadius: 6,
  },
  active: {
    fontWeight: "600",
    borderWidth: 1,
    borderColor: colors["grey-100"],
    backgroundColor: colors.white,
    color: colors.black,
  },
});
