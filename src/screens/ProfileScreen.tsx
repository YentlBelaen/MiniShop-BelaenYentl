import { Button, Text, View } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import type { RootTabParamList } from "../types/navigation";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../theme/useTheme";
import { useAppSelector } from "../store/hooks";
import {
  selectCartItemCount,
  selectCartSubtotal,
} from "../store/selectors/cartSelectors";

type Props = BottomTabScreenProps<RootTabParamList, "Profile">;

export default function ProfileScreen({ navigation }: Props) {
  const { colors } = useTheme();

  const itemCount = useAppSelector(selectCartItemCount);
  const subtotal = useAppSelector(selectCartSubtotal);

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        gap: 12,
        backgroundColor: colors.background,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "800", color: colors.text }}>
        MiniShop – Belaen Yentl
      </Text>

      <ThemeToggle />

      <Text style={{ fontSize: 16, color: colors.text }}>
        Items in cart: {itemCount}
      </Text>
      <Text style={{ fontSize: 16, color: colors.text }}>
        Subtotal: € {subtotal.toFixed(2)}
      </Text>

      <Button title="Go to Cart" onPress={() => navigation.navigate("Cart")} />
    </View>
  );
}
