import * as React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Colors';

type IconProps = {
  name: string,
  focused: boolean
};

export default function TabBarIcon(props: IconProps) {
  return (
    <Icon
      size={20}
      name={props.name}
      color={props.focused ? Colors.gold : Colors.tabIconDefault}
    />
  );
}
