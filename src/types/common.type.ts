import { ESortDirection } from "@constants/common.constants";

export type TPagination = {
  page: number;
  pageSize: number;
  totalRecordCount: number;
};

export type TPaginationParams = {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: ESortDirection;
};
