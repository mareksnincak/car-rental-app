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
import I18n from "i18n-js";

/**
 * TODO:
 *  - fix search
 *  - add detail
 *  - add booking
 *  - take timezone into account for date concatination
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
              label={I18n.t("screens.home.form.fromDate")}
              style={styles.inputGroupItem}
            />

            <FormikSelect
              name="fromTime"
              label={I18n.t("screens.home.form.fromTime")}
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
              label={I18n.t("screens.home.form.toDate")}
              style={styles.inputGroupItem}
            />

            <FormikSelect
              name="toTime"
              label={I18n.t("screens.home.form.toTime")}
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
            label={I18n.t("screens.home.form.driverAge")}
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
            {I18n.t("search.extendedOptions")}
          </Button>

          {expanded && (
            <Layout style={[styles.nestedContainer, styles.padded]}>
              <FormikInput
                name="query"
                label={I18n.t("vehicle.model.label")}
                placeholder={I18n.t("vehicle.model.placeholder")}
                style={[styles.fullWidth, styles.padded]}
              />

              <FormikMultiselect
                name="bodyStyle"
                label={I18n.t("vehicle.bodyStyle.label")}
                placeholder={I18n.t("vehicle.bodyStyle.placeholder")}
                values={[...BODY_STYLES]}
                valueTranslationPrefix={"vehicle.bodyStyle.type."}
                style={[styles.fullWidth, styles.padded]}
                allSelected={true}
              >
                {BODY_STYLES.map((bodyStyle) => (
                  <SelectItem
                    title={I18n.t(`vehicle.bodyStyle.type.${bodyStyle}`)}
                    key={bodyStyle}
                  />
                ))}
              </FormikMultiselect>

              <FormikMultiselect
                name="transmission"
                label={I18n.t("vehicle.transmission.label")}
                placeholder={I18n.t("vehicle.transmission.placeholder")}
                values={[...TRANSMISSION_TYPES]}
                valueTranslationPrefix={"vehicle.transmission.type."}
                style={[styles.fullWidth, styles.padded]}
                allSelected={true}
              >
                {TRANSMISSION_TYPES.map((transmission) => (
                  <SelectItem
                    title={I18n.t(`vehicle.transmission.type.${transmission}`)}
                    key={transmission}
                  />
                ))}
              </FormikMultiselect>

              <FormikMultiselect
                name="fuel"
                label={I18n.t("vehicle.fuel.label")}
                placeholder={I18n.t("vehicle.fuel.placeholder")}
                values={[...FUEL_TYPES]}
                valueTranslationPrefix={"vehicle.fuel.type."}
                style={[styles.fullWidth, styles.padded]}
                allSelected={true}
              >
                {FUEL_TYPES.map((fuel) => (
                  <SelectItem
                    title={I18n.t(`vehicle.fuel.type.${fuel}`)}
                    key={fuel}
                  />
                ))}
              </FormikMultiselect>

              <Layout style={[styles.inputGroup, styles.padded]}>
                <FormikInput
                  name="powerMin"
                  label={I18n.t("vehicle.power.min.label")}
                  placeholder={I18n.t("vehicle.power.min.placeholder")}
                  style={styles.inputGroupItem}
                  keyboardType="numeric"
                />

                <FormikInput
                  name="powerMax"
                  label={I18n.t("vehicle.power.max.label")}
                  placeholder={I18n.t("vehicle.power.max.placeholder")}
                  style={styles.inputGroupItem}
                  keyboardType="numeric"
                />
              </Layout>

              <Layout style={[styles.inputGroup, styles.padded]}>
                <FormikInput
                  name="seatsMin"
                  label={I18n.t("vehicle.seats.min.label")}
                  placeholder={I18n.t("vehicle.seats.min.placeholder")}
                  style={styles.inputGroupItem}
                  keyboardType="numeric"
                />

                <FormikInput
                  name="seatsMax"
                  label={I18n.t("vehicle.seats.max.label")}
                  placeholder={I18n.t("vehicle.seats.max.placeholder")}
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
            {I18n.t("search.search")}
          </Button>
        </Layout>
      )}
    </Formik>
  );
};

export default HomeScreen;
