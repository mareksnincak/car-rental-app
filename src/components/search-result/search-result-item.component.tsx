import React from "react";
import { StyleSheet, Image, ViewStyle, StyleProp } from "react-native";
import { Text, Layout, Button, Card, ListItem } from "@ui-kitten/components";

import { TVehicle } from "@ctypes/vehicle.type";
import Attribute from "@components/attribute.component";
import I18n from "i18n-js";

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
    margin: -16,
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
    aspectRatio: 1.5,
    marginRight: 16,
    marginLeft: -16,
  },
  detailButton: {
    flex: 1,
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
      <Text category="h6" style={styles.bold}>
        {make} {model} {year}
      </Text>
    </Layout>
  )
);

const Footer = React.memo(
  ({
    price,
    style,
  }: {
    price?: number | null;
    style?: StyleProp<ViewStyle>;
  }) => {
    return (
      <Layout style={[style, styles.footerContainer]}>
        {price && (
          <Layout style={[style, styles.footerPriceContainer]}>
            <Text style={styles.bold}>{price}€</Text>
          </Layout>
        )}
        <Button size="small" style={styles.detailButton}>
          {I18n.t("components.searchResultItem.showDetail")}
        </Button>
      </Layout>
    );
  }
);

const SearchResultItem = ({ vehicle }: { vehicle: TVehicle }) => {
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
          <Footer price={vehicle.price?.total} style={viewProps?.style} />
        )}
      >
        <Layout style={[styles.fullWidth, styles.cardContainer]}>
          <Image
            style={[styles.itemImage]}
            source={{
              uri: vehicle.imageUrl,
            }}
          />
          <Layout>
            <Attribute
              label={I18n.t("vehicle.fuel.label")}
              value={I18n.t(`vehicle.fuel.type.${vehicle.fuel}`)}
            />
            <Attribute
              label={I18n.t("vehicle.transmission.label")}
              value={I18n.t(
                `vehicle.transmission.type.${vehicle.transmission}`
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
          </Layout>
        </Layout>
      </Card>
    </ListItem>
  );
};

export default React.memo(SearchResultItem);
