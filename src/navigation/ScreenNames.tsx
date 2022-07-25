export const ScreenNames = {
  ROOT: "Root",
  LOGIN: "Login",
  REGISTRATION: "Registration",
  HOME: "Home",
  APPS: "Apps",
  SETTINGS: "Settings",
  TABS: "Tabs",
} as const;

export type Screen<T extends keyof typeof ScreenNames> = typeof ScreenNames[T];
