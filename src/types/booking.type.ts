export type TCreateBookingParams = {
  vehicleId: string;
  fromDate: Date | string;
  toDate: Date | string;
  driver: {
    name: string;
    age: number;
    email: string;
    idNumber: string;
  };
};
