import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
  KeyboardTypeOptions,
} from "react-native";
import { colors } from "../theme";

import { BodyText } from "./BodyText";

interface Props {
  value: string;
  label?: string;
  hideLabelWhenFocused?: boolean;
  required?: boolean;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions;
  onChangeText?: (value: string) => void;
  onFocus?: () => void;
  defaultValue?: string;
  style?: StyleProp<ViewStyle>;
  error?: string | null;
  placeholder?: string;
  secureTextEntry?: boolean;
}

export const InputWithLabel = (props: Props) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onFocus = () => setIsFocused(true);

  const onBlur = () => setIsFocused(false);

  const {
    label,
    value,
    hideLabelWhenFocused,
    required,
    maxLength,
    style,
    error,
    placeholder,
    secureTextEntry,
  } = props;

  const keyboardType = props.keyboardType ? props.keyboardType : "default";

  const isEmpty = !value || value.length === 0;

  const isSmallLabel = isFocused || !isEmpty;

  const labelStyle: TextStyle = {
    position: "absolute",
    left: 10,
    color: colors.white,
    top: isSmallLabel ? 4 : 14,
    fontSize: isSmallLabel ? 12 : 16,
  };

  const showRequired = required && !value;

  return (
    <View style={style}>
      {hideLabelWhenFocused ? (
        <BodyText style={styles.outsideLabel}>{label}</BodyText>
      ) : null}
      {!hideLabelWhenFocused ? (
        <BodyText style={labelStyle}>{label}</BodyText>
      ) : null}

      {showRequired ? (
        <BodyText style={styles.requiredLabelStyle}>Required</BodyText>
      ) : null}

      {error ? (
        <BodyText style={styles.requiredLabelStyle}>{error}</BodyText>
      ) : null}

      {maxLength ? (
        <BodyText style={styles.maxLength}>
          {value.length}/{maxLength}
        </BodyText>
      ) : null}

      <TextInput
        {...props}
        defaultValue={value}
        style={[
          styles.textInput,
          isFocused ? styles.focused : null,
          hideLabelWhenFocused ? styles.textInputWithNoLabel : null,
          maxLength ? styles.textInputWithCounter : null,
          showRequired ? { borderBottomColor: colors.error } : null,
        ]}
        onFocus={onFocus}
        onBlur={onBlur}
        keyboardType={keyboardType}
        maxLength={maxLength}
        autoCapitalize="none"
        underlineColorAndroid="transparent"
        secureTextEntry={secureTextEntry}
        placeholder={placeholder && !label ? placeholder : ""}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 16,
    paddingTop: 18,
    paddingLeft: 10,
    paddingRight: 8,
    marginBottom: 16,
    paddingBottom: 6,
    color: colors.primary,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  focused: {
    borderColor: colors.purple,
  },
  textInputWithCounter: {
    paddingRight: 45,
  },
  textInputWithNoLabel: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  requiredLabelStyle: {
    position: "absolute",
    top: 4,
    right: 10,
    fontSize: 12,
    color: colors.error,
  },
  maxLength: {
    position: "absolute",
    bottom: 4,
    right: 10,
    fontSize: 12,
    color: colors.primary,
  },
  outsideLabel: {
    marginBottom: 6,
    color: colors.primary,
    fontSize: 12,
    textTransform: "uppercase",
  },
});
