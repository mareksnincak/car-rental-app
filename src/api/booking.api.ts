import axios, { AxiosResponse } from "axios";

import { TCreateBookingParams } from "@ctypes/booking.type";
import { TBooking } from "@ctypes/booking.type";

const axiosInstance = axios.create({
  baseURL: `${process.env.API_URL}/bookings`,
  headers: {
    "Api-Key": process.env.API_KEY ?? "",
  },
});

const createBooking = async (bookingData: TCreateBookingParams) => {
  const response: AxiosResponse<unknown> = await axiosInstance.post(
    "/",
    bookingData
  );

  return response.data;
};

const getCurrentBookings = async () => {
  const response: AxiosResponse<{ data: TBooking[] }> = await axiosInstance.get(
    "/current"
  );

  return response.data;
};

const returnBooking = async (bookingId: string, mileage: number) => {
  const response: AxiosResponse<TBooking> = await axiosInstance.post(
    "/returns",
    {
      id: bookingId,
      mileage,
    }
  );

  return response.data;
};

export const BookingApi = {
  createBooking,
  getCurrentBookings,
  returnBooking,
};
