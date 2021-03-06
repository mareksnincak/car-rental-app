import { TVehicle, TVehiclePrice } from "./vehicle.type";

export type TCreateBookingParams = {
  vehicleId: string;
  toDate: Date | string;
};

export type TBooking = {
  id: string;
  fromDate: Date | string;
  toDate: Date | string;
  vehicle: Omit<TVehicle, "price">;
  price: TVehiclePrice;
};
