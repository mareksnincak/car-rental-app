import React from "react";
import i18n from "i18n-js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { BookingsStackParamList } from "@ctypes/navigation.type";
import Screens from "@screens/index";

const { Navigator, Screen } =
  createNativeStackNavigator<BookingsStackParamList>();

const BookingStack = () => {
  return (
    <Navigator initialRouteName="BookedVehicles">
      <Screen
        name="BookedVehicles"
        component={Screens.BookedVehicles}
        options={{
          headerTitle: i18n.t("screens.bookedVehicles.headerTitle"),
          headerShadowVisible: false,
        }}
      />
      <Screen
        name="ReturnBooking"
        component={Screens.ReturnBooking}
        options={{
          title: i18n.t("screens.returnBooking.headerTitle"),
          headerShadowVisible: false,
        }}
      />
      <Screen
        name="Info"
        component={Screens.Info}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};

export default BookingStack;
