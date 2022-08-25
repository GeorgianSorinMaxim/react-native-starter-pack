import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { BodyText } from "./BodyText";
import { Box } from "./Box";

import { colors } from "../theme";

type Props = {
  onPress: () => void;
  icon: string;
  title?: string;
};

export const RoundButtonWithIcon = ({ title, onPress, icon }: Props) => (
  <Box alignItems="center">
    <TouchableOpacity style={styles.roundButton} onPress={onPress}>
      <Icon name={icon} size={18} color={colors.white} />
    </TouchableOpacity>
    {title ? (
      <Box paddingTop="small">
        <BodyText size="large" color="black">
          {title}
        </BodyText>
      </Box>
    ) : null}
  </Box>
);

const styles = StyleSheet.create({
  roundButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "black",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
