import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Button, Layout, Spinner } from "@ui-kitten/components";
import I18n from "i18n-js";
import axios from "axios";
import * as Sentry from "sentry-expo";

import { HomeStackScreenProps } from "@ctypes/navigation.type";
import { BookingApi } from "@api/booking.api";
import BookingSummary from "@components/booking-summary.component";

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
  button: {
    marginTop: 8,
  },
});

const SpinnerIcon = () => <Spinner />;

const CreateBookingScreen = ({
  navigation,
  route: {
    params: { vehicle, searchParams },
  },
}: HomeStackScreenProps<"CreateBooking">) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await BookingApi.createBooking({
        vehicleId: vehicle.id,
        toDate: searchParams.toDate,
      });

      return navigation.navigate("Info", {
        type: "success",
        text: I18n.t("screens.createBooking.confirmation"),
        buttonText: I18n.t("common.returnHome"),
        returnType: "home",
      });
    } catch (err) {
      setIsSubmitting(false);

      if (axios.isAxiosError(err) && err.response?.data?.type === "conflict") {
        return navigation.navigate("Info", {
          type: "error",
          text: I18n.t("screens.createBooking.conflict"),
          buttonText: I18n.t("common.returnHome"),
          returnType: "home",
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
  };

  return (
    <Layout style={styles.container}>
      <BookingSummary
        vehicle={vehicle}
        searchParams={searchParams}
        layoutProps={{
          style: [styles.fullWidth, styles.bottomPadded],
        }}
      />

      <Button
        style={[styles.fullWidth, styles.button]}
        onPress={handleSubmit}
        disabled={isSubmitting}
        accessoryRight={isSubmitting ? SpinnerIcon : undefined}
      >
        {isSubmitting ? undefined : I18n.t("screens.createBooking.book")}
      </Button>
    </Layout>
  );
};

export default CreateBookingScreen;
