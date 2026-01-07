import { Button, FlatList, Image, Text, View } from "react-native";

import { useTheme } from "../theme/useTheme";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../store/slices/cartSlice";
import {
  selectCartItemCount,
  selectCartItems,
  selectCartSubtotal,
} from "../store/selectors/cartSelectors";

export default function CartScreen() {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  const items = useAppSelector(selectCartItems);
  const itemCount = useAppSelector(selectCartItemCount);
  const subtotal = useAppSelector(selectCartSubtotal);

  if (items.length === 0) {
    return (
      <View
        style={{ flex: 1, padding: 16, backgroundColor: colors.background }}
      >
        <Text style={{ fontWeight: "700", color: colors.text }}>
          Your cart is empty
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
      <Text style={{ fontSize: 16, fontWeight: "700", color: colors.text }}>
        Items: {itemCount} • Subtotal: € {subtotal.toFixed(2)}
      </Text>

      <FlatList
        data={items}
        keyExtractor={(i) => String(i.productId)}
        renderItem={({ item }) => (
          <View
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: colors.card,
              borderRadius: 12,
              padding: 12,
              gap: 10,
            }}
          >
            <Image
              source={{ uri: item.thumbnail }}
              style={{ width: "100%", height: 160, borderRadius: 10 }}
              resizeMode="cover"
            />

            <Text
              style={{ fontSize: 16, fontWeight: "700", color: colors.text }}
            >
              {item.title}
            </Text>
            <Text style={{ color: colors.mutedText }}>
              € {item.price} • Qty: {item.quantity}
            </Text>

            <View style={{ flexDirection: "row", gap: 8 }}>
              <Button
                title="-"
                onPress={() =>
                  dispatch(decrementQuantity({ productId: item.productId }))
                }
              />
              <Button
                title="+"
                onPress={() =>
                  dispatch(incrementQuantity({ productId: item.productId }))
                }
              />
              <Button
                title="Remove"
                onPress={() =>
                  dispatch(removeItem({ productId: item.productId }))
                }
              />
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
