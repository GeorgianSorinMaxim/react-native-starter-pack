import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { RectButton } from "react-native-gesture-handler";

import Colors from "../constants/Colors";

type Props = {
  label: string;
  icon: string;
  onPress: () => void;
};

export const ButtonWithIcon = ({ label, icon, onPress }: Props) => {
  return (
    <RectButton style={styles.option} onPress={onPress}>
      <View style={styles.buttonContainer}>
        <View style={styles.iconContainer}>
          <Icon name={icon} size={18} color={Colors.gold} />
        </View>
        <Text style={styles.optionText}>{label}</Text>
      </View>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
  },
  iconContainer: {
    marginRight: 12,
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderColor: Colors.grey,
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: -1,
    marginBottom: 1,
  },
  optionText: {
    marginTop: 1,
    fontSize: 12,
    letterSpacing: 4,
    alignSelf: "flex-start",
    textTransform: "uppercase",
  },
});
