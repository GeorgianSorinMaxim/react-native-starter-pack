import React from "react";
import {
  CommonActions,
  StackActions,
  NavigationContainerRef,
  PartialState,
  NavigationState,
} from "@react-navigation/native";

import { NavigatorStackParamList } from "./AppNavigator";

export const navigationRef =
  React.createRef<NavigationContainerRef<NavigatorStackParamList>>();

export function push(name: string, params?: object) {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}

export function replace(name: string, params?: object) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

export function navigate(
  screen: keyof NavigatorStackParamList,
  params?: undefined | object,
) {
  navigationRef.current?.navigate(screen, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function setParams(params: object) {
  navigationRef.current?.dispatch(CommonActions.setParams({ ...params }));
}

export function reset(state: PartialState<NavigationState> | NavigationState) {
  navigationRef.current?.reset(state);
}

export function getCurrentRoute() {
  return navigationRef.current?.getCurrentRoute();
}
