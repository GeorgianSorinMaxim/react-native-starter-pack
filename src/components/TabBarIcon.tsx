import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

import Colors from "../constants/Colors";

type IconProps = {
  name: string;
  focused: boolean;
};

export const TabBarIcon = ({ name, focused }: IconProps) => {
  return (
    <Icon
      size={20}
      name={name}
      color={focused ? Colors.gold : Colors.tabIconDefault}
    />
  );
};
