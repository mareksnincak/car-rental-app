import dayjs from "dayjs";
import customParseFormatPlugin from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormatPlugin);

export const combineDateTime = (date: Date, time: string) => {
  const dateString = dayjs(date).format("YYYY-MM-DD");
  return dayjs(`${dateString} ${time}`, "YYYY-MM-DD H:mm").toDate();
};
