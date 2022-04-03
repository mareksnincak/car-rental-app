import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TSearchParams, TVehicle } from "./vehicle.type";

declare global {
  namespace ReactNavigation {
    interface HomeParamList extends HomeStackParamList {}
    interface BookingsParamList extends BookingsStackParamList {}
  }
}

type TInfoScreenProps = {
  type?: "success" | "error";
  text: string;
  buttonText: string;
  returnType: "home" | "back";
};

export type HomeStackParamList = {
  Search: undefined;
  SearchResult: { searchParams: TSearchParams };
  VehicleDetail: { searchParams: TSearchParams; vehicle: TVehicle };
  CreateBooking: { searchParams: TSearchParams; vehicle: TVehicle };
  Info: TInfoScreenProps;
};

export type BookingsStackParamList = {
  BookedVehicles: undefined;
  Info: TInfoScreenProps;
};

export type HomeStackScreenProps<Screen extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, Screen>;

export type BookingsStackScreenProps<
  Screen extends keyof BookingsStackParamList
> = NativeStackScreenProps<BookingsStackParamList, Screen>;
