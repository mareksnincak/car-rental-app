import axios, { AxiosResponse } from "axios";

import { API_URL } from "@env";
import { TCreateBookingParams } from "@ctypes/booking.type";

const axiosInstance = axios.create({
  baseURL: `${API_URL}/bookings`,
});

const createBooking = async (bookingData: TCreateBookingParams) => {
  const response: AxiosResponse<unknown> = await axiosInstance.post(
    "/",
    bookingData
  );

  return response.data;
};

export const BookingApi = {
  createBooking,
};
