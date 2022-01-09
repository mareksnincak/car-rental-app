import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import useCachedResources from "./hooks/useCachedResources";
import theme from "./themes/default.theme";
import { RootStackParamList } from "./types/navigation.type";
import Screens from "./screens";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

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
                  component={Screens.home}
                  options={{ title: "Car-sharing", headerTitleAlign: "center" }}
                />
                <Screen
                  name="Detail"
                  component={Screens.detail}
                  options={{ title: "Vozidlá", headerTitleAlign: "center" }}
                />
              </Navigator>
            </NavigationContainer>
            <StatusBar />
          </SafeAreaProvider>
        </ApplicationProvider>
      </>
    );
  }
}
