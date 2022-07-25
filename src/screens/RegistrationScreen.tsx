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
import { Colors } from "../constants/Colors";

import { authActions } from "../store/actions/auth";
import {
  getRegistrationStatus,
  getRegistrationError,
} from "../store/selectors";

import { ScreenNames } from "../navigation/ScreenNames";
import { NavigatorStackParamList } from "../navigation/AppNavigator";

import { StringValues } from "../constants/StringValues";

type RegistrationScreenProp = StackNavigationProp<
  NavigatorStackParamList,
  typeof ScreenNames.REGISTRATION
>;

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

export const RegistrationScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<RegistrationScreenProp>();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const isRegistering: boolean = useSelector(getRegistrationStatus);
  const error: boolean | null = useSelector(getRegistrationError);

  useEffect(() => {
    if (isRegistering === false && !error) {
      setPassword("");
      setConfirmPassword("");
      setFirstName("");
      setLastName("");
      setEmail("");
    }
  }, [isRegistering, error]);

  const onLoginLinkPress = () => {
    navigation.navigate(ScreenNames.LOGIN);
  };

  const onRegisterPress = () => {
    if (
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      firstName === "" ||
      lastName === ""
    ) {
      Alert.alert(StringValues.inputDetails);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(StringValues.passwordsNoMatch);
      return;
    }

    dispatch(authActions.signupStart({ firstName, lastName, email, password }));
  };

  return (
    <Screen>
      <View style={styles.titleContainer}>
        <Title label={StringValues.newAccount} />
      </View>

      <InputWithLabel
        hideLabelWhenFocused
        value={firstName}
        onChangeText={value => setFirstName(value)}
        label={StringValues.firstName}
      />
      <InputWithLabel
        hideLabelWhenFocused
        value={lastName}
        onChangeText={value => setLastName(value)}
        label={StringValues.lastName}
      />
      <InputWithLabel
        hideLabelWhenFocused
        value={email}
        onChangeText={value => setEmail(value)}
        label={StringValues.email}
      />
      <InputWithLabel
        hideLabelWhenFocused
        value={password}
        onChangeText={value => setPassword(value)}
        label={StringValues.password}
        secureTextEntry
      />
      <InputWithLabel
        hideLabelWhenFocused
        value={confirmPassword}
        onChangeText={value => setConfirmPassword(value)}
        label={StringValues.confirmPassword}
        secureTextEntry
      />

      <Button
        disabled={isRegistering}
        title={StringValues.register.toUpperCase()}
        onPress={onRegisterPress}
      />

      <NavigationLink
        text={StringValues.alreadyHaveAccount}
        onPress={onLoginLinkPress}
      />

      {isRegistering ? (
        <Progress.Circle
          size={24}
          indeterminate
          color={Colors.gold}
          style={styles.loader}
        />
      ) : null}
    </Screen>
  );
};
