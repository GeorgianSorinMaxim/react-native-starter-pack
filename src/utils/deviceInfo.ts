import * as Application from "expo-application";
import * as Device from "expo-device";
import { Platform } from "react-native";

export const getBundleId = () => Application.applicationId ?? "";
export const getBuildNumber = () => Application.nativeBuildVersion ?? "";
export const getVersion = () => Application.nativeApplicationVersion ?? "";
export const getReadableVersion = () => `${getVersion()}.${getBuildNumber()}`;
export const getSystemName = () => Platform.OS;
export const getSystemVersion = () => Device.osVersion ?? "";
