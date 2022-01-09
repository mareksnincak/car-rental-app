import {
  IndexPath,
  Select,
  SelectItem,
  Button,
  Icon,
  IconProps,
  Layout,
  Divider,
  TopNavigation,
} from "@ui-kitten/components";
import { RenderFCProp, RenderProp } from "@ui-kitten/components/devsupport";
import * as React from "react";
import { ImageProps, SafeAreaView, StyleSheet } from "react-native";
import { SvgProps } from "react-native-svg";

import { RootStackScreenProps } from "../types/navigation.type";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

const SearchIcon = (props: unknown) => <Icon {...props} name="search" />;

const HomeScreen = ({ navigation }: RootStackScreenProps<"Home">) => {
  const [selectedIndex, setSelectedIndex] = React.useState([
    new IndexPath(0),
    new IndexPath(1),
  ]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Button onPress={() => navigation.navigate("Detail")}>
          OPEN DETAILS
        </Button>
      </Layout>
    </SafeAreaView>
    // <View style={styles.container}>
    //   {/* <Text style={styles.title}>Tab One Test</Text>
    //   <View
    //     style={styles.separator}
    //     lightColor="#eee"
    //     darkColor="rgba(255,255,255,0.1)"
    //   /> */}
    //   <Select
    //     multiSelect={true}
    //     selectedIndex={selectedIndex}
    //     onSelect={(index) => setSelectedIndex(index as IndexPath[])}
    //     style={{
    //       flex: 1,
    //       width: "100%",
    //     }}
    //   >
    //     <SelectItem title="Option 1" />
    //     <SelectItem title="Option 2" />
    //     <SelectItem title="Option 3" />
    //   </Select>
    //   <Button accessoryRight={SearchIcon}>Vyhľadaj</Button>
    //   {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
    // </View>
  );
};

export default HomeScreen;
