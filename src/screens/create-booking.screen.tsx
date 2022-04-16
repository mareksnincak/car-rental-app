import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Button, Divider, Layout, Spinner } from "@ui-kitten/components";
import { Formik } from "formik";
import * as Yup from "yup";
import I18n from "i18n-js";
import axios from "axios";
import * as Sentry from "sentry-expo";
import isEmail from "validator/es/lib/isEmail";

import { HomeStackScreenProps } from "@ctypes/navigation.type";
import FormikInput from "@components/formik/input.component";
import { BookingApi } from "@api/booking.api";
import BookingSummary from "@components/booking-summary.component";
import DetailSection from "@components/detail-section.component";

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
  bottomPadded: {
    marginBottom: 8,
  },
  verticalPadded: {
    marginVertical: 8,
  },
  button: {
    marginTop: 8,
  },
  divider: { marginVertical: 16 },
  driverInfo: { flexDirection: "row", flexWrap: "wrap" },
});

const SpinnerIcon = (props: unknown) => <Spinner />;

const CreateBookingScreen = ({
  navigation,
  route: {
    params: { vehicle, searchParams },
  },
}: HomeStackScreenProps<"CreateBooking">) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Formik
      initialValues={{
        name: "",
        idNumber: "",
        email: "",
      }}
      onSubmit={async (values) => {
        const { name, idNumber, email } = values;
        const { fromDate, toDate, driverAge } = searchParams;

        try {
          setIsSubmitting(true);
          await BookingApi.createBooking({
            vehicleId: vehicle.id,
            fromDate,
            toDate,
            driver: {
              name,
              age: driverAge,
              email,
              idNumber,
            },
          });
        } catch (err) {
          if (
            axios.isAxiosError(err) &&
            err.response?.data?.type === "conflict"
          ) {
            return navigation.navigate("Info", {
              type: "error",
              text: I18n.t("screens.createBooking.conflict"),
              buttonText: I18n.t("common.returnHome"),
              returnType: "home",
            });
          }

          Sentry.Native.captureException(err);
          setIsSubmitting(false);

          return navigation.navigate("Info", {
            type: "error",
            text: I18n.t("error.default"),
            buttonText: I18n.t("common.returnBack"),
            returnType: "back",
          });
        }

        navigation.navigate("Info", {
          type: "success",
          text: I18n.t("screens.createBooking.confirmation"),
          buttonText: I18n.t("common.returnHome"),
          returnType: "home",
        });
      }}
      validateOnChange={false}
      validationSchema={Yup.object({
        name: Yup.string().required(),
        idNumber: Yup.string().required(),
        email: Yup.string()
          .test((email) => (email ? isEmail(email) : false))
          .required(),
      })}
    >
      {({ handleSubmit }) => (
        <Layout style={styles.container}>
          <DetailSection
            title={I18n.t("screens.createBooking.bookingInfo")}
            layoutProps={{
              style: [styles.fullWidth, styles.driverInfo],
            }}
          >
            <FormikInput
              name="name"
              label={I18n.t("screens.createBooking.form.name.label")}
              placeholder={I18n.t(
                "screens.createBooking.form.name.placeholder"
              )}
              style={[styles.fullWidth, styles.bottomPadded]}
            />
            <FormikInput
              name="idNumber"
              label={I18n.t("screens.createBooking.form.idNumber.label")}
              placeholder={I18n.t(
                "screens.createBooking.form.idNumber.placeholder"
              )}
              style={[styles.fullWidth, styles.bottomPadded]}
            />
            <FormikInput
              name="email"
              label={I18n.t("screens.createBooking.form.email.label")}
              placeholder={I18n.t(
                "screens.createBooking.form.email.placeholder"
              )}
              style={[styles.fullWidth, styles.bottomPadded]}
            />
          </DetailSection>

          <Divider style={[styles.divider, styles.fullWidth]} />

          <BookingSummary
            vehicle={vehicle}
            searchParams={searchParams}
            layoutProps={{
              style: [styles.fullWidth, styles.bottomPadded],
            }}
          />

          <Button
            style={[styles.fullWidth, styles.button]}
            onPress={handleSubmit as (event: unknown) => void}
            disabled={isSubmitting}
            accessoryRight={isSubmitting ? SpinnerIcon : undefined}
          >
            {isSubmitting ? undefined : I18n.t("screens.createBooking.book")}
          </Button>
        </Layout>
      )}
    </Formik>
  );
};

export default CreateBookingScreen;
