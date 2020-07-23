import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TabBarIcon from "../components/TabBarIcon";
import { HomeScreen } from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import { RESTAURANTS, LINKS } from "./routes";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = RESTAURANTS;

// TODO: Add type for navigation and route
export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Restaurants"
        component={HomeScreen}
        options={{
          title: "Restaurants",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="map" />
          )
        }}
      />
      <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          title: "Links",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="link" />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}

// TODO: Add type for route
function getHeaderTitle(route: any) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case RESTAURANTS:
      return RESTAURANTS;
    case LINKS:
      return LINKS;
  }
}
