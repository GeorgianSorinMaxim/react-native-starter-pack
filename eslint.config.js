const expoConfig = require("eslint-config-expo/flat");

module.exports = [
  ...expoConfig,
  { ignores: ["node_modules", ".expo", "dist", "ios", "android"] },
  {
    // Existing code predates these rules; surface them without failing CI.
    rules: {
      "react/display-name": "warn",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];
