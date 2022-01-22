import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { NavigationContainer } from "@react-navigation/native";
import { Platform, UIManager } from "react-native";
import * as Localization from "expo-localization";
import i18n from "i18n-js";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useCachedResources from "@hooks/useCachedResources";
import theme from "@themes/default.theme";
import { RootStackParamList } from "@ctypes/navigation.type";
import Screens from "@screens/index";
import HomeScreen from "@screens/home.screen";
import { EPlatformOs } from "@constants/common.constants";
import Translations from "./translations";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

if (Platform.OS === EPlatformOs.android) {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

i18n.translations = {
  sk: Translations.sk,
};

i18n.fallbacks = true;
i18n.defaultLocale = "sk";
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
              <Navigator initialRouteName="Home">
                <Screen
                  name="Home"
                  component={HomeScreen}
                  options={{
                    headerTitle: i18n.t("screens.home.headerTitle"),
                    headerShadowVisible: false,
                  }}
                />
                <Screen
                  name="SearchResult"
                  component={Screens.SearchResult}
                  options={{
                    headerTitle: i18n.t("screens.searchResult.headerTitle"),
                    headerShadowVisible: false,
                  }}
                />
                <Screen
                  name="VehicleDetail"
                  component={Screens.VehicleDetail}
                  options={{
                    headerTitle: i18n.t("screens.vehicleDetail.headerTitle"),
                    headerShadowVisible: false,
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
