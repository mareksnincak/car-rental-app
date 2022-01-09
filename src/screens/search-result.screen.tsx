import React from "react";
import { SafeAreaView } from "react-native";
import { Button, Layout } from "@ui-kitten/components";

import { RootStackScreenProps } from "@ctypes/navigation.type";

const SearchResultScreen = ({
  navigation,
}: RootStackScreenProps<"SearchResult">) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Button onPress={() => navigation.navigate("VehicleDetail")}>
          Detail
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

export default SearchResultScreen;
