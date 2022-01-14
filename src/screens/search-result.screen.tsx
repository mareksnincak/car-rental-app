import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ListRenderItemInfo,
  StyleSheet,
  Image,
  ViewProps,
} from "react-native";
import {
  Text,
  Layout,
  Button,
  List,
  Card,
  ListItem,
  useTheme,
} from "@ui-kitten/components";

import { RootStackScreenProps } from "@ctypes/navigation.type";
import { TVehicle } from "@ctypes/vehicle.type";
import { VehicleApi } from "@api/vehicle.api";
import Loader from "@components/loader.component";
import Attribute from "@components/attribute.component";

const MOCKED_IMAGE_URL =
  "https://cdn2.rcstatic.com/images/car_images/web/toyota/aygo_lrg.jpg";

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
  footerContainer: { flexDirection: "row", alignItems: "center" },
  footerPriceContainer: {
    alignItems: "center",
    width: 100,
    marginRight: 32,
  },
  cardContainer: { flexDirection: "row", flexWrap: "wrap" },
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
});

const SearchResultScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"SearchResult">) => {
  const { searchParams } = route.params;

  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [vehicles, setVehicles] = useState<TVehicle[]>([]);

  const fetchData = async () => {
    const { data } = await VehicleApi.search(searchParams, {
      page: 1,
      pageSize: 10,
    });

    setVehicles(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!vehicles.length) {
    return (
      <Layout style={styles.root}>
        <Layout style={styles.container}>
          <Text style={styles.bottomPadded}>Nenašli sa žiadne vozidlá</Text>
          <Button style={styles.fullWidth} onPress={() => navigation.goBack()}>
            Zmeniť kritéria vyhľadávania
          </Button>
        </Layout>
      </Layout>
    );
  }

  const Header = (vehicle: TVehicle, props?: ViewProps) => (
    <Layout {...props}>
      <Text category="h6" style={styles.bold}>
        {vehicle.make} {vehicle.model} {vehicle.year}
      </Text>
    </Layout>
  );

  const Footer = (vehicle: TVehicle, props?: ViewProps) => {
    const price = vehicle.price?.total;

    return (
      <Layout style={[props?.style, styles.footerContainer]}>
        {price && (
          <Layout style={styles.footerPriceContainer}>
            <Text style={styles.bold}>{price}€</Text>
          </Layout>
        )}
        <Button size="small" style={styles.detailButton}>
          Zobraziť ponuku
        </Button>
      </Layout>
    );
  };

  const renderItem = ({ item: vehicle }: ListRenderItemInfo<TVehicle>) => {
    return (
      <ListItem style={styles.fullWidth}>
        <Card
          style={styles.fullWidth}
          header={(viewProps) => Header(vehicle, viewProps)}
          footer={(viewProps) => Footer(vehicle, viewProps)}
        >
          <Layout style={[styles.fullWidth, styles.cardContainer]}>
            <Image
              style={[
                styles.itemImage,
                {
                  backgroundColor: theme["color-basic-transparent-default"],
                },
              ]}
              source={{
                uri: MOCKED_IMAGE_URL,
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

  return (
    <Layout style={styles.root}>
      <List data={vehicles} renderItem={renderItem} />
    </Layout>
  );
};

export default SearchResultScreen;
