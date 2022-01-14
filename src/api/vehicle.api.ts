import axios from "axios";

import { API_URL } from "@env";
import {
  TPaginationParams,
  TSearchParams,
  TVehicle,
} from "@ctypes/vehicle.type";
import { TPaginatedAxiosResponse } from "@ctypes/axios.type";
import { serializeQueryParams } from "@utils/axios.util";

const axiosInstance = axios.create({
  baseURL: API_URL,
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
    "/vehicles",
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
