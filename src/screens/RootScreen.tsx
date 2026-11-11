import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { getAuth, onAuthStateChanged, User } from "@react-native-firebase/auth";

import { Screen, Loader } from "../components";

import { getLoginStatus, getUser } from "../store/selectors";

import { ScreenNames } from "../navigation/ScreenNames";
import { NavigatorStackParamList } from "../navigation/AppNavigator";

type RootScreenProp = StackNavigationProp<
  NavigatorStackParamList,
  typeof ScreenNames.ROOT
>;

export const RootScreen = () => {
  const navigation = useNavigation<RootScreenProp>();

  const [user, setUser] = useState<User | null>(getAuth().currentUser);

  const handleAuthStateChanged = (user: User | null) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
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
