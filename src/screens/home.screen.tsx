import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import {
  IndexPath,
  Select,
  SelectItem,
  Button,
  Icon,
  Layout,
  Input,
  Text,
} from "@ui-kitten/components";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";

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

const transmissions = ["manuálna", "automatická"];

const getSelectedValues = (values: unknown[], indexPaths: IndexPath[]) => {
  return indexPaths.map((indexPath) => values[indexPath.row]);
};

const HomeScreen = ({ navigation }: RootStackScreenProps<"Home">) => {
  const [selectedIndex, setSelectedIndex] = React.useState(
    generateIndexPathArray(2)
  );

  return (
    <Formik
      initialValues={{ query: "", transmission: [...transmissions] }}
      onSubmit={(values) => {
        console.log(values);
        navigation.navigate("SearchResult");
      }}
      validateOnChange={false}
      validationSchema={Yup.object({
        query: Yup.string(),
        transmission: Yup.array()
          .of(Yup.mixed().oneOf(transmissions))
          .min(1)
          .required(),
      })}
    >
      {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
        <Layout style={styles.container}>
          <Input
            label="Model"
            placeholder="Zadajte frázu (napr. Škoda Fábia)"
            onChangeText={handleChange("query")}
            value={values.query}
            style={styles.select}
            status={errors.query ? "danger" : "primary"}
          />

          <Select
            label="Typ prevodovky"
            placeholder="Zvoľte aspoň 1 možnosť"
            multiSelect={true}
            selectedIndex={selectedIndex}
            onSelect={(_index) => {
              const index = _index as IndexPath[];
              const selectedValues = getSelectedValues(transmissions, index);

              setSelectedIndex(index);
              setFieldValue("transmission", selectedValues);
            }}
            value={values.transmission.join(", ")}
            style={styles.select}
            status={errors.transmission ? "danger" : "primary"}
          >
            {transmissions.map((transmission) => (
              <SelectItem title={transmission} key={transmission} />
            ))}
          </Select>

          <Button
            accessoryRight={SearchIcon}
            // onPress={() => navigation.navigate("SearchResult")}
            onPress={handleSubmit as (event: unknown) => void}
            style={styles.button}
          >
            Vyhľadaj
          </Button>
        </Layout>
      )}
    </Formik>
  );
};

export default HomeScreen;
