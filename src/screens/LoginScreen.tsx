import React, { useState, useEffect } from "react";
import { Alert, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Progress from "react-native-progress";
import LinearGradient from "react-native-linear-gradient";

import {
  Button,
  InputWithLabel,
  NavigationLink,
  Screen,
  Heading,
  Box,
} from "../components";
import { colors } from "../theme";

import { authActions } from "../store/actions/auth";
import { getLoginStatus, getLoginError } from "../store/selectors";

import { ScreenNames } from "../navigation/ScreenNames";
import { NavigatorStackParamList } from "../navigation/AppNavigator";

import { StringValues } from "../constants/StringValues";

type LoginScreenProp = StackNavigationProp<
  NavigatorStackParamList,
  typeof ScreenNames.LOGIN
>;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  loader: {
    paddingVertical: 24,
    alignSelf: "center",
  },
});

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
    <LinearGradient
      colors={[colors["grey-400"], colors.white]}
      style={styles.linearGradient}>
      <Screen transparent>
        <Box flex={1} marginTop="extraLarge" marginBottom="small">
          <Heading>{StringValues.login}</Heading>
        </Box>

        <InputWithLabel
          hideLabelWhenFocused
          value={email}
          onChangeText={onEmailChange}
          label={StringValues.email}
        />
        <InputWithLabel
          hideLabelWhenFocused
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

        <Box marginTop="large">
          <NavigationLink
            text={StringValues.createAccount}
            onPress={onRegistrationLinkPress}
            capitalized
          />
        </Box>

        {isSubmitting ? (
          <Progress.Circle
            size={24}
            indeterminate
            color={colors.purple}
            style={styles.loader}
          />
        ) : null}
      </Screen>
    </LinearGradient>
  );
};
