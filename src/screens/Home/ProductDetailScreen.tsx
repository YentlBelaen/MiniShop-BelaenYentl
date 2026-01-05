import { ActivityIndicator, Image, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { HomeStackParamList } from "../../types/navigation";
import { useProduct } from "../../hooks/queries/useProduct";

type Props = NativeStackScreenProps<HomeStackParamList, "ProductDetail">;

export default function ProductDetailScreen({ route }: Props) {
  const { productId } = route.params;
  const { data, isLoading, error } = useProduct(productId);

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

  if (!data) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ fontWeight: "700" }}>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Image
        source={{ uri: data.thumbnail }}
        style={{ width: "100%", height: 220, borderRadius: 12 }}
        resizeMode="cover"
      />
      <Text style={{ fontSize: 20, fontWeight: "700" }}>{data.title}</Text>
      <Text style={{ fontSize: 16 }}>€ {data.price}</Text>
      <Text style={{ fontSize: 14 }}>{data.description}</Text>
    </View>
  );
}
