import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";

import { Layout, Text } from "@ui-kitten/components";
import { RootStackScreenProps } from "@ctypes/navigation.type";
import VehicleUtils from "@utils/vehicle.util";

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
    flex: 1,
    aspectRatio: 2,
    marginHorizontal: 1,
  },
  fullWidth: { flex: 1, flexShrink: 0, flexBasis: "100%" },
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
        style={styles.banner}
        source={{
          uri: vehicle.imageUrl,
        }}
      />
      {/* <Text>{JSON.stringify({ vehicle, searchParams })}</Text> */}
    </Layout>
  );
};

export default VehicleDetailScreen;
