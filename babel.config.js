module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["module:metro-react-native-babel-preset"],
    "plugins": [
      ["@babel/plugin-proposal-export-namespace-from"],
      ["module-resolver", {
        "root": ['./src'],
        "extensions": [
          ".ios.ts",
          ".android.ts",
          ".ts",
          ".ios.tsx",
          ".android.tsx",
          ".tsx",
          ".jsx",
          ".js",
          ".json"
        ],
        "alias": {
          "@api": "./src/api",
          "@components": "./src/components",
          "@navigation": "./src/navigation",
          "@screens": "./src/screens",
          "@store": "./src/store",
          "@utils": "./src/utils"
        }
      }],
      ['react-native-reanimated/plugin'],
    ]
  }
};
