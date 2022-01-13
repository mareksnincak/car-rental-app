import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TSearchParams } from "./vehicle.type";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Home: undefined;
  SearchResult: { searchParams: TSearchParams };
  VehicleDetail: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
