import React from "react";
import { StyleSheet } from "react-native";
import { Layout, LayoutProps, Spinner } from "@ui-kitten/components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const Loader = ({ layoutProps }: { layoutProps?: LayoutProps }) => {
  return (
    <Layout {...layoutProps} style={[styles.container, layoutProps?.style]}>
      <Spinner />
    </Layout>
  );
};

export default Loader;
