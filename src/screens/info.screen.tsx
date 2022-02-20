import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Button, Text, Layout, Icon, useTheme } from "@ui-kitten/components";

import { RootStackScreenProps } from "@ctypes/navigation.type";

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
  bottomPadded: {
    paddingBottom: 16,
  },
  fullWidth: { flex: 1, flexShrink: 0, flexBasis: "100%" },
  icon: { width: 128, height: 128 },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 48,
  },
});

const InfoScreen = ({
  navigation,
  route: {
    params: { type = "success", text, buttonText, returnType },
  },
}: RootStackScreenProps<"Info">) => {
  const theme = useTheme();

  return (
    <Layout style={styles.root}>
      <Layout style={styles.container}>
        <Layout style={[styles.fullWidth, styles.iconContainer]}>
          <Icon
            style={[
              styles.icon,
              {
                tintColor: theme["color-primary-500"],
              },
            ]}
            name={
              type === "error" ? "close-circle-outline" : "checkmark-circle"
            }
          />
        </Layout>
        <Text style={styles.bottomPadded}>{text}</Text>
        <Button
          style={styles.fullWidth}
          onPress={() =>
            returnType === "back"
              ? navigation.goBack()
              : navigation.navigate("Home")
          }
        >
          {buttonText}
        </Button>
      </Layout>
    </Layout>
  );
};

export default InfoScreen;
