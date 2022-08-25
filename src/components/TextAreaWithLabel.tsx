import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import { BodyText } from "./BodyText";

import { colors } from "../theme";

interface Props {
  value: string;
  numberOfLines: number;
  label?: string;
  required?: boolean;
  maxLength?: number;
  style?: StyleProp<ViewStyle>;
}

export const TextAreaWithLabel = ({
  value,
  numberOfLines,
  label,
  required,
  maxLength,
  style,
}: Props) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onFocus = () => setIsFocused(true);

  const onBlur = () => setIsFocused(false);

  const isSmallLabel = isFocused || value === "";

  const labelStyle: TextStyle = {
    position: "absolute",
    left: 10,
    color: colors.grey,
    zIndex: 10,
    elevation: 9,
    top: isSmallLabel ? 4 : 14,
    fontSize: isSmallLabel ? 12 : 16,
  };

  return (
    <View style={style}>
      <BodyText style={labelStyle}>{label}</BodyText>

      {required && value === "" ? (
        <BodyText style={styles.requiredLabelStyle}>Required</BodyText>
      ) : null}

      {maxLength ? (
        <BodyText style={styles.maxLength}>
          {value.length}/{maxLength}
        </BodyText>
      ) : null}

      <TextInput
        multiline
        numberOfLines={numberOfLines}
        scrollEnabled={false}
        defaultValue={value}
        style={[
          styles.textareaInput,
          required && value === "" ? { borderBottomColor: colors.error } : null,
        ]}
        onFocus={onFocus}
        onBlur={onBlur}
        maxLength={maxLength}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textareaInput: {
    fontSize: 20,
    color: colors.black,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.black,
    paddingTop: 16,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 20,
    textAlignVertical: "top",
    marginBottom: 8,
  },
  requiredLabelStyle: {
    position: "absolute",
    right: 10,
    color: colors.error,
    top: 4,
    fontSize: 12,
    zIndex: 10,
    elevation: 9,
  },
  maxLength: {
    position: "absolute",
    right: 10,
    color: colors.grey,
    bottom: 4,
    fontSize: 12,
    zIndex: 10,
    elevation: 9,
  },
});
