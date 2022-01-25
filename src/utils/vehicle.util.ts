export const getFullVehicleName = ({
  model,
  make,
  year,
}: {
  model: string;
  make: string;
  year: number;
}) => {
  return [model, make, year].join(" ");
};

export default {
  getFullVehicleName,
};
