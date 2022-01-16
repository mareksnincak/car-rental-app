import { EFuel, ESortBy, ETransmission } from "@constants/vehicle.constant";
import { TPaginationParams as TCommonPaginationParams } from "./common.type";

export type TVehicle = {
  id: string;
  color: string;
  year: number;
  mileage: number;
  make: string;
  model: string;
  fuel: keyof typeof EFuel;
  transmission: keyof typeof ETransmission;
  power: number;
  seats: number;
  doors: number;
  imageUrl: string;
  price: {
    total: number | null;
    deposit: number | null;
  };
};

export type TSearchParams = {
  query?: string | null;
  fromDate: Date | string;
  toDate: Date | string;
  driverAge: number;
  seatsMin?: number | null;
  seatsMax?: number | null;
  powerMin?: number | null;
  powerMax?: number | null;
  transmission?: string[];
  fuel?: string[];
};

export type TPaginationParams = TCommonPaginationParams & {
  sortBy?: keyof typeof ESortBy;
};
