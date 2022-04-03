import React from "react";
import i18n from "i18n-js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParamList } from "@ctypes/navigation.type";
import VehicleUtils from "@utils/vehicle.util";
import SearchScreen from "./search.screen";
import SearchResultScreen from "./search-result.screen";
import VehicleDetailScreen from "./vehicle-detail.screen";
import CreateBookingScreen from "./create-booking.screen";
import InfoScreen from "./info.screen";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

const HomeScreen = () => {
  return (
    <Navigator initialRouteName="Search">
      <Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerTitle: i18n.t("screens.search.headerTitle"),
          headerShadowVisible: false,
        }}
      />
      <Screen
        name="SearchResult"
        component={SearchResultScreen}
        options={{
          headerTitle: i18n.t("screens.searchResult.headerTitle"),
          headerShadowVisible: false,
        }}
      />
      <Screen
        name="VehicleDetail"
        component={VehicleDetailScreen}
        options={({ route }) => ({
          title: VehicleUtils.getFullVehicleName(route.params.vehicle),
          headerShadowVisible: false,
        })}
      />
      <Screen
        name="CreateBooking"
        component={CreateBookingScreen}
        options={({ route }) => ({
          title: VehicleUtils.getFullVehicleName(route.params.vehicle),
          headerShadowVisible: false,
        })}
      />
      <Screen
        name="Info"
        component={InfoScreen}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};

export default HomeScreen;
