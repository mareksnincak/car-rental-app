import React from "react";
import { StyleSheet, Image, ViewStyle, StyleProp } from "react-native";
import { Text, Layout, Button, Card, ListItem } from "@ui-kitten/components";

import { TVehicle } from "@ctypes/vehicle.type";
import Attribute from "@components/attribute.component";

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
          Zobraziť ponuku
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
            <Attribute label="Palivo" value={vehicle.fuel} />
            <Attribute label="Prevodovka" value={vehicle.transmission} />
            <Attribute label="Počet miest" value={vehicle.seats} />
            <Attribute label="Nájazd" value={`${vehicle.mileage} km`} />
            <Attribute
              label="Výkon"
              value={`${Number(vehicle.power).toFixed(0)} k`}
            />
          </Layout>
        </Layout>
      </Card>
    </ListItem>
  );
};

export default React.memo(SearchResultItem);
