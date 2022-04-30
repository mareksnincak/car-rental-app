import React from "react";
import i18n from "i18n-js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeStackParamList } from "@ctypes/navigation.type";
import VehicleUtils from "@utils/vehicle.util";
import Screens from "@screens/index";

const { Navigator, Screen } = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Navigator initialRouteName="Search">
      <Screen
        name="Search"
        component={Screens.Search}
        options={{
          headerTitle: i18n.t("screens.search.headerTitle"),
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
        options={({ route }) => ({
          title: VehicleUtils.getFullVehicleName(route.params.vehicle),
          headerShadowVisible: false,
        })}
      />
      <Screen
        name="CreateBooking"
        component={Screens.CreateBooking}
        options={({ route }) => ({
          title: VehicleUtils.getFullVehicleName(route.params.vehicle),
          headerShadowVisible: false,
        })}
      />
      <Screen
        name="Info"
        component={Screens.Info}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};

export default HomeStack;
