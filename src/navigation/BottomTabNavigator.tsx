import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationProp, NavigationRoute } from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import { HomeScreen } from "../screens/HomeScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { AppsScreen } from "../screens/AppsScreen";
import { ScreenNames } from "./ScreenNames";

import Colors from "../constants/Colors";
import { isSmallScreen } from "../utils/dimensions";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = ScreenNames.HOME;

type BottomTabNavigatorProps = {
  navigation: NavigationProp<any>;
  route: NavigationRoute;
};

type Route = {
  state?: {
    index: number;
    routes: NavigationRoute<any>;
  };
};

const BottomTabNavigator = ({ navigation, route }: BottomTabNavigatorProps) => {
  // Set the header title on the stack navigator based on the currently active tab
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  // @ts-ignore
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        activeTintColor: Colors.gold,
        style: {
          height: isSmallScreen ? 80 : 100,
          paddingTop: 10,
          paddingBottom: isSmallScreen ? 20 : 40,
        },
      }}>
      <BottomTab.Screen
        name={ScreenNames.HOME}
        component={HomeScreen}
        options={{
          title: ScreenNames.HOME,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="home-outline" />
          ),
        }}
      />
      <BottomTab.Screen
        name={ScreenNames.APPS}
        component={AppsScreen}
        options={{
          title: ScreenNames.APPS,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="phone-portrait-outline" />
          ),
        }}
      />
      <BottomTab.Screen
        name={ScreenNames.SETTINGS}
        component={SettingsScreen}
        options={{
          title: ScreenNames.SETTINGS,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="settings-outline" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const getHeaderTitle = (route: Route) => {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    default:
    case ScreenNames.HOME:
      return ScreenNames.HOME;
    case ScreenNames.SETTINGS:
      return ScreenNames.SETTINGS;
  }
};

export default BottomTabNavigator;
