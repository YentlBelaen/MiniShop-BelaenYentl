import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../types/navigation";
import ProductListScreen from "../screens/Home/ProductListScreen";
import ProductDetailScreen from "../screens/Home/ProductDetailScreen";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: "Products" }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: "Product" }}
      />
    </Stack.Navigator>
  );
}
