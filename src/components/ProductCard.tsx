import { View, Text, Image, Pressable } from "react-native";
import type { Product } from "../types/product";

type Props = {
  product: Product;
  onPress: () => void;
};

export default function ProductCard({ product, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={{ marginBottom: 12 }}>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 12,
          padding: 12,
          gap: 8,
        }}
      >
        <Image
          source={{ uri: product.thumbnail }}
          style={{ width: "100%", height: 160, borderRadius: 10 }}
          resizeMode="cover"
        />
        <Text style={{ fontSize: 16, fontWeight: "600" }}>{product.title}</Text>
        <Text style={{ fontSize: 14 }} numberOfLines={2}>
          {product.description}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "700" }}>
          € {product.price}
        </Text>
      </View>
    </Pressable>
  );
}
