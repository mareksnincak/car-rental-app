import React from "react";
import { StyleSheet, Image, ViewStyle, StyleProp } from "react-native";
import { Text, Layout, Button, Card, ListItem } from "@ui-kitten/components";
import I18n from "i18n-js";

import { TVehicle, TVehiclePrice } from "@ctypes/vehicle.type";
import Attribute from "@components/attribute.component";
import VehicleUtils from "@utils/vehicle.util";
import { TBooking } from "@ctypes/booking.type";
import { toReadableDate } from "@utils/date.util";

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  footerPriceContainer: {
    alignItems: "center",
    flex: 0,
    flexBasis: 150,
    flexShrink: 1,
    marginVertical: -16,
    marginLeft: -8,
    marginRight: 16,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
  },
  fullWidth: { flex: 1, flexShrink: 0, flexBasis: "100%" },
  listItem: {
    flexDirection: "row",
  },
  bold: {
    fontWeight: "bold",
  },
  itemImage: {
    flex: 0,
    flexBasis: 150,
    flexShrink: 1,
    aspectRatio: 2,
    marginRight: 16,
    marginLeft: -8,
  },
  returnButton: {
    flex: 1,
  },
  headerText: {
    marginHorizontal: -6,
  },
});

const Header = React.memo(
  ({
    make,
    model,
    year,
    style,
  }: Pick<TVehicle, "make" | "model" | "year"> & {
    style?: StyleProp<ViewStyle>;
  }) => (
    <Layout style={style}>
      <Text category="h6" style={[styles.headerText, styles.bold]}>
        {VehicleUtils.getFullVehicleName({ make, model, year })}
      </Text>
    </Layout>
  )
);

const Footer = React.memo(
  ({
    price,
    style,
    onButtonPress,
  }: {
    price: TVehiclePrice;
    style?: StyleProp<ViewStyle>;
    onButtonPress: () => void;
  }) => {
    return (
      <Layout style={[style, styles.footerContainer]}>
        <Layout style={[style, styles.footerPriceContainer]}>
          <Text style={styles.bold}>{price.total}€</Text>
        </Layout>
        <Button
          size="small"
          style={styles.returnButton}
          onPress={onButtonPress}
        >
          {I18n.t("screens.bookedVehicles.returnVehicle")}
        </Button>
      </Layout>
    );
  }
);

const BookingItem = ({ booking }: { booking: TBooking }) => {
  const { vehicle, price } = booking;
  return (
    <ListItem style={styles.fullWidth}>
      <Card
        style={styles.fullWidth}
        header={(viewProps) => (
          <Header
            make={vehicle.make}
            model={vehicle.model}
            year={vehicle.year}
            style={viewProps?.style}
          />
        )}
        footer={(viewProps) => (
          <Footer
            price={price}
            style={viewProps?.style}
            onButtonPress={() => {}}
          />
        )}
      >
        <Layout style={[styles.fullWidth, styles.cardContainer]}>
          <Image
            style={styles.itemImage}
            source={{
              uri: vehicle.imageUrl,
            }}
          />
          <Layout>
            <Attribute
              label={I18n.t("booking.from")}
              value={toReadableDate(booking.fromDate)}
            />
            <Attribute
              label={I18n.t("booking.to")}
              value={toReadableDate(booking.toDate)}
            />
          </Layout>
        </Layout>
      </Card>
    </ListItem>
  );
};

export default React.memo(BookingItem);
