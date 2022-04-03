import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TSearchParams, TVehicle } from "./vehicle.type";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Search: undefined;
  SearchResult: { searchParams: TSearchParams };
  VehicleDetail: { searchParams: TSearchParams; vehicle: TVehicle };
  CreateBooking: { searchParams: TSearchParams; vehicle: TVehicle };
  Info: {
    type?: "success" | "error";
    text: string;
    buttonText: string;
    returnType: "home" | "back";
  };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
