import { View, Text, Button } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<HomeStackParamList, "ProductList">;

export default function ProductListScreen({ navigation }: Props) {
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text>Product List</Text>
      <Button
        title="Go to Product #1"
        onPress={() => navigation.navigate("ProductDetail", { productId: 1 })}
      />
    </View>
  );
}
