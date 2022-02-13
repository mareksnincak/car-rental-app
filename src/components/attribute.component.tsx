import React from "react";
import { StyleSheet } from "react-native";
import { Layout, LayoutProps, Text, TextProps } from "@ui-kitten/components";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 4,
  },
  bold: { fontWeight: "bold" },
});

const Attribute = ({
  label,
  value,
  layoutProps,
  labelTextProps,
  valueTextProps,
}: {
  label: string;
  value: string | number;
  layoutProps?: LayoutProps;
  labelTextProps?: TextProps;
  valueTextProps?: TextProps;
}) => {
  return (
    <Layout style={styles.container} {...layoutProps}>
      <Text {...labelTextProps}>{label}: </Text>
      <Text style={styles.bold} {...valueTextProps}>
        {value}
      </Text>
    </Layout>
  );
};

export default Attribute;
