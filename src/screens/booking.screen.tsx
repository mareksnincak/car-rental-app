import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Button, Layout } from "@ui-kitten/components";
import { Formik } from "formik";
import * as Yup from "yup";
import I18n from "i18n-js";

import { RootStackScreenProps } from "@ctypes/navigation.type";
import FormikInput from "@components/formik/input.component";
import { BookingApi } from "@api/booking.api";

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
  padded: {
    marginBottom: 8,
  },
  button: {
    marginTop: 8,
  },
});

const BookingScreen = ({
  navigation,
  route: {
    params: { vehicle, searchParams },
  },
}: RootStackScreenProps<"Booking">) => {
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

        navigation.navigate("Home");
      }}
      validateOnChange={false}
      validationSchema={Yup.object({
        name: Yup.string().required(),
        idNumber: Yup.string().required(),
        email: Yup.string().email().required(),
      })}
    >
      {({ handleSubmit }) => (
        <Layout style={styles.container}>
          <FormikInput
            name="name"
            label={I18n.t("screens.booking.form.name.label")}
            placeholder={I18n.t("screens.booking.form.name.placeholder")}
            style={[styles.fullWidth, styles.padded]}
          />
          <FormikInput
            name="idNumber"
            label={I18n.t("screens.booking.form.idNumber.label")}
            placeholder={I18n.t("screens.booking.form.idNumber.placeholder")}
            style={[styles.fullWidth, styles.padded]}
          />
          <FormikInput
            name="email"
            label={I18n.t("screens.booking.form.email.label")}
            placeholder={I18n.t("screens.booking.form.email.placeholder")}
            style={[styles.fullWidth, styles.padded]}
          />
          <Button
            style={[styles.fullWidth, styles.button]}
            onPress={handleSubmit as (event: unknown) => void}
          >
            {I18n.t("screens.booking.book")}
          </Button>
        </Layout>
      )}
    </Formik>
  );
};

export default BookingScreen;
