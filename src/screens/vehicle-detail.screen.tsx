import React from "react";

import { Layout, Text } from "@ui-kitten/components";
import { RootStackScreenProps } from "@ctypes/navigation.type";

const VehicleDetailScreen = ({
  navigation,
}: RootStackScreenProps<"VehicleDetail">) => {
  return (
    <Layout>
      <Text>Detail</Text>
    </Layout>
  );
};

export default VehicleDetailScreen;
