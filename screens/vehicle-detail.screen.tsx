import React from "react";
import { SafeAreaView } from "react-native";

import { Layout, Text } from "@ui-kitten/components";
import { RootStackScreenProps } from "@ctypes/navigation.type";

const VehicleDetailScreen = ({
  navigation,
}: RootStackScreenProps<"VehicleDetail">) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text category="h1">Detail</Text>
      </Layout>
    </SafeAreaView>
  );
};

export default VehicleDetailScreen;
