import {
  getCrashlytics,
  log as crashlyticsLog,
  recordError as crashlyticsRecordError,
  setAttributes,
  setUserId,
} from "@react-native-firebase/crashlytics";

import { FirebaseUser } from "../types/api-types";

export const logError = (name: string, error?: string | unknown) => {
  if (name && typeof error === "string") {
    console.log(`Event: ${name}: ${error}`);
  } else {
    console.log(`Event: ${name}:`, error);
  }
};

export const log = (message: string) => {
  crashlyticsLog(getCrashlytics(), message);
};

export const recordError = (error: unknown) => {
  crashlyticsRecordError(getCrashlytics(), error as Error);
};

export const setUser = ({ user }: FirebaseUser, loggedIn: boolean) => {
  if (user) {
    setUserId(getCrashlytics(), String(user.uid));
    setAttributes(getCrashlytics(), {
      loggedIn: String(loggedIn),
      userUuid: String(user.uid),
    });
  }
};
