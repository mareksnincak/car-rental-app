import React from "react";
import I18n from "i18n-js";
import { LayoutProps } from "@ui-kitten/components";

import DetailSection from "./detail-section.component";
import Attribute from "./attribute.component";
import { toReadableDate } from "@utils/date.util";
import { TSearchParams, TVehicle } from "@ctypes/vehicle.type";

const BookingSummary = ({
  vehicle,
  searchParams,
  layoutProps,
}: {
  vehicle: TVehicle;
  searchParams: TSearchParams;
  layoutProps?: LayoutProps;
}) => {
  return (
    <DetailSection
      layoutProps={layoutProps}
      title={I18n.t("screens.vehicleDetail.summary")}
    >
      <Attribute
        label={I18n.t("screens.vehicleDetail.bookingDate")}
        value={toReadableDate(searchParams.fromDate)}
      />
      <Attribute
        label={I18n.t("screens.vehicleDetail.returnDate")}
        value={toReadableDate(searchParams.toDate)}
      />
      <Attribute
        label={I18n.t("screens.vehicleDetail.deposit")}
        value={`${vehicle.price.deposit} €`}
      />
      <Attribute
        label={I18n.t("screens.vehicleDetail.price")}
        value={`${vehicle.price.total} €`}
      />
    </DetailSection>
  );
};

export default BookingSummary;
