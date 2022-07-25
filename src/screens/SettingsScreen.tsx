import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Linking, View, StyleSheet } from "react-native";
import DeviceInfo from "react-native-device-info";
import uuid from "react-native-uuid";

import {
  BodyText,
  ButtonWithIcon,
  Divider,
  Title,
  Screen,
} from "../components";
import Colors from "../constants/Colors";

import { authActions } from "../store/actions/auth";
import { getUser } from "../store/selectors";

import { contact } from "../utils/contact";

import { StringValues } from "../constants/StringValues";

export const SettingsScreen = () => {
  const dispatch = useDispatch();

  const user = useSelector(getUser);

  const [bundleId, setBundleId] = useState<string>("");
  const [buildNumber, setBuildNumber] = useState<string>("");
  const [version, setVersion] = useState<string>("");
  const [readableVersion, setReadableVersion] = useState<string>("");
  const [systemName, setSystemName] = useState<string>("");
  const [ip, setIp] = useState<string>("");
  const [osVersion, setOsVersion] = useState<string>("");
  const [uuidValue, setUuid] = useState<string>("");

  const getDeviceData = async () => {
    try {
      const bundleId = await DeviceInfo.getBundleId();
      const buildNumber = await DeviceInfo.getBuildNumber();
      const version = await DeviceInfo.getVersion();
      const readableVersion = await DeviceInfo.getReadableVersion();
      const systemName = await DeviceInfo.getSystemName();
      const ip = await DeviceInfo.getIpAddress();
      const osVersion = await DeviceInfo.getSystemVersion();
      const uuidVal = uuid.v1();

      setBundleId(bundleId);
      setBuildNumber(buildNumber);
      setVersion(version);
      setReadableVersion(readableVersion);
      setSystemName(systemName);
      setIp(ip);
      setOsVersion(osVersion);
      setUuid(uuidVal.toString());
    } catch (err) {
      return console.log("getDeviceData error:", err);
    }
  };

  useEffect(() => {
    getDeviceData();
  }, []);

  const onLogout = () => {
    dispatch(authActions.logoutStart());
  };

  const onContact = () => {
    const EMAIL = "hey@devxldn.com";
    const SUBJECT = "I have a question or concern:";
    const BODY = `Please write your question or concern below:\n
      \n\n\n
      ----------------------------\n
      App ID: #${bundleId} \n
      App build number: ${buildNumber} \n
      App version: ${version} \n
      System: ${systemName} \n
      OS: ${osVersion} \n
      IP: ${ip} \n
      UUID: ${uuidValue} \n
    `;
    contact(EMAIL, SUBJECT, BODY);
  };

  const onTermsPress = () => {
    try {
      Linking.openURL("http://www.devxldn.com");
    } catch (err) {
      console.log("Linking error: ", err);
    }
  };

  return (
    <Screen noHorizontalPadding={true}>
      <View style={styles.container}>
        <Title label={StringValues.yourDetails} />
        <Divider />
        <View style={styles.bodyContainer}>
          {user?.lastName ? (
            <View style={styles.textContainer}>
              <BodyText style={styles.headerText}>Name</BodyText>
              <BodyText style={styles.contentText}>
                {user?.firstName} {user.lastName}
              </BodyText>
            </View>
          ) : null}
          {user?.email ? (
            <View style={styles.textContainer}>
              <BodyText style={styles.headerText}>
                {StringValues.email}
              </BodyText>
              <BodyText style={styles.contentText}>{user.email}</BodyText>
            </View>
          ) : null}
          <View style={styles.textContainer}>
            <BodyText style={styles.headerText}>
              {StringValues.appVersion}
            </BodyText>
            <BodyText style={styles.contentText}>{readableVersion}</BodyText>
          </View>
          <View style={styles.textContainer}>
            <BodyText style={styles.headerText}>{StringValues.uuid}</BodyText>
            <BodyText style={styles.contentText}>{uuidValue}</BodyText>
          </View>
        </View>
      </View>

      <ButtonWithIcon
        icon="link"
        label={StringValues.termsAndConditions}
        onPress={onTermsPress}
      />
      <ButtonWithIcon
        icon="mail-outline"
        label={StringValues.contact}
        onPress={onContact}
      />
      <ButtonWithIcon
        icon="log-out-outline"
        label={StringValues.logout}
        onPress={onLogout}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  bodyContainer: {
    padding: 24,
  },
  textContainer: {
    paddingVertical: 10,
  },
  headerText: {
    paddingBottom: 4,
    color: Colors.grey,
  },
  contentText: {
    color: Colors.gold,
    fontWeight: "bold",
  },
});
