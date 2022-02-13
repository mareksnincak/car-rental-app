import moment from "moment-timezone";
import * as Localization from "expo-localization";

import { TIME_ZONE } from "@constants/date.constants";

export const combineDateTime = (date: Date, time: string) => {
  const dateString = moment(date).tz(TIME_ZONE).format("YYYY-MM-DD");

  return moment
    .tz(`${dateString} ${time}`, "YYYY-MM-DD H:mm", TIME_ZONE)
    .toDate();
};

export const toReadableDate = (date: Date | string) => {
  return moment(date).locale(Localization.locale).format("lll");
};
