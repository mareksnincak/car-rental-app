import React, { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { Layout, LayoutProps, Text } from "@ui-kitten/components";

const styles = StyleSheet.create({
  title: { marginBottom: 8 },
});

const DetailSection = ({
  title,
  children,
  layoutProps,
}: PropsWithChildren<{ title: string; layoutProps?: LayoutProps }>) => {
  return (
    <Layout {...layoutProps}>
      <Text category="h6" style={styles.title}>
        {title}
      </Text>
      {children}
    </Layout>
  );
};

export default DetailSection;
