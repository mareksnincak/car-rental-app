import { range } from "@utils/number.util";

export enum ESortBy {
  price = "price",
  power = "power",
}

export const TRANSMISSIONS = ["manual", "automatic"] as const;

export const FUELS = ["petrol", "diesel", "hybrid", "electric"] as const;

export const BODY_STYLES = [
  "sedan",
  "hatchback",
  "liftback",
  "combi",
  "coupe",
  "pickUp",
  "van",
] as const;

export const TIMES = [
  "6:00",
  "7:00",
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
] as const;

export const DRIVER_AGES = [...range(18, 99, 1)] as const;
