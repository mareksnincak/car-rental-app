import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { SelectItem, Button, Icon, Layout } from "@ui-kitten/components";
import { Formik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";

import { RootStackScreenProps } from "@ctypes/navigation.type";
import FormikInput from "@components/formik/input.component";
import FormikMultiselect from "@components/formik/multiselect.component";
import FormikSelect from "@components/formik/select.component";
import {
  BODY_STYLES,
  FUEL_TYPES,
  TIMES,
  TRANSMISSION_TYPES,
} from "@constants/vehicle.constant";
import FormikDatepicker from "@components/formik/datepicker.component";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    justifyContent: "center",
  },
  fullWidth: { flex: 1, flexShrink: 0, flexBasis: "100%" },
  button: { margin: 16 },
  inputGroup: {
    flex: 1,
    flexShrink: 0,
    flexBasis: "100%",
    flexDirection: "row",
    marginHorizontal: -8,
  },
  inputGroupItem: {
    flex: 1,
    marginHorizontal: 8,
  },
});

const SearchIcon = (props: unknown) => <Icon {...props} name="search" />;

const HomeScreen = ({ navigation }: RootStackScreenProps<"Home">) => {
  const [date, setDate] = React.useState(new Date());
  const startOfDay = dayjs().startOf("day").toDate();

  return (
    <Formik
      initialValues={{
        dateFrom: startOfDay,
        dateTo: startOfDay,
        timeFrom: TIMES[0],
        timeTo: TIMES[0],
        query: null,
        bodyStyle: BODY_STYLES,
        transmission: TRANSMISSION_TYPES,
        fuel: FUEL_TYPES,
        performanceMin: null,
        performanceMax: null,
        seatsMin: null,
        seatsMax: null,
      }}
      onSubmit={(values) => {
        console.log(values);
        navigation.navigate("SearchResult");
      }}
      validateOnChange={false}
      validationSchema={Yup.object({
        dateFrom: Yup.date().min(startOfDay).required(),
        timeFrom: Yup.mixed()
          .oneOf([...TIMES])
          .required(),
        dateTo: Yup.date().min(Yup.ref("dateFrom")).required(),
        timeTo: Yup.mixed()
          .oneOf([...TIMES])
          .required(),
        query: Yup.string().nullable(),
        bodyStyle: Yup.array()
          .of(Yup.mixed().oneOf([...BODY_STYLES]))
          .min(1)
          .required(),
        transmission: Yup.array()
          .of(Yup.mixed().oneOf([...TRANSMISSION_TYPES]))
          .min(1)
          .required(),
        fuel: Yup.array()
          .of(Yup.mixed().oneOf([...FUEL_TYPES]))
          .min(1)
          .required(),
        performanceMin: Yup.number().min(0).nullable(),
        performanceMax: Yup.number().min(Yup.ref("performanceMin")).nullable(),
        seatsMin: Yup.number().min(0).nullable(),
        seatsMax: Yup.number().min(Yup.ref("seatsMin")).nullable(),
      })}
    >
      {({ handleSubmit }) => (
        <Layout style={styles.container}>
          <Layout style={styles.inputGroup}>
            <FormikDatepicker
              name="dateFrom"
              label="Dátum vyzdvihnutia"
              style={styles.inputGroupItem}
            />

            <FormikSelect
              name="timeFrom"
              label="Čas vyzdvihnutia"
              values={[...TIMES]}
              style={styles.inputGroupItem}
            >
              {TIMES.map((time) => (
                <SelectItem title={time} key={time} />
              ))}
            </FormikSelect>
          </Layout>

          <Layout style={styles.inputGroup}>
            <FormikDatepicker
              name="dateTo"
              label="Dátum vrátenia"
              style={styles.inputGroupItem}
            />

            <FormikSelect
              name="timeTo"
              label="Čas vrátenia"
              values={[...TIMES]}
              style={styles.inputGroupItem}
            >
              {TIMES.map((time) => (
                <SelectItem title={time} key={time} />
              ))}
            </FormikSelect>
          </Layout>

          <FormikInput
            name="query"
            label="Model"
            placeholder="Zadajte frázu (napr. Škoda Fábia)"
            style={styles.fullWidth}
          />

          <FormikMultiselect
            name="bodyStyle"
            label="Karoséria"
            placeholder="Zvoľte typ karosérie"
            values={[...BODY_STYLES]}
            style={styles.fullWidth}
            allSelected={true}
          >
            {BODY_STYLES.map((bodyStyle) => (
              <SelectItem title={bodyStyle} key={bodyStyle} />
            ))}
          </FormikMultiselect>

          <FormikMultiselect
            name="transmission"
            label="Prevodovka"
            placeholder="Zvoľte typ prevodovky"
            values={[...TRANSMISSION_TYPES]}
            style={styles.fullWidth}
            allSelected={true}
          >
            {TRANSMISSION_TYPES.map((transmission) => (
              <SelectItem title={transmission} key={transmission} />
            ))}
          </FormikMultiselect>

          <FormikMultiselect
            name="fuel"
            label="Palivo"
            placeholder="Zvoľte typ paliva"
            values={[...FUEL_TYPES]}
            style={styles.fullWidth}
            allSelected={true}
          >
            {FUEL_TYPES.map((fuel) => (
              <SelectItem title={fuel} key={fuel} />
            ))}
          </FormikMultiselect>

          <Layout style={styles.inputGroup}>
            <FormikInput
              name="performanceMin"
              label="Výkon od (kW)"
              placeholder="Výkon od (kW)"
              style={styles.inputGroupItem}
              keyboardType="numeric"
            />

            <FormikInput
              name="performanceMax"
              label="Výkon do (kW)"
              placeholder="Výkon do (kW)"
              style={{ flex: 1, marginHorizontal: 8 }}
              keyboardType="numeric"
            />
          </Layout>

          <Layout style={styles.inputGroup}>
            <FormikInput
              name="seatsMin"
              label="Počet miest od"
              placeholder="Počet miest od"
              style={styles.inputGroupItem}
              keyboardType="numeric"
            />

            <FormikInput
              name="seatsMax"
              label="Počet miest do"
              placeholder="Počet miest do"
              style={{ flex: 1, marginHorizontal: 8 }}
              keyboardType="numeric"
            />
          </Layout>

          <Button
            accessoryRight={SearchIcon}
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
