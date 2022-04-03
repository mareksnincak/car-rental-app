import React, { useEffect, useRef, useState } from "react";
import { Dimensions, ListRenderItemInfo, StyleSheet } from "react-native";
import { Text, Layout, Button, List } from "@ui-kitten/components";
import I18n from "i18n-js";
import * as Sentry from "sentry-expo";

import { RootStackScreenProps } from "@ctypes/navigation.type";
import { VehicleApi } from "@api/vehicle.api";
import Loader from "@components/loader.component";
import { ESortBy } from "@constants/vehicle.constant";
import { ESortDirection } from "@constants/common.constants";
import SearchResultItem from "@components/search-result-item.component";
import { BookingApi } from "@api/booking.api";
import { TBooking } from "@ctypes/booking.type";
import BookingItem from "@components/booking-item.component";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: Dimensions.get("window").width,
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: -80,
    padding: 16,
  },
  bottomPadded: {
    paddingBottom: 16,
  },
  bottomPaddedCompact: {
    paddingBottom: 4,
  },
  fullWidth: { flex: 1, flexShrink: 0, flexBasis: "100%" },
  listItem: {
    flexDirection: "row",
  },
  bold: {
    fontWeight: "bold",
  },
  itemImage: {
    width: 100,
    height: 100,
    marginRight: 32,
  },
  detailButton: {
    flex: 2,
  },
  flex: {
    flex: 1,
  },
});

const renderSearchResultItem = ({ item }: ListRenderItemInfo<TBooking>) => {
  return <BookingItem booking={item} />;
};

const BookedVehiclesScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<TBooking[]>([]);

  const fetchData = async () => {
    try {
      const { data } = await BookingApi.getCurrentBookings();

      setBookings(data);
      setIsLoading(false);
    } catch (err) {
      Sentry.Native.captureException(err);

      // TODO
      // return navigation.navigate("Info", {
      //   type: "error",
      //   text: I18n.t("error.default"),
      //   buttonText: I18n.t("common.returnHome"),
      //   returnType: "home",
      // });
      throw err;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!bookings.length) {
    return (
      <Layout style={styles.root}>
        <Layout style={styles.container}>
          <Text style={styles.bottomPadded}>
            {I18n.t("screens.bookedVehicles.noBookingsFound")}
          </Text>
        </Layout>
      </Layout>
    );
  }

  return (
    <Layout style={styles.root}>
      <List
        style={styles.flex}
        data={bookings}
        renderItem={(itemInfo) => renderSearchResultItem(itemInfo)}
      />
    </Layout>
  );
};

export default BookedVehiclesScreen;
