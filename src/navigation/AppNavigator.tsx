import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { RootScreen } from "../screens/RootScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { RegistrationScreen } from "../screens/RegistrationScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { AppsScreen } from "../screens/AppsScreen";

import { TabBarIcon } from "../components/TabBarIcon";
import Colors from "../constants/Colors";
import { isSmallScreen } from "../utils/dimensions";

import { ScreenNames } from "./ScreenNames";

export type NavigatorStackParamList = {
  [ScreenNames.ROOT]: undefined | Object;
  [ScreenNames.TABS]: undefined | Object;
  [ScreenNames.HOME]: undefined | Object;
  [ScreenNames.SETTINGS]: undefined | Object;
  [ScreenNames.APPS]: undefined | Object;
  [ScreenNames.REGISTRATION]: undefined | Object;
  [ScreenNames.LOGIN]: undefined | Object;
};

const Tabs = createBottomTabNavigator();

const TabsNavigator = () => {
  return (
    <Tabs.Navigator
      initialRouteName={ScreenNames.HOME}
      screenOptions={{
        tabBarStyle: {
          height: isSmallScreen ? 80 : 100,
          paddingTop: 10,
          paddingBottom: isSmallScreen ? 20 : 40,
        },
        tabBarActiveTintColor: Colors.gold,
      }}>
      <Tabs.Screen
        name={ScreenNames.HOME}
        component={HomeScreen}
        options={{
          title: ScreenNames.HOME,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="home-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name={ScreenNames.APPS}
        component={AppsScreen}
        options={{
          title: ScreenNames.APPS,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="phone-portrait-outline" />
          ),
        }}
      />
      <Tabs.Screen
        name={ScreenNames.SETTINGS}
        component={SettingsScreen}
        options={{
          title: ScreenNames.SETTINGS,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="settings-outline" />
          ),
        }}
      />
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
