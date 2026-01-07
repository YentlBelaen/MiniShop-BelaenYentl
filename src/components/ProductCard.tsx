import { View, Text, Image, Pressable } from "react-native";
import type { Product } from "../types/product";
import { useTheme } from "../theme/useTheme";

type Props = {
  product: Product;
  onPress: () => void;
};

export default function ProductCard({ product, onPress }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress} style={{ marginBottom: 12 }}>
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
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
        <Text style={{ fontSize: 16, fontWeight: "600", color: colors.text }}>
          {product.title}
        </Text>
        <Text
          style={{ fontSize: 14, color: colors.mutedText }}
          numberOfLines={2}
        >
          {product.description}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "700", color: colors.text }}>
          € {product.price}
        </Text>
      </View>
    </Pressable>
  );
}
