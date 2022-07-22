import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "../screens/LoginScreen";
import { RegistrationScreen } from "../screens/RegistrationScreen";

import { ScreenNames } from "./ScreenNames";

const Stack = createStackNavigator();

export const NotLoggedInNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ScreenNames.LOGIN}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ScreenNames.REGISTRATION}
        component={RegistrationScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
