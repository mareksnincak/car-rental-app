import React, { useEffect, useRef, useState } from "react";
import { Dimensions, ListRenderItemInfo, StyleSheet } from "react-native";
import { Text, Layout, Button, List } from "@ui-kitten/components";

import { RootStackScreenProps } from "@ctypes/navigation.type";
import { TVehicle } from "@ctypes/vehicle.type";
import { VehicleApi } from "@api/vehicle.api";
import Loader from "@components/loader.component";
import { ESortBy } from "@constants/vehicle.constant";
import { ESortDirection } from "@constants/common.constants";
import SearchResultItem from "@components/search-result/search-result-item.component";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: Dimensions.get("window").width,
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: -80,
    padding: 16,
  },
  bottomPadded: {
    paddingBottom: 16,
  },
  bottomPaddedCompact: {
    paddingBottom: 4,
  },
  fullWidth: { flex: 1, flexShrink: 0, flexBasis: "100%" },
  listItem: {
    flexDirection: "row",
  },
  bold: {
    fontWeight: "bold",
  },
  itemImage: {
    width: 100,
    height: 100,
    marginRight: 32,
  },
  detailButton: {
    flex: 2,
  },
  flex: {
    flex: 1,
  },
});

const renderItem = ({ item }: ListRenderItemInfo<TVehicle>) => (
  <SearchResultItem vehicle={item} />
);

const SearchResultScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"SearchResult">) => {
  const { searchParams } = route.params;

  const isLoading = useRef(true);
  const [vehicles, setVehicles] = useState<TVehicle[]>([]);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    isLoading.current = true;
    const { data } = await VehicleApi.search(searchParams, {
      page,
      pageSize: 10,
      sortBy: ESortBy.price,
      sortDirection: ESortDirection.ASC,
    });

    setVehicles((prevData) => [...prevData, ...data]);
    setPage((page) => page + 1);
    isLoading.current = false;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isInitialLoad = isLoading.current && page === 1;
  if (isInitialLoad) {
    return <Loader />;
  }

  if (!vehicles.length) {
    return (
      <Layout style={styles.root}>
        <Layout style={styles.container}>
          <Text style={styles.bottomPadded}>Nenašli sa žiadne vozidlá</Text>
          <Button style={styles.fullWidth} onPress={() => navigation.goBack()}>
            Zmeniť kritéria vyhľadávania
          </Button>
        </Layout>
      </Layout>
    );
  }

  return (
    <Layout style={styles.root}>
      <List
        style={styles.flex}
        data={vehicles}
        renderItem={renderItem}
        onEndReached={() => {
          if (isLoading.current) {
            return;
          }
          fetchData();
        }}
        onEndReachedThreshold={1}
        refreshing={isLoading.current}
        ListFooterComponent={
          <Loader layoutProps={{ style: styles.bottomPadded }} />
        }
      />
    </Layout>
  );
};

export default SearchResultScreen;
