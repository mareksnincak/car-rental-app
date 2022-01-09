import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import {
  IndexPath,
  Select,
  SelectItem,
  Button,
  Icon,
  Layout,
} from "@ui-kitten/components";

import { RootStackScreenProps } from "@ctypes/navigation.type";
import { generateIndexPathArray } from "@utils/select.util";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    justifyContent: "center",
  },
  select: { flex: 1, flexShrink: 0, flexBasis: "100%" },
  button: { margin: 16 },
});

const SearchIcon = (props: unknown) => <Icon {...props} name="search" />;

const transmissions = ["Manuálna", "Automatická"];

const getSelectDisplayValues = (values: unknown[], indexPaths: IndexPath[]) => {
  const selectedValues = indexPaths.map((indexPath) => values[indexPath.row]);

  return selectedValues.join(", ");
};

const HomeScreen = ({ navigation }: RootStackScreenProps<"Home">) => {
  const [selectedIndex, setSelectedIndex] = React.useState(
    generateIndexPathArray(2)
  );

  const [selectDisplayValue, setSelectDisplayValue] = React.useState(
    getSelectDisplayValues(transmissions, selectedIndex)
  );

  const handleSelect = (index: IndexPath[]) => {
    const displayValues = getSelectDisplayValues(transmissions, index);

    setSelectedIndex(index);
    setSelectDisplayValue(displayValues);
  };

  return (
    <Layout style={styles.container}>
      <Select
        placeholder="Zvoľte aspoň 1 možnosť"
        label="Typ prevodovky:"
        multiSelect={true}
        selectedIndex={selectedIndex}
        onSelect={(index) => handleSelect(index as IndexPath[])}
        value={selectDisplayValue}
        style={styles.select}
      >
        {transmissions.map((transmission) => (
          <SelectItem title={transmission} key={transmission} />
        ))}
      </Select>

      <Button
        accessoryRight={SearchIcon}
        onPress={() => navigation.navigate("SearchResult")}
        style={styles.button}
      >
        Vyhľadaj
      </Button>
    </Layout>
  );
};

export default HomeScreen;
