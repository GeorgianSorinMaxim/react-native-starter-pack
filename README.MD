# React Native starter pack

An Expo SDK 58 starter with TypeScript (strict), React Navigation, Redux + Redux Saga, Firebase auth, Jest + React Native Testing Library, and Maestro.

The new architecture is on. The app uses [continuous native generation](https://docs.expo.dev/workflow/continuous-native-generation/), so there are no `ios/` or `android/` folders in git.

## Stack

| Area | Choice |
| --- | --- |
| Runtime | Expo SDK 58, React Native 0.88, React 19 |
| Language | TypeScript 6, `strict` on |
| Navigation | React Navigation 7 (stack + bottom tabs) |
| State | Redux, Redux Saga, Redux Persist (AsyncStorage) |
| Backend | React Native Firebase (modular API): Auth, Firestore, Crashlytics |
| Styling | `StyleSheet` with design tokens in `src/theme` |
| Unit tests | Jest (`jest-expo`) + React Native Testing Library |
| E2E tests | Maestro (`.maestro/`) |

## Setup

1. Install Node 22 or later and Xcode / Android Studio.
2. Install packages: `npm install`
3. Copy `.env.example` to `.env`. Set the News API values.
4. Add your Firebase files: `GoogleService-Info.plist` and `google-services.json`. Then set `ios.googleServicesFile` and `android.googleServicesFile` in `app.json`.
5. Change the bundle ID and package name in `app.json` (`com.example.starterpack`).

React Native Firebase needs native code. You cannot use Expo Go. Use a development build.

## Run

```sh
npm run ios        # build and run on the iOS simulator
npm run android    # build and run on an Android emulator
npm start          # start Metro for an installed dev build
```

## Quality checks

```sh
npm run typecheck  # tsc --noEmit
npm run lint       # eslint-config-expo
npm test           # Jest + RNTL
npm run e2e        # Maestro smoke test (needs a running dev build)
```

CI runs typecheck, lint and tests on each push (`.github/workflows/main.yml`).

## Project layout

```
App.tsx            root providers
src/api            Firebase and network calls
src/components     shared UI components
src/navigation     navigators and screen names
src/screens        screens
src/store          actions, reducers, sagas, selectors
src/theme          colours, spacing, typography
```

## Changes from v1

- Moved from bare React Native 0.69 to Expo SDK 58 with prebuild.
- Replaced removed or unmaintained libraries with Expo equivalents: `@expo/vector-icons`, `expo-image`, `expo-linear-gradient`, `expo-application`, `expo-device`, `react-native-keyboard-controller`, `ActivityIndicator`.
- Moved Firebase code to the modular API.
- Removed Flipper, CodePush and `react-native-config`. Use `EXPO_PUBLIC_*` env vars.
