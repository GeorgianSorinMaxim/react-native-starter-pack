import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootScreen } from "../screens/RootScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { RegistrationScreen } from "../screens/RegistrationScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { NewsScreen } from "../screens/NewsScreen";
import { SettingsScreen } from "../screens/SettingsScreen";

import { BodyText, TabBarIcon } from "../components";
import { colors } from "../theme";

import { ScreenNames } from "./ScreenNames";

const styles = StyleSheet.create({
  title: {
    color: colors.tabIconFocused,
  },
  unfocusedTitle: {
    color: colors.tabIconUnfocused,
  },
});

export type NavigatorStackParamList = {
  [ScreenNames.ROOT]: undefined | object;
  [ScreenNames.TABS]: undefined | object;
  [ScreenNames.HOME]: undefined | object;
  [ScreenNames.NEWS]: undefined | object;
  [ScreenNames.SETTINGS]: undefined | object;
  [ScreenNames.REGISTRATION]: undefined | object;
  [ScreenNames.LOGIN]: undefined | object;
};

export const TabNavigatorRoutes = {
  HOME: ScreenNames.HOME,
  NEWS: ScreenNames.NEWS,
  SETTINGS: ScreenNames.SETTINGS,
} as const;

export type TabParamList = Record<string, object | undefined>;

type TabBarIconProps = {
  focused: boolean;
};

type ScreenOptionProps = {
  route: RouteProp<TabParamList, string>;
  navigation: unknown;
};

const renderScreenOptions = ({
  route,
}: ScreenOptionProps): BottomTabNavigationOptions => ({
  tabBarIcon: ({ focused }: TabBarIconProps): ReactNode => {
    return <TabBarIcon focused={focused} name={route.name} />;
  },
  tabBarLabel: ({ focused }: { focused: boolean }) => (
    <BodyText style={[styles.title, !focused ? styles.unfocusedTitle : null]}>
      {route.name}
    </BodyText>
  ),
  tabBarStyle: {
    height: 100,
    paddingTop: 10,
    paddingBottom: 40,
  },
  tabBarActiveTintColor: colors.tabIconFocused,
});

const Tabs = createBottomTabNavigator();

const TabsNavigator = () => {
  return (
    <Tabs.Navigator
      initialRouteName={ScreenNames.HOME}
      screenOptions={renderScreenOptions}>
      <Tabs.Screen
        name={ScreenNames.HOME}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tabs.Screen name={ScreenNames.NEWS} component={NewsScreen} />
      <Tabs.Screen name={ScreenNames.SETTINGS} component={SettingsScreen} />
    </Tabs.Navigator>
  );
};

const MainStack = createStackNavigator();

export const RootStack = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name={ScreenNames.ROOT}
      component={RootScreen}
      options={{
        gestureEnabled: false,
        headerShown: false,
      }}
    />
    <MainStack.Screen
      name={ScreenNames.LOGIN}
      component={LoginScreen}
      options={{
        gestureEnabled: false,
        headerShown: false,
      }}
    />
    <MainStack.Screen
      name={ScreenNames.REGISTRATION}
      component={RegistrationScreen}
      options={{
        gestureEnabled: false,
        headerShown: false,
      }}
    />
    <MainStack.Screen
      name={ScreenNames.TABS}
      component={TabsNavigator}
      options={{
        gestureEnabled: false,
        headerShown: false,
      }}
    />
  </MainStack.Navigator>
);
