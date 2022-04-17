import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  ApplicationProvider,
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  IconRegistry,
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { NavigationContainer } from "@react-navigation/native";
import { Platform, UIManager } from "react-native";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import * as Sentry from "sentry-expo";
import "moment/locale/sk";

import useCachedResources from "@hooks/useCachedResources";
import theme from "@themes/default.theme";
import Stacks from "@stacks/index";
import { EPlatformOs } from "@constants/common.constants";
import { DEFAULT_LOCALE } from "@constants/date.constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Translations from "./translations";

const enableSentry = process.env.SENTRY_ENABLED === "true";

Sentry.init({
  enabled: enableSentry,
  dsn: process.env.SENTRY_DSN,
  enableInExpoDevelopment: false,
  debug: enableSentry && __DEV__,
});

const { Navigator, Screen } = createBottomTabNavigator();

if (Platform.OS === EPlatformOs.android) {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

i18n.translations = {
  sk: Translations.sk,
};

i18n.fallbacks = true;
i18n.defaultLocale = DEFAULT_LOCALE;
i18n.locale = Localization.locale;

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{
            ...eva.light,
            ...theme,
          }}
        >
          <SafeAreaProvider>
            <NavigationContainer>
              <Navigator
                tabBar={({ navigation, state }) => (
                  <BottomNavigation
                    selectedIndex={state.index}
                    onSelect={(index) =>
                      navigation.navigate(state.routeNames[index])
                    }
                  >
                    <BottomNavigationTab
                      title={i18n.t("tabs.home")}
                      icon={<Icon name="home" />}
                    />
                    <BottomNavigationTab
                      title={i18n.t("tabs.bookings")}
                      icon={<Icon name="car" />}
                    />
                  </BottomNavigation>
                )}
              >
                <Screen
                  name="Home"
                  component={Stacks.Home}
                  options={{
                    headerShown: false,
                  }}
                />
                <Screen
                  name="Bookings"
                  component={Stacks.Booking}
                  options={{
                    unmountOnBlur: true,
                    headerShown: false,
                  }}
                />
              </Navigator>
            </NavigationContainer>
            <StatusBar style="dark" />
          </SafeAreaProvider>
        </ApplicationProvider>
      </>
    );
  }
}
