import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { DateTime } from "luxon";

import { Alert } from "react-native";

import DeviceInfo from "react-native-device-info";
import uuid from "react-native-uuid";

export type UserPayload = {
  additionalUserInfo: {
    isNewUser: boolean;
    profile: unknown;
    providerId: string;
    username: string | null;
  };
  user: {
    displayName: string | null;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    metadata: unknown;
    phoneNumber: string | null;
    photoURL: string | null;
    providerData: unknown;
    providerId: string;
    refreshToken: string;
    tenantId: string | null;
    uid: string;
  };
};

export type NewUserData = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  uuid: string;
  platform: string;
  version: string;
  osVersion: string;
  createdAt: string;
};

export const login = (
  username: string,
  password: string,
): Promise<UserPayload> => {
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
      console.log("Logout error: ", error);
      return false;
    });
};

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
): Promise<NewUserData> => {
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
        console.log("That email address is already in use!");
      }

      if (error.code === "auth/invalid-email") {
        console.log("That email address is invalid!");
      }

      console.error(error);
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

  const user = doc.data() as NewUserData;
  return user;
};

export const deleteUser = async () => {
  const { currentUser } = auth();

  try {
    await currentUser?.delete();
    return true;
  } catch (error) {
    console.log("deleteUser error", error);
    return false;
  }
};
