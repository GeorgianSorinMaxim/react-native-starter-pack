import * as React from 'react';
import { Text, TextProps, StyleProp, TextStyle } from 'react-native';

interface Props<T> {
  children: T
  style?: StyleProp<TextStyle>
}


export default function BodyText<T>(props: Props<T> & TextProps) {
  return <Text {...props} style={[ props.style ]} />
}
