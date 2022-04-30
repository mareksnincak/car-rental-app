import axios from "axios";

import {
  TPaginationParams,
  TSearchParams,
  TVehicle,
} from "@ctypes/vehicle.type";
import { TPaginatedAxiosResponse } from "@ctypes/axios.type";
import { serializeQueryParams } from "@utils/axios.util";

const axiosInstance = axios.create({
  baseURL: `${process.env.API_URL}/vehicles`,
  headers: {
    "Api-Key": process.env.API_KEY ?? "",
  },
});

const search = async (
  searchParams: TSearchParams,
  pagination: TPaginationParams
) => {
  const params = {
    ...searchParams,
    ...pagination,
  };

  const response: TPaginatedAxiosResponse<TVehicle[]> = await axiosInstance.get(
    "/",
    {
      params,
      paramsSerializer: serializeQueryParams,
    }
  );

  return response.data;
};

export const VehicleApi = {
  search,
};
