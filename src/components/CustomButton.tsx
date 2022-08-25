import React, { memo } from "react";
import {
  Linking,
  NativeSyntheticEvent,
  NativeTouchEvent,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { useLinkTo } from "@react-navigation/native";
import { logError } from "../api/logger";

export interface CustomButtonProps extends TouchableOpacityProps {
  accessibilityLabel: string;
  to?: string;
  url?: string;
  wrapWithTouchableOpacity?: boolean;
  children: React.ReactElement;
}

export const CustomButton = memo(
  ({
    wrapWithTouchableOpacity = true,
    children,
    url,
    to,
    onPress,
    ...rest
  }: CustomButtonProps) => {
    const linkTo = useLinkTo();

    const handleLinkPress = async (
      e: NativeSyntheticEvent<NativeTouchEvent>,
    ) => {
      if (onPress) {
        onPress(e);
      }

      if (to) {
        linkTo(to);
      }

      if (url) {
        try {
          if (await Linking.canOpenURL(url)) {
            await Linking.openURL(url);
          } else {
            throw new Error("Can't open URL " + url);
          }
        } catch (error) {
          logError("CustomButton - handleLinkPress", error);
        }
      }
    };

    if (!wrapWithTouchableOpacity) {
      return React.cloneElement(children, {
        accessible: true,
        accessibilityRole: typeof url !== "undefined" ? "link" : "button",
        onPress: handleLinkPress,
      });
    }

    return (
      <TouchableOpacity
        accessible
        accessibilityRole={typeof url !== "undefined" ? "link" : "button"}
        onPress={handleLinkPress}
        {...rest}>
        {children}
      </TouchableOpacity>
    );
  },
);
