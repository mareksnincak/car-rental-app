import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Spinner } from "@ui-kitten/components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const Loader = () => {
  return (
    <Layout style={styles.container}>
      <Spinner />
    </Layout>
  );
};

export default Loader;
