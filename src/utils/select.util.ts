import { IndexPath } from "@ui-kitten/components";

export const generateIndexPathArray = (length: number) => {
  return [...Array(length).keys()].map((idx) => new IndexPath(idx));
};
