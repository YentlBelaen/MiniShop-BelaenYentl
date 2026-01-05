import { ActivityIndicator, FlatList, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { HomeStackParamList } from "../../types/navigation";
import { useProducts } from "../../hooks/queries/useProducts";
import ProductCard from "../../components/ProductCard";

type Props = NativeStackScreenProps<HomeStackParamList, "ProductList">;

export default function ProductListScreen({ navigation }: Props) {
  const { data, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ fontWeight: "700" }}>Something went wrong</Text>
        <Text>{error instanceof Error ? error.message : "Unknown error"}</Text>
      </View>
    );
  }

  const products = data?.products ?? [];

  if (products.length === 0) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ fontWeight: "700" }}>No products found</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate("ProductDetail", { productId: item.id })
            }
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
