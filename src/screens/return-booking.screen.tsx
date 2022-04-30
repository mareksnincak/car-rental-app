import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import I18n from "i18n-js";
import * as Yup from "yup";
import * as Sentry from "sentry-expo";
import axios from "axios";
import { Formik } from "formik";

import { Button, Layout, Spinner } from "@ui-kitten/components";
import { BookingsStackScreenProps } from "@ctypes/navigation.type";
import { BookingApi } from "@api/booking.api";
import FormikInput from "@components/formik/input.component";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: Dimensions.get("window").width,
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  fullWidth: { flex: 1, flexShrink: 0, flexBasis: "100%" },
  button: { marginTop: 32 },
});

const SpinnerIcon = () => <Spinner />;

const ReturnBookingScreen = ({
  navigation,
  route: {
    params: { bookingId, vehicleMileage },
  },
}: BookingsStackScreenProps<"ReturnBooking">) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Formik
      initialValues={{
        mileage: String(vehicleMileage),
      }}
      onSubmit={async ({ mileage }) => {
        try {
          setIsSubmitting(true);
          const { price } = await BookingApi.returnBooking(
            bookingId,
            Number(mileage)
          );
          return navigation.navigate("Info", {
            type: "success",
            text: I18n.t("screens.returnBooking.confirmation", {
              totalPrice: price.total,
            }),
            buttonText: I18n.t("common.returnHome"),
            returnType: "home",
          });
        } catch (err) {
          setIsSubmitting(false);

          if (
            axios.isAxiosError(err) &&
            err.response?.data?.type === "unprocessable_entity"
          ) {
            return navigation.navigate("Info", {
              type: "error",
              text: I18n.t("screens.returnBooking.invalidMileage"),
              buttonText: I18n.t("common.returnBack"),
              returnType: "back",
            });
          }

          Sentry.Native.captureException(err);

          return navigation.navigate("Info", {
            type: "error",
            text: I18n.t("error.default"),
            buttonText: I18n.t("common.returnBack"),
            returnType: "back",
          });
        }
      }}
      validateOnChange={false}
      validationSchema={Yup.object({
        mileage: Yup.number().min(0).required(),
      })}
    >
      {({ handleSubmit }) => (
        <Layout style={styles.root}>
          <FormikInput
            name="mileage"
            label={I18n.t("screens.returnBooking.form.mileage.label")}
            placeholder={I18n.t(
              "screens.returnBooking.form.mileage.placeholder"
            )}
            style={styles.fullWidth}
            keyboardType="numeric"
          />

          <Button
            style={[styles.fullWidth, styles.button]}
            onPress={handleSubmit as (event: unknown) => void}
            disabled={isSubmitting}
            accessoryRight={isSubmitting ? SpinnerIcon : undefined}
          >
            {isSubmitting
              ? undefined
              : I18n.t("screens.returnBooking.returnVehicle")}
          </Button>
        </Layout>
      )}
    </Formik>
  );
};

export default ReturnBookingScreen;
