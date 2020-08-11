import React, { Component } from "react";
import { StyleProp, StyleSheet, Text, TextInput, TextStyle, View, ViewStyle } from "react-native";

import Colors from "../constants/Colors";

interface State {
  isFocused: boolean;
}

interface Props {
  value: string;
  numberOfLines: number;
  label?: string;
  required?: boolean;
  maxLength?: number;
  onChangeText: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

export default class TextAreaWithLabel extends Component<Props, State> {
  state = {
    isFocused: false,
  };

  onFocus = () => this.setState({ isFocused: true });

  onBlur = () => this.setState({ isFocused: false });

  render() {
    const { label, value, required, maxLength, numberOfLines, style, ...props } = this.props;
    const { isFocused } = this.state;

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

        {required && value === "" ? <Text style={styles.requiredLabelStyle}>Required</Text> : null}

        {maxLength ? (
          <Text style={styles.maxLength}>
            {value.length}/{maxLength}
          </Text>
        ) : null}

        <TextInput
          {...props}
          multiline
          numberOfLines={numberOfLines}
          scrollEnabled={false}
          defaultValue={value}
          style={[styles.textareaInput, required && value === "" ? { borderBottomColor: Colors.required } : null]}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          maxLength={maxLength}
          autoCapitalize="none"
        />
      </View>
    );
  }
}

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
