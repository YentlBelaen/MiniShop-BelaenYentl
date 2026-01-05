import { View, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<HomeStackParamList, "ProductDetail">;

export default function ProductDetailScreen({ route }: Props) {
  return (
    <View style={{ padding: 16 }}>
      <Text>Product Detail</Text>
      <Text>productId: {route.params.productId}</Text>
    </View>
  );
}
