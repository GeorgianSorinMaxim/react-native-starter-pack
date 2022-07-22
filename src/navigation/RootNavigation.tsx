import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { MainNavigator } from "./MainNavigator";
import { NotLoggedInNavigator } from "./NotLoggedInNavigator";
import { getLoginStatus, getUser } from "../store/selectors";

import { authActions } from "../store/actions/auth";

export const RootNavigation = () => {
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    if (user) {
      dispatch(authActions.loginSuccess({ user: user }));
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

  const isLoggedIn = user || (!isAuthenticating && loginUser);

  return isLoggedIn ? <MainNavigator /> : <NotLoggedInNavigator />;
};

export const navigationRef: React.RefObject<any> = React.createRef();

export function navigate(name: string, params: any) {
  navigationRef.current?.navigate(name, params);
}
