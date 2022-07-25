import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

import { Colors } from "../constants/Colors";

import { TabNavigatorRoutes } from "../navigation/AppNavigator";

type IconProps = {
  name: string;
  focused: boolean;
};

const getIconName = (routeName: string) => {
  if (routeName === TabNavigatorRoutes.HOME) {
    return "home-outline";
  }
  if (routeName === TabNavigatorRoutes.APPS) {
    return "phone-portrait-outline";
  }
  if (routeName === TabNavigatorRoutes.SETTINGS) {
    return "settings-outline";
  }

  return "";
};

export const TabBarIcon = ({ name, focused }: IconProps) => {
  return (
    <Icon
      size={20}
      name={getIconName(name)}
      color={focused ? Colors.gold : Colors.tabIconDefault}
    />
  );
};
