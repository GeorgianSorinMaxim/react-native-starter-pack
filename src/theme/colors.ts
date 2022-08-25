const white = "#ffffff";
const black = "#000000";

const primary = "#242529";
const salmon = "#FCDDE8";
const babyBlue = "#0099FF";
const purple = "#3B1F86";
const error = "#CE0924";
const gold = "#FBC99A"; // "#D4AF37";
const moneyGold = "#FEF1E5";
const pink = "#F3A8DB";
const grey = "#BABABA";

export const colors = {
  white,
  black,

  primary,
  gold,
  moneyGold,
  pink,
  salmon,
  babyBlue,
  purple,
  error,

  // Grey shades
  grey,
  "grey-50": "#F7F7F7",
  "grey-100": "#F6F6F6",
  "grey-200": "#F5F5F5",
  "grey-300": "#F4F4F4",
  "grey-400": "#F1F1F1",
  "grey-500": "#666666",

  tabIconUnfocused: black,
  tabIconFocused: purple,
} as const;

export type ColorToken = keyof typeof colors;
