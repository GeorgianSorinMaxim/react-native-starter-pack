import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import Colors from "../constants/Colors";

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
    color: Colors.grey,
    zIndex: 10,
    elevation: 9,
    top: isSmallLabel ? 4 : 14,
    fontSize: isSmallLabel ? 12 : 16,
  };

  return (
    <View style={style}>
      <Text style={labelStyle}>{label}</Text>

      {required && value === "" ? (
        <Text style={styles.requiredLabelStyle}>Required</Text>
      ) : null}

      {maxLength ? (
        <Text style={styles.maxLength}>
          {value.length}/{maxLength}
        </Text>
      ) : null}

      <TextInput
        multiline
        numberOfLines={numberOfLines}
        scrollEnabled={false}
        defaultValue={value}
        style={[
          styles.textareaInput,
          required && value === ""
            ? { borderBottomColor: Colors.required }
            : null,
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
    color: Colors.black,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.black,
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
    color: Colors.required,
    top: 4,
    fontSize: 12,
    zIndex: 10,
    elevation: 9,
  },
  maxLength: {
    position: "absolute",
    right: 10,
    color: Colors.grey,
    bottom: 4,
    fontSize: 12,
    zIndex: 10,
    elevation: 9,
  },
});
