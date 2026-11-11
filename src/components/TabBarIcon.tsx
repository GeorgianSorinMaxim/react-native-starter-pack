import type { ComponentProps } from "react";
import Icon from "@expo/vector-icons/Ionicons";

import { colors } from "../theme";

import { TabNavigatorRoutes } from "../navigation/AppNavigator";

type IconProps = {
  name: string;
  focused: boolean;
};

const getIconName = (
  routeName: string,
): ComponentProps<typeof Icon>["name"] => {
  if (routeName === TabNavigatorRoutes.HOME) {
    return "home-outline";
  }
  if (routeName === TabNavigatorRoutes.NEWS) {
    return "newspaper-outline";
  }
  if (routeName === TabNavigatorRoutes.SETTINGS) {
    return "settings-outline";
  }

  return "help-outline";
};

export const TabBarIcon = ({ name, focused }: IconProps) => {
  return (
    <Icon
      size={20}
      name={getIconName(name)}
      color={focused ? colors.tabIconFocused : colors.tabIconUnfocused}
    />
  );
};
