import { ConfigContext, ExpoConfig } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "car-rental",
  slug: "car-rental",
  version: "1.1.1",
  orientation: "portrait",
  icon: "./src/assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./src/assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/images/adaptive-icon.png",
      backgroundColor: "#5191D3",
    },
    package: "com.mareksnincak.carrental",
  },
  plugins: ["sentry-expo"],
  hooks: {
    postPublish: [
      {
        file: "sentry-expo/upload-sourcemaps",
        config: {
          organization: process.env.SENTRY_ORG,
          project: process.env.SENTRY_PROJECT,
          authToken: process.env.SENTRY_AUTH_TOKEN,
        },
      },
    ],
  },
});
