import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationProp, NavigationRoute } from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import { HomeScreen } from "../screens/HomeScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { HOME, SETTINGS } from "./routes";

import Colors from "../constants/Colors";
import { isSmallScreen } from "../utils/dimensions";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = HOME;

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
      }}
    >
      <BottomTab.Screen
        name={HOME}
        component={HomeScreen}
        options={{
          title: HOME,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="home-outline" />,
        }}
      />
      <BottomTab.Screen
        name={SETTINGS}
        component={SettingsScreen}
        options={{
          title: SETTINGS,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="settings-outline" />,
        }}
      />
    </BottomTab.Navigator>
  );
};

const getHeaderTitle = (route: Route) => {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case HOME:
      return HOME;
    case SETTINGS:
      return SETTINGS;
  }
};

export default BottomTabNavigator;
