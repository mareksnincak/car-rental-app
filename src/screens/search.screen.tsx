import React from "react";
import { Dimensions, LayoutAnimation, StyleSheet } from "react-native";
import { SelectItem, Button, Icon, Layout } from "@ui-kitten/components";
import { Formik } from "formik";
import * as Yup from "yup";
import I18n from "i18n-js";
import moment from "moment";

import { HomeStackScreenProps } from "@ctypes/navigation.type";
import FormikInput from "@components/formik/input.component";
import FormikMultiselect from "@components/formik/multiselect.component";
import FormikSelect from "@components/formik/select.component";
import {
  BODY_STYLES,
  FUELS,
  TIMES,
  TRANSMISSIONS,
} from "@constants/vehicle.constant";
import FormikDatepicker from "@components/formik/datepicker.component";
import { combineDateTime } from "@utils/date.util";

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

const SearchScreen = ({ navigation }: HomeStackScreenProps<"Search">) => {
  const [expanded, setExpanded] = React.useState(false);

  const startOfDay = moment().startOf("day").toDate();
  const defaultTime = "12:00";

  return (
    <Formik
      initialValues={{
        toDate: moment().add(8, "days").startOf("day").toDate(),
        toTime: defaultTime,
        query: null,
        bodyStyles: BODY_STYLES,
        transmissions: TRANSMISSIONS,
        fuels: FUELS,
        powerMin: null,
        powerMax: null,
        seatsMin: null,
        seatsMax: null,
      }}
      onSubmit={(values) => {
        const { toDate, toTime, ...otherValues } = values;

        navigation.navigate("SearchResult", {
          searchParams: {
            ...otherValues,
            toDate: combineDateTime(toDate, toTime).toISOString(),
          },
        });
      }}
      validateOnChange={false}
      validationSchema={Yup.object({
        toDate: Yup.date().min(startOfDay).required(),
        toTime: Yup.mixed()
          .oneOf([...TIMES])
          .required()
          .test(function () {
            const { toDate, toTime } = this.parent;
            if (!(toDate && toTime)) {
              return false;
            }

            const from = combineDateTime(toDate, toTime);
            return from > new Date();
          }),
        query: Yup.string().nullable(),
        bodyStyles: Yup.array()
          .of(Yup.mixed().oneOf([...BODY_STYLES]))
          .min(1)
          .required(),
        transmissions: Yup.array()
          .of(Yup.mixed().oneOf([...TRANSMISSIONS]))
          .min(1)
          .required(),
        fuels: Yup.array()
          .of(Yup.mixed().oneOf([...FUELS]))
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
              name="toDate"
              label={I18n.t("screens.search.form.toDate")}
              style={styles.inputGroupItem}
            />

            <FormikSelect
              name="toTime"
              label={I18n.t("screens.search.form.toTime")}
              values={[...TIMES]}
              style={styles.inputGroupItem}
            >
              {TIMES.map((time) => (
                <SelectItem title={time} key={time} />
              ))}
            </FormikSelect>
          </Layout>

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
                name="bodyStyles"
                label={I18n.t("vehicle.bodyStyle.label")}
                placeholder={I18n.t("vehicle.bodyStyle.placeholder")}
                values={[...BODY_STYLES]}
                valueTranslationPrefix={"vehicle.bodyStyle.values."}
                style={[styles.fullWidth, styles.padded]}
                allSelected={true}
              >
                {BODY_STYLES.map((bodyStyle) => (
                  <SelectItem
                    title={I18n.t(`vehicle.bodyStyle.values.${bodyStyle}`)}
                    key={bodyStyle}
                  />
                ))}
              </FormikMultiselect>

              <FormikMultiselect
                name="transmissions"
                label={I18n.t("vehicle.transmission.label")}
                placeholder={I18n.t("vehicle.transmission.placeholder")}
                values={[...TRANSMISSIONS]}
                valueTranslationPrefix={"vehicle.transmission.values."}
                style={[styles.fullWidth, styles.padded]}
                allSelected={true}
              >
                {TRANSMISSIONS.map((transmission) => (
                  <SelectItem
                    title={I18n.t(
                      `vehicle.transmission.values.${transmission}`
                    )}
                    key={transmission}
                  />
                ))}
              </FormikMultiselect>

              <FormikMultiselect
                name="fuels"
                label={I18n.t("vehicle.fuel.label")}
                placeholder={I18n.t("vehicle.fuel.placeholder")}
                values={[...FUELS]}
                valueTranslationPrefix={"vehicle.fuel.values."}
                style={[styles.fullWidth, styles.padded]}
                allSelected={true}
              >
                {FUELS.map((fuel) => (
                  <SelectItem
                    title={I18n.t(`vehicle.fuel.values.${fuel}`)}
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

export default SearchScreen;
