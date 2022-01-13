import { AxiosResponse } from "axios";
import { TPagination } from "./common.type";

export type TPaginatedAxiosResponse<T> = AxiosResponse<{
  pagination: TPagination;
  data: T;
}>;
