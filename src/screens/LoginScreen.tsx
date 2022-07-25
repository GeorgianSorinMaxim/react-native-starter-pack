import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Alert, View, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";

import {
  Button,
  InputWithLabel,
  NavigationLink,
  Screen,
  Title,
} from "../components";
import Colors from "../constants/Colors";

import { authActions } from "../store/actions/auth";
import { getLoginStatus, getLoginError } from "../store/selectors";

import { ScreenNames } from "../navigation/ScreenNames";
import { NavigatorStackParamList } from "../navigation/AppNavigator";

import { StringValues } from "../constants/StringValues";

type LoginScreenProp = StackNavigationProp<
  NavigatorStackParamList,
  typeof ScreenNames.LOGIN
>;

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<LoginScreenProp>();

  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const isSubmitting: boolean = useSelector(getLoginStatus);
  const error: boolean | null = useSelector(getLoginError);

  useEffect(() => {
    if (isSubmitting === false && !error) {
      setPassword("");
      setEmail("");
    }
  }, [isSubmitting, error]);

  const onRegistrationLinkPress = () => {
    navigation.navigate(ScreenNames.REGISTRATION);
  };

  const onEmailChange = (value: string) => {
    setEmail(value);
  };

  const onPasswordChange = (value: string) => {
    setPassword(value);
  };

  const onLoginPress = () => {
    if (email === "" || password === "") {
      Alert.alert(StringValues.inputEmailAndPassword);
      return;
    }

    dispatch(authActions.loginStart({ email, password }));
  };

  return (
    <Screen>
      <View style={styles.titleContainer}>
        <Title label={StringValues.login} />
      </View>

      <InputWithLabel
        hideLabelWhenFocused={true}
        value={email}
        onChangeText={onEmailChange}
        label={StringValues.email}
      />
      <InputWithLabel
        hideLabelWhenFocused={true}
        value={password}
        onChangeText={onPasswordChange}
        label={StringValues.password}
        secureTextEntry
      />

      <Button
        disabled={isSubmitting}
        title={StringValues.login.toUpperCase()}
        onPress={onLoginPress}
      />

      <NavigationLink
        text={StringValues.createAccount}
        onPress={onRegistrationLinkPress}
      />

      {isSubmitting ? (
        <Progress.Circle
          size={24}
          indeterminate={true}
          color={Colors.gold}
          style={styles.loader}
        />
      ) : null}
    </Screen>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingTop: 100,
    paddingBottom: 12,
  },
  loader: {
    paddingVertical: 24,
    alignSelf: "center",
  },
});
