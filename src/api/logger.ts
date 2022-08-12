import crashlytics from "@react-native-firebase/crashlytics";

import { UserPayload } from "./auth/firebase-auth";

export const logError = (name: string, error?: string | unknown) => {
  if (name && typeof error === "string") {
    console.log(`Event: ${name} - error: ${error}`);
  } else {
    console.log(`Event: ${name}`);
  }
};

export const log = (message: string) => {
  crashlytics().log(message);
};

export const recordError = (error: unknown) => {
  crashlytics().recordError(error as Error);
};

export const setUser = ({ user }: UserPayload, loggedIn: boolean) => {
  if (user) {
    crashlytics().setUserId(String(user.uid));
    crashlytics().setAttributes({
      loggedIn: String(loggedIn),
      userUuid: String(user.uid),
    });
  }
};
