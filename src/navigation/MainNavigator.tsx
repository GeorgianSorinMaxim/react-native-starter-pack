import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigator from "./BottomTabNavigator";

import Colors from "../constants/Colors";

const Stack = createStackNavigator();

const headerOptions = {
  headerStyle: {
    backgroundColor: Colors.gold,
  },
  headerTintColor: Colors.white,
  headerTitleStyle: {
    fontSize: 14,
    letterSpacing: 4,
    textTransform: "uppercase",
  },
};

export const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={BottomTabNavigator} options={headerOptions} />
    </Stack.Navigator>
  );
};
