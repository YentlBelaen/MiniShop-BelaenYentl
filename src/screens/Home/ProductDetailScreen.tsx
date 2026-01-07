import { ActivityIndicator, Button, Image, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { HomeStackParamList } from "../../types/navigation";
import { useProduct } from "../../hooks/queries/useProduct";
import { useTheme } from "../../theme/useTheme";
import { useAppDispatch } from "../../store/hooks";
import { addToCart } from "../../store/slices/cartSlice";

type Props = NativeStackScreenProps<HomeStackParamList, "ProductDetail">;

export default function ProductDetailScreen({ route }: Props) {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  const { productId } = route.params;
  const { data, isLoading, error } = useProduct(productId);

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

  if (!data) {
    return (
      <View
        style={{ flex: 1, padding: 16, backgroundColor: colors.background }}
      >
        <Text style={{ fontWeight: "700", color: colors.text }}>
          Product not found
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        gap: 12,
        backgroundColor: colors.background,
      }}
    >
      <Image
        source={{ uri: data.thumbnail }}
        style={{ width: "100%", height: 220, borderRadius: 12 }}
        resizeMode="cover"
      />

      <Text style={{ fontSize: 20, fontWeight: "700", color: colors.text }}>
        {data.title}
      </Text>
      <Text style={{ fontSize: 16, color: colors.text }}>€ {data.price}</Text>
      <Text style={{ fontSize: 14, color: colors.mutedText }}>
        {data.description}
      </Text>

      <Button
        title="Add to Cart"
        onPress={() =>
          dispatch(
            addToCart({
              productId: data.id,
              title: data.title,
              price: data.price,
              thumbnail: data.thumbnail,
            })
          )
        }
      />
    </View>
  );
}
