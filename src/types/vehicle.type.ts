import {
  ESortBy,
  BODY_STYLES,
  FUELS,
  TRANSMISSIONS,
} from "@constants/vehicle.constant";
import { TPaginationParams as TCommonPaginationParams } from "./common.type";

export type TTransmission = typeof TRANSMISSIONS[number];
export type TFuel = typeof FUELS[number];
export type TBodyStyle = typeof BODY_STYLES[number];

export type TVehiclePrice = {
  total: number;
  deposit: number;
};

export type TVehicle = {
  id: string;
  color: string;
  year: number;
  mileage: number;
  make: string;
  model: string;
  fuel: TFuel;
  transmission: TTransmission;
  bodyStyle: TBodyStyle;
  power: number;
  seats: number;
  doors: number;
  imageUrl: string;
  price: TVehiclePrice;
};

export type TSearchParams = {
  query?: string | null;
  toDate: Date | string;
  seatsMin?: number | null;
  seatsMax?: number | null;
  powerMin?: number | null;
  powerMax?: number | null;
  transmissions: readonly TTransmission[];
  fuels: readonly TFuel[];
  bodyStyles: readonly TBodyStyle[];
};

export type TPaginationParams = TCommonPaginationParams & {
  sortBy?: keyof typeof ESortBy;
};
