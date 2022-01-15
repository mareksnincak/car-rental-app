import React from "react";
import { Dimensions, LayoutAnimation, StyleSheet } from "react-native";
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
  DRIVER_AGES,
  FUEL_TYPES,
  TIMES,
  TRANSMISSION_TYPES,
} from "@constants/vehicle.constant";
import FormikDatepicker from "@components/formik/datepicker.component";
import { combineDateTime } from "@utils/date.util";

/**
 * TODO:
 *  - take timezone into account for date concatination
 *  - add translations / key mapping
 *  - handle exceptions
 *  - add images to backend
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    justifyContent: "center",
  },
  nestedContainer: {
    flex: 1,
    flexShrink: 0,
    flexBasis: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  fullWidth: { flex: 1, flexShrink: 0, flexBasis: "100%" },
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
  padded: {
    marginBottom: 8,
  },
});

const SearchIcon = (props: unknown) => <Icon {...props} name="search" />;
const ExpandIcon = (props: unknown) => <Icon {...props} name="chevron-down" />;
const CollapseIcon = (props: unknown) => <Icon {...props} name="chevron-up" />;

const HomeScreen = ({ navigation }: RootStackScreenProps<"Home">) => {
  const [expanded, setExpanded] = React.useState(false);

  const startOfDay = dayjs().startOf("day").toDate();
  const defaultTime = "12:00";

  return (
    <Formik
      initialValues={{
        fromDate: dayjs().add(1, "day").startOf("day").toDate(),
        toDate: dayjs().add(8, "days").startOf("day").toDate(),
        fromTime: defaultTime,
        toTime: defaultTime,
        driverAge: DRIVER_AGES[0],
        query: null,
        bodyStyle: BODY_STYLES,
        transmission: TRANSMISSION_TYPES,
        fuel: FUEL_TYPES,
        powerMin: null,
        powerMax: null,
        seatsMin: null,
        seatsMax: null,
      }}
      onSubmit={(values) => {
        const { fromDate, fromTime, toDate, toTime, ...otherValues } = values;

        navigation.navigate("SearchResult", {
          searchParams: {
            ...otherValues,
            fromDate: combineDateTime(fromDate, fromTime).toISOString(),
            toDate: combineDateTime(toDate, toTime).toISOString(),
          },
        });
      }}
      validateOnChange={false}
      validationSchema={Yup.object({
        fromDate: Yup.date().min(startOfDay).required(),
        fromTime: Yup.mixed()
          .oneOf([...TIMES])
          .required()
          .test(function () {
            const { fromDate, fromTime } = this.parent;
            if (!(fromDate && fromTime)) {
              return false;
            }

            const from = combineDateTime(fromDate, fromTime);
            return from > new Date();
          }),
        toDate: Yup.date().min(Yup.ref("fromDate")).required(),
        toTime: Yup.mixed()
          .oneOf([...TIMES])
          .required()
          .test(function () {
            const { fromDate, fromTime, toDate, toTime } = this.parent;
            if (!(fromDate && fromTime && toDate && toTime)) {
              return false;
            }

            const from = combineDateTime(fromDate, fromTime);
            const to = combineDateTime(toDate, toTime);
            return to > from;
          }),
        driverAge: Yup.number()
          .min(Number(DRIVER_AGES[0]))
          .max(Number(DRIVER_AGES[DRIVER_AGES.length - 1]))
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
        powerMin: Yup.number().min(0).nullable(),
        powerMax: Yup.number().min(Yup.ref("powerMin")).nullable(),
        seatsMin: Yup.number().min(1).nullable(),
        seatsMax: Yup.number().min(Yup.ref("seatsMin")).nullable(),
      })}
    >
      {({ handleSubmit }) => (
        <Layout style={styles.container}>
          <Layout style={[styles.inputGroup, styles.padded]}>
            <FormikDatepicker
              name="fromDate"
              label="Dátum vyzdvihnutia"
              style={styles.inputGroupItem}
            />

            <FormikSelect
              name="fromTime"
              label="Čas vyzdvihnutia"
              values={[...TIMES]}
              style={styles.inputGroupItem}
            >
              {TIMES.map((time) => (
                <SelectItem title={time} key={time} />
              ))}
            </FormikSelect>
          </Layout>

          <Layout style={[styles.inputGroup, styles.padded]}>
            <FormikDatepicker
              name="toDate"
              label="Dátum vrátenia"
              style={styles.inputGroupItem}
            />

            <FormikSelect
              name="toTime"
              label="Čas vrátenia"
              values={[...TIMES]}
              style={styles.inputGroupItem}
            >
              {TIMES.map((time) => (
                <SelectItem title={time} key={time} />
              ))}
            </FormikSelect>
          </Layout>

          <FormikSelect
            name="driverAge"
            label="Vek vodiča"
            values={[...DRIVER_AGES]}
            style={[styles.fullWidth, styles.padded]}
          >
            {DRIVER_AGES.map((age) => (
              <SelectItem title={age} key={age} />
            ))}
          </FormikSelect>

          <Button
            appearance="ghost"
            accessoryRight={expanded ? CollapseIcon : ExpandIcon}
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              setExpanded((isExpanded) => !isExpanded);
            }}
            style={{ ...styles.fullWidth, ...(!expanded && styles.padded) }}
          >
            Rozšírené vyhľadávanie
          </Button>

          {expanded && (
            <Layout style={[styles.nestedContainer, styles.padded]}>
              <FormikInput
                name="query"
                label="Model"
                placeholder="Zadajte frázu (napr. Škoda Fábia)"
                style={[styles.fullWidth, styles.padded]}
              />

              <FormikMultiselect
                name="bodyStyle"
                label="Karoséria"
                placeholder="Zvoľte typ karosérie"
                values={[...BODY_STYLES]}
                style={[styles.fullWidth, styles.padded]}
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
                style={[styles.fullWidth, styles.padded]}
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
                style={[styles.fullWidth, styles.padded]}
                allSelected={true}
              >
                {FUEL_TYPES.map((fuel) => (
                  <SelectItem title={fuel} key={fuel} />
                ))}
              </FormikMultiselect>

              <Layout style={[styles.inputGroup, styles.padded]}>
                <FormikInput
                  name="powerMin"
                  label="Výkon od (kW)"
                  placeholder="Výkon od (kW)"
                  style={styles.inputGroupItem}
                  keyboardType="numeric"
                />

                <FormikInput
                  name="powerMax"
                  label="Výkon do (kW)"
                  placeholder="Výkon do (kW)"
                  style={styles.inputGroupItem}
                  keyboardType="numeric"
                />
              </Layout>

              <Layout style={[styles.inputGroup, styles.padded]}>
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
                  style={styles.inputGroupItem}
                  keyboardType="numeric"
                />
              </Layout>
            </Layout>
          )}

          <Button
            accessoryRight={SearchIcon}
            style={styles.fullWidth}
            onPress={handleSubmit as (event: unknown) => void}
          >
            Vyhľadaj
          </Button>
        </Layout>
      )}
    </Formik>
  );
};

export default HomeScreen;
