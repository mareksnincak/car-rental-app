import React, { useEffect, useState } from "react";
import { Text, Layout } from "@ui-kitten/components";

import { RootStackScreenProps } from "@ctypes/navigation.type";
import { TSearchParams, TVehicle } from "@ctypes/vehicle.type";
import { VehicleApi } from "@api/vehicle.api";

const SearchResultScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"SearchResult">) => {
  const { searchParams } = route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [vehicles, setVehicles] = useState<TVehicle[]>([]);

  const fetchData = async () => {
    const { data } = await VehicleApi.search(searchParams, {
      page: 1,
      pageSize: 10,
    });

    setVehicles(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Layout style={{ flex: 1 }}>
        <Text>Loading...</Text>
      </Layout>
    );
  }

  return (
    <Layout style={{ flex: 1 }}>
      {vehicles.map((vehicle) => (
        <Text>{vehicle.model}</Text>
      ))}
    </Layout>
  );
};

export default SearchResultScreen;
