import React from "react";
import { Button, Layout } from "@ui-kitten/components";

import { RootStackScreenProps } from "@ctypes/navigation.type";

const SearchResultScreen = ({
  navigation,
}: RootStackScreenProps<"SearchResult">) => {
  return (
    <Layout style={{ flex: 1 }}>
      <Button onPress={() => navigation.navigate("VehicleDetail")}>
        Detail
      </Button>
    </Layout>
  );
};

export default SearchResultScreen;
