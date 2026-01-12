import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import type { Product } from '../types/product';
import { useTheme } from '../theme/useTheme';

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
          borderRadius: 14,
          padding: 12,
        }}
      >
        <View
          style={{
            width: '100%',
            height: 140,
            borderRadius: 12,
            overflow: 'hidden',
            backgroundColor: colors.background,
            borderWidth: 1,
            borderColor: colors.border,
            marginBottom: 10,
            position: 'relative',
          }}
        >
          <Image
            source={{ uri: product.thumbnail }}
            resizeMode="contain"
            style={StyleSheet.absoluteFillObject}
          />
        </View>

        <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>
          {product.title}
        </Text>

        <Text style={{ fontSize: 13, color: colors.mutedText, marginTop: 6 }} numberOfLines={2}>
          {product.description}
        </Text>

        <Text style={{ fontSize: 16, fontWeight: '800', color: colors.text, marginTop: 10 }}>
          € {product.price.toFixed(2)}
        </Text>
      </View>
    </Pressable>
  );
}
