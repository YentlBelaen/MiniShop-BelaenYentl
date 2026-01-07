import { ActivityIndicator, FlatList, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { HomeStackParamList } from "../../types/navigation";
import { useProducts } from "../../hooks/queries/useProducts";
import ProductCard from "../../components/ProductCard";
import { useTheme } from "../../theme/useTheme";

type Props = NativeStackScreenProps<HomeStackParamList, "ProductList">;

export default function ProductListScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { data, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator color={colors.text} />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{ flex: 1, padding: 16, backgroundColor: colors.background }}
      >
        <Text style={{ fontWeight: "700", color: colors.text }}>
          Something went wrong
        </Text>
        <Text style={{ color: colors.mutedText }}>
          {error instanceof Error ? error.message : "Unknown error"}
        </Text>
      </View>
    );
  }

  const products = data?.products ?? [];

  if (products.length === 0) {
    return (
      <View
        style={{ flex: 1, padding: 16, backgroundColor: colors.background }}
      >
        <Text style={{ fontWeight: "700", color: colors.text }}>
          No products found
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: colors.background }}>
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
