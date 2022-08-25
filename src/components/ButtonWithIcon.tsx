import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { Box } from "./Box";
import { BodyText } from "./BodyText";
import { Separator } from "./Separator";

import { colors } from "../theme";

type Props = {
  label: string;
  icon: string;
  onPress: () => void;
};

export const ButtonWithIcon = ({ label, icon, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Separator />
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-start"
        paddingTop="medium"
        paddingBottom="medium"
        paddingLeft="medium"
        paddingRight="medium">
        <Box marginRight="small">
          <Icon name={icon} size={18} color={colors.purple} />
        </Box>
        <BodyText style={styles.text}>{label}</BodyText>
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    letterSpacing: 2,
    textTransform: "uppercase",
  },
});
