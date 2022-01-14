import { range } from "@utils/number.util";

export enum ESortBy {
  price = "price",
  power = "power",
}

export enum ETransmission {
  manual = "manual",
  automatic = "automatic",
}

export enum EFuel {
  petrol = "petrol",
  diesel = "diesel",
  hybrid = "hybrid",
  electric = "electric",
}

export const BODY_STYLES = [
  "sedan",
  "hatchback",
  "liftback",
  "kombi",
  "kupé",
  "pick-up",
  "dodávka",
] as const;

export const TRANSMISSION_TYPES = Object.keys(ETransmission);

export const FUEL_TYPES = Object.keys(EFuel);

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
