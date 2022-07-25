import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { Screen, Loader } from "../components";

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { getLoginStatus, getUser } from "../store/selectors";

import { authActions } from "../store/actions/auth";

import { ScreenNames } from "../navigation/ScreenNames";
import { NavigatorStackParamList } from "../navigation/AppNavigator";

type RootScreenProp = StackNavigationProp<
  NavigatorStackParamList,
  typeof ScreenNames.ROOT
>;

export const RootScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<RootScreenProp>();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    if (user) {
      dispatch(authActions.fetchUserDetailsStart({ userId: user.uid }));
      setUser(user);
    }
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const isAuthenticating = useSelector(getLoginStatus);
  const loginUser = useSelector(getUser);

  useEffect(() => {
    const isLoggedIn = user || (!isAuthenticating && loginUser);
    if (isLoggedIn) {
      navigation.navigate(ScreenNames.TABS);
    } else {
      navigation.navigate(ScreenNames.LOGIN);
    }
  }, [user, isAuthenticating, loginUser]);

  return (
    <Screen>
      <Loader />
    </Screen>
  );
};
