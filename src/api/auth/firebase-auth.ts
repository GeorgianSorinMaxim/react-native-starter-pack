import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { DateTime } from "luxon";

import { Alert } from "react-native";

import DeviceInfo from "react-native-device-info";
import uuid from "react-native-uuid";

import { logError } from "../logger";

import { FirebaseUser, UserData } from "../../types/api-types";

export const login = (
  username: string,
  password: string,
): Promise<FirebaseUser> => {
  return auth()
    .signInWithEmailAndPassword(username, password)
    .then(user => user)
    .catch(error => error.code);
};

export const logout = (): Promise<boolean> => {
  return auth()
    .signOut()
    .then(() => true)
    .catch(error => {
      logError("Logout error", error);
      return false;
    });
};

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
): Promise<UserData> => {
  return auth()
    .createUserWithEmailAndPassword(email, password)
    .then(response => {
      const uid = response.user.uid;
      const platform = DeviceInfo.getSystemName();
      const version = DeviceInfo.getVersion();
      const osVersion = DeviceInfo.getSystemVersion();
      const createdAt = new Date();

      const data = {
        id: uid,
        email,
        firstName,
        lastName,
        uuid: uuid.v1(),
        platform,
        version,
        osVersion,
        createdAt,
      };

      const usersRef = firestore().collection("users");
      return usersRef
        .doc(uid)
        .set(data)
        .then(() => {
          Alert.alert("Your user has been created");
          return data;
        })
        .catch(error => {
          Alert.alert(error);
          return error;
        });
    })
    .catch(error => {
      if (error.code === "auth/email-already-in-use") {
        logError("Registration", "Email address is already in use");
      }

      if (error.code === "auth/invalid-email") {
        logError("Registration", "Email address is already in use");
      }

      if (error.code === "auth/invalid-email") {
        logError("Registration", "Email address is invalid");
      }

      Alert.alert(error.code);
      return error.code;
    });
};

export const getToken = async () => {
  const { currentUser } = auth();
  if (currentUser) {
    const idTokenResult = await currentUser.getIdTokenResult();
    const expirationTime = DateTime.fromISO(idTokenResult.expirationTime);
    const currentTime = DateTime.local();
    const { minutes } = expirationTime.diff(currentTime, "minutes").toObject();
    if (minutes && minutes > 2) {
      return idTokenResult.token;
    }
    return await currentUser.getIdToken(true);
  }
  return null;
};

export const getUser = async (userId: string) => {
  const usersRef = firestore().collection("users").doc(userId);
  const doc = await usersRef.get();

  if (!doc.exists) {
    return null;
  }

  const user = doc.data() as UserData;
  return user;
};

export const deleteUser = async () => {
  const { currentUser } = auth();

  try {
    await currentUser?.delete();
    return true;
  } catch (error: unknown) {
    logError("Delete user", error);
    return false;
  }
};
