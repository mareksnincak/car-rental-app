import React from "react";
import { StyleSheet, Image, ViewStyle, StyleProp } from "react-native";
import { Text, Layout, Button, Card, ListItem } from "@ui-kitten/components";
import I18n from "i18n-js";

import { TVehicle } from "@ctypes/vehicle.type";
import Attribute from "@components/attribute.component";
import VehicleUtils from "@utils/vehicle.util";

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
  detailButton: {
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
    vehicle,
    style,
    onDetailPress,
  }: {
    vehicle: TVehicle;
    style?: StyleProp<ViewStyle>;
    onDetailPress: () => void;
  }) => {
    return (
      <Layout style={[style, styles.footerContainer]}>
        {vehicle.price?.total && (
          <Layout style={[style, styles.footerPriceContainer]}>
            <Text style={styles.bold}>{vehicle.price.total}€</Text>
          </Layout>
        )}
        <Button
          size="small"
          style={styles.detailButton}
          onPress={onDetailPress}
        >
          {I18n.t("components.searchResultItem.showDetail")}
        </Button>
      </Layout>
    );
  }
);

const SearchResultItem = ({
  vehicle,
  onDetailPress,
}: {
  vehicle: TVehicle;
  onDetailPress: () => void;
}) => {
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
            vehicle={vehicle}
            style={viewProps?.style}
            onDetailPress={onDetailPress}
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
        </Layout>
      </Card>
    </ListItem>
  );
};

export default React.memo(SearchResultItem);
