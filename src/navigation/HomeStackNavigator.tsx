import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type { HomeStackParamList } from "../types/navigation";
import ProductListScreen from "../screens/Home/ProductListScreen";
import ProductDetailScreen from "../screens/Home/ProductDetailScreen";
import { useTheme } from "../theme/useTheme";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTitleStyle: { color: colors.text },
        headerTintColor: colors.text,
      }}
    >
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
