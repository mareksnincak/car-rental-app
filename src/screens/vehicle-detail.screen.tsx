import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import I18n from "i18n-js";

import { Button, Divider, Layout, Text } from "@ui-kitten/components";
import { RootStackScreenProps } from "@ctypes/navigation.type";
import Attribute from "@components/attribute.component";
import { toReadableDate } from "@utils/date.util";

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
  banner: {
    aspectRatio: 2,
    marginHorizontal: 1,
  },
  fullWidth: { flex: 1, flexShrink: 0, flexBasis: "100%" },
  divider: { marginVertical: 16 },
  button: { marginTop: 32 },
  categoryLayout: { marginBottom: 8 },
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

      <Layout
        style={[
          styles.fullWidth,
          {
            flexDirection: "column",
            flexWrap: "nowrap",
          },
        ]}
      >
        <Layout>
          <Text category="h6" style={{ marginBottom: 8 }}>
            {I18n.t("screens.vehicleDetail.vehicleParameters")}
          </Text>
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
            value={`${Number(vehicle.power).toFixed(0)} k`}
          />
          <Attribute
            label={I18n.t("vehicle.color.label")}
            value={I18n.t(`vehicle.color.values.${vehicle.color}`)}
          />
        </Layout>
        <Divider style={styles.divider} />
        <Layout>
          <Text category="h6" style={styles.categoryLayout}>
            {I18n.t("screens.vehicleDetail.summary")}
          </Text>
          <Attribute
            label={I18n.t("screens.vehicleDetail.bookingDate")}
            value={toReadableDate(searchParams.fromDate)}
          />
          <Attribute
            label={I18n.t("screens.vehicleDetail.returnDate")}
            value={toReadableDate(searchParams.toDate)}
          />
          <Attribute
            label={I18n.t("screens.vehicleDetail.deposit")}
            value={`${vehicle.price.deposit} €`}
          />
          <Attribute
            label={I18n.t("screens.vehicleDetail.price")}
            value={`${vehicle.price.total} €`}
          />
        </Layout>
      </Layout>
      <Button
        style={[styles.fullWidth, styles.button]}
        // onPress={handleSubmit as (event: unknown) => void}
      >
        {I18n.t("screens.vehicleDetail.book")}
      </Button>
    </Layout>
  );
};

export default VehicleDetailScreen;
