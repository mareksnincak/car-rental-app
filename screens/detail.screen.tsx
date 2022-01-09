import React from "react";
import { SafeAreaView } from "react-native";

import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { RootStackScreenProps } from "../types/navigation.type";

const BackIcon = (props: unknown) => <Icon {...props} name="arrow-back" />;

const DetailScreen = ({ navigation }: RootStackScreenProps<"Detail">) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text category="h1">DETAILS</Text>
      </Layout>
    </SafeAreaView>
  );
};

export default DetailScreen;
