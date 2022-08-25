import crashlytics from "@react-native-firebase/crashlytics";

import { FirebaseUser } from "../types/api-types";

export const logError = (name: string, error?: string | unknown) => {
  if (name && typeof error === "string") {
    console.log(`Event: ${name}: ${error}`);
  } else {
    console.log(`Event: ${name}:`, error);
  }
};

export const log = (message: string) => {
  crashlytics().log(message);
};

export const recordError = (error: unknown) => {
  crashlytics().recordError(error as Error);
};

export const setUser = ({ user }: FirebaseUser, loggedIn: boolean) => {
  if (user) {
    crashlytics().setUserId(String(user.uid));
    crashlytics().setAttributes({
      loggedIn: String(loggedIn),
      userUuid: String(user.uid),
    });
  }
};
