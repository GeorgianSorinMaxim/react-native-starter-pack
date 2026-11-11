import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "@react-native-firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "@react-native-firebase/firestore";
import { DateTime } from "luxon";

import { Alert } from "react-native";

import * as DeviceInfo from "../../utils/deviceInfo";
import uuid from "react-native-uuid";

import { logError } from "../logger";

import { FirebaseUser, UserData } from "../../types/api-types";

export const login = (
  username: string,
  password: string,
): Promise<FirebaseUser> => {
  return signInWithEmailAndPassword(getAuth(), username, password)
    .then(user => user as unknown as FirebaseUser)
    .catch((error: { code: string }) => error.code as unknown as FirebaseUser);
};

export const logout = (): Promise<boolean> => {
  return signOut(getAuth())
    .then(() => true)
    .catch((error: unknown) => {
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
  return createUserWithEmailAndPassword(getAuth(), email, password)
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

      return setDoc(doc(getFirestore(), "users", uid), data)
        .then(() => {
          Alert.alert("Your user has been created");
          return data as unknown as UserData;
        })
        .catch((error: unknown) => {
          Alert.alert(String(error));
          return error;
        });
    })
    .catch((error: { code: string }) => {
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
      return error.code as unknown as UserData;
    }) as Promise<UserData>;
};

export const getToken = async () => {
  const { currentUser } = getAuth();
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
  const snapshot = await getDoc(doc(getFirestore(), "users", userId));

  if (!snapshot.exists()) {
    return null;
  }

  const user = snapshot.data() as UserData;
  return user;
};

export const deleteUser = async () => {
  const { currentUser } = getAuth();

  try {
    await currentUser?.delete();
    return true;
  } catch (error: unknown) {
    logError("Delete user", error);
    return false;
  }
};
