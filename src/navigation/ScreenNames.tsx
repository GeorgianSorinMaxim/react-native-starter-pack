export const ScreenNames = {
  ROOT: "Root",
  LOGIN: "Login",
  REGISTRATION: "Registration",
  HOME: "Home",
  NEWS: "News",
  SETTINGS: "Settings",
  TABS: "Tabs",
} as const;

export type Screen<T extends keyof typeof ScreenNames> = typeof ScreenNames[T];
