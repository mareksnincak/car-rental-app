import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { SelectItem, Button, Icon, Layout } from "@ui-kitten/components";
import { Formik } from "formik";
import * as Yup from "yup";

import { RootStackScreenProps } from "@ctypes/navigation.type";
import { generateIndexPathArray } from "@utils/select.util";
import FormikInput from "@components/formik/input.component";
import FormikMultiselect from "@components/formik/multiselect.component";

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
      {({ handleSubmit }) => (
        <Layout style={styles.container}>
          <FormikInput
            name="query"
            label="Model"
            placeholder="Zadajte frázu (napr. Škoda Fábia)"
            style={styles.select}
          />

          <FormikMultiselect
            name="transmission"
            label="Typ prevodovky"
            placeholder="Zvoľte aspoň 1 možnosť"
            values={transmissions}
            style={styles.select}
            allSelected={true}
          >
            {transmissions.map((transmission) => (
              <SelectItem title={transmission} key={transmission} />
            ))}
          </FormikMultiselect>

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
