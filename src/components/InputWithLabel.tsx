import React, { Component } from "react";
import { StyleProp, StyleSheet, Text, TextInput, TextStyle, View, ViewStyle } from "react-native";
import Colors from "../constants/Colors";

interface State {
  isFocused: boolean
}

interface Props {
  value: string
  label?: string
  hideLabelWhenFocused?: boolean
  required?: boolean
  maxLength?: number
  keyboardType?: string
  onChangeText?: (value: string) => void
  onFocus?: () => void
  defaultValue?: string
  style?: StyleProp<ViewStyle>
  error?: string | null
  placeholder?: string
  secureTextEntry?: boolean
}

export default class InputWithLabel extends Component<Props, State> {
  state = {
    isFocused: false,
  }

  onFocus = () => this.setState({ isFocused: true })

  onBlur = () => this.setState({ isFocused: false })

  render() {
    const { label, value, hideLabelWhenFocused, required, maxLength, style, error, placeholder, secureTextEntry, ...props } = this.props;
    const { isFocused } = this.state;

    const keyboardType = this.props.keyboardType ? this.props.keyboardType : "default";

    const isEmpty = !value || value.length === 0;

    const isSmallLabel = isFocused || !isEmpty;

    const labelStyle: TextStyle = {
      position: "absolute",
      left: 10,
      color: Colors.black,
      top: isSmallLabel ? 4 : 14,
      fontSize: isSmallLabel ? 12 : 16,
    };

    const showRequired = required && !value;

    return (
      <View style={style}>
        {hideLabelWhenFocused ? <Text style={styles.outsideLabel}>{label}</Text> : null}
        {!hideLabelWhenFocused ? <Text style={labelStyle}>{label}</Text> : null}

        {showRequired ? <Text style={styles.requiredLabelStyle}>Required</Text> : null}

        {error ? <Text style={styles.requiredLabelStyle}>{error}</Text> : null}

        {maxLength ? (
          <Text style={styles.maxLength}>
            {value.length}/{maxLength}
          </Text>
        ) : null}

        <TextInput
          {...props}
          defaultValue={value}
          style={[
            styles.textInput,
            isFocused ? styles.focused : null,
            hideLabelWhenFocused ? styles.textInputWithNoLabel : null,
            maxLength ? styles.textInputWithCounter : null,
            showRequired ? { borderBottomColor: Colors.required } : null,
          ]}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          // eslint-disable-line react/jsx-tag-spacing
          // @ts-ignore
          keyboardType={keyboardType}
          maxLength={maxLength}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          secureTextEntry={secureTextEntry}
          placeholder={placeholder && !label ? placeholder : ""}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 16,
    paddingTop: 18,
    paddingLeft: 10,
    paddingRight: 8,
    marginBottom: 16,
    paddingBottom: 6,
    color: Colors.black,
    borderColor: Colors.darkGrey,
    borderWidth: 1
  },
  focused: {
    borderColor: Colors.gold
  },
  textInputWithCounter: {
    paddingRight: 45
  },
  textInputWithNoLabel: {
    paddingTop: 12,
    paddingBottom: 12
  },
  requiredLabelStyle: {
    position: "absolute",
    top: 4,
    right: 10,
    fontSize: 12,
    color: Colors.required
  },
  maxLength: {
    position: "absolute",
    bottom: 4,
    right: 10,
    fontSize: 12,
    color: Colors.black
  },
  outsideLabel: {
    marginBottom: 6,
    color: Colors.darkGrey,
    fontSize: 10,
    textTransform: "uppercase"
  }
});
