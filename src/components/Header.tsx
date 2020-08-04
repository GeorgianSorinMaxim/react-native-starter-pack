import React, { Component, ComponentType } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";

import Colors from "../constants/Colors";
import { isBigScreen, normalizeText } from "../utils/dimensions";

const isIOS = Platform.OS === 'ios';

export type ButtonOptions = {
  onPress: () => void
  disabled?: boolean
  title?: string
  Icon?: ComponentType<any>
  loading?: boolean
}

export interface Props extends ViewProps {
  title?: string
  titleStyle?: StyleProp<ViewStyle>
  titleTextStyle?: StyleProp<TextStyle>
  leftButton?: ButtonOptions
  rightButton?: ButtonOptions
}

class Header extends Component<Props> {
  renderButton(button: ButtonOptions, position: string) {
    const { Icon, title, disabled, onPress, loading } = button;

    return (
      <TouchableOpacity style={styles.leftColumn} onPress={onPress} disabled={disabled}>
        {title ? (
          <Text
            style={[
              position === "left" ? styles.leftButtonTitle : styles.rightButtonTitle,
              { color: Colors.blue },
              disabled ? { color: Colors.grey } : null,
            ]}
          >
            {title}
          </Text>
        ) : null}
        {Icon ? (
          <View style={[position === "left" ? styles.leftIconContainer : styles.rightIconContainer]}>
            <Icon style={[styles.icon, { tintColor: Colors.black }]} />
          </View>
        ) : null}
        {loading ? <ActivityIndicator /> : null}
      </TouchableOpacity>
    )
  }

  render() {
    const {
      title,
      titleStyle,
      titleTextStyle,
      leftButton,
      rightButton,
      ...props
    } = this.props;

    return (
      <View {...props} style={[styles.header, { borderColor: Colors.lightGrey, backgroundColor: Colors.white }]}>
        {leftButton ? this.renderButton(leftButton, "left") : <View style={styles.leftColumn}></View>}

        {title ? (
          <View style={titleStyle || styles.title}>
            <Text style={titleTextStyle || [styles.titleText, { color: Colors.blue }]}>{title}</Text>
          </View>
        ) : (
          <View style={styles.title}></View>
        )}

        {rightButton ? this.renderButton(rightButton, "right") : <View style={styles.rightColumn}></View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    zIndex: 10,
    elevation: 0, // no shadow for Android
    height: normalizeText(isBigScreen ? 80 : 60),
    width: "100%",
    display: "flex",
    paddingBottom: isBigScreen && isIOS ? normalizeText(10) : 0,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    justifyContent: "center",
    paddingTop: isIOS ? (isBigScreen ? normalizeText(40) : normalizeText(10)) : 0,
  },
  leftColumn: {
    flex: 1,
    zIndex: 15,
    elevation: 14,
    maxWidth: 100,
    justifyContent: "center",
  },
  title: {
    flex: 1,
    width: 250,
    zIndex: 15,
    elevation: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: normalizeText(14),
  },
  rightColumn: {
    flex: 1,
    maxWidth: 100,
    justifyContent: "center",
  },
  leftButtonTitle: {
    fontSize: 16,
    textAlign: "left",
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  rightButtonTitle: {
    fontSize: 16,
    textAlign: "right",
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  icon: {
    width: 22,
    height: 22,
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  leftIconContainer: {
    marginLeft: 18,
    alignItems: "flex-start",
  },
  rightIconContainer: {
    marginRight: 18,
    alignItems: "flex-end",
  },
});

export default Header;
