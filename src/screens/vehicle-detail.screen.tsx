import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import I18n from "i18n-js";

import { Button, Divider, Layout, Text } from "@ui-kitten/components";
import { RootStackScreenProps } from "@ctypes/navigation.type";
import Attribute from "@components/attribute.component";
import DetailSection from "@components/detail-section.component";
import BookingSummary from "@components/booking-summary.component";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: Dimensions.get("window").width,
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  detail: {
    flexDirection: "column",
    flexWrap: "nowrap",
  },
  banner: {
    aspectRatio: 2,
    marginHorizontal: 1,
  },
  fullWidth: { flex: 1, flexShrink: 0, flexBasis: "100%" },
  divider: { marginVertical: 16 },
  button: { marginTop: 32 },
});

const VehicleDetailScreen = ({
  navigation,
  route: {
    params: { vehicle, searchParams },
  },
}: RootStackScreenProps<"VehicleDetail">) => {
  return (
    <Layout style={styles.root}>
      <Image
        style={[styles.banner, styles.fullWidth]}
        source={{
          uri: vehicle.imageUrl,
        }}
      />

      <Layout style={[styles.fullWidth, styles.detail]}>
        <DetailSection
          title={I18n.t("screens.vehicleDetail.vehicleParameters")}
        >
          <Attribute
            label={I18n.t("vehicle.fuel.label")}
            value={I18n.t(`vehicle.fuel.values.${vehicle.fuel}`)}
          />
          <Attribute
            label={I18n.t("vehicle.transmission.label")}
            value={I18n.t(
              `vehicle.transmission.values.${vehicle.transmission}`
            )}
          />
          <Attribute
            label={I18n.t("vehicle.seats.label")}
            value={vehicle.seats}
          />
          <Attribute
            label={I18n.t("vehicle.mileage.label")}
            value={`${vehicle.mileage} km`}
          />
          <Attribute
            label={I18n.t("vehicle.power.label")}
            value={`${Number(vehicle.power).toFixed(0)} kW`}
          />
          <Attribute
            label={I18n.t("vehicle.color.label")}
            value={I18n.t(`vehicle.color.values.${vehicle.color}`)}
          />
        </DetailSection>
        <Divider style={styles.divider} />
        <BookingSummary vehicle={vehicle} searchParams={searchParams} />
      </Layout>
      <Button
        style={[styles.fullWidth, styles.button]}
        onPress={() =>
          navigation.navigate("CreateBooking", { searchParams, vehicle })
        }
      >
        {I18n.t("screens.vehicleDetail.book")}
      </Button>
    </Layout>
  );
};

export default VehicleDetailScreen;
