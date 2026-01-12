import { ActivityIndicator, FlatList, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';

import type { HomeStackParamList } from '../../types/navigation';
import { useProducts } from '../../hooks/queries/useProducts';
import ProductCard from '../../components/ProductCard';
import { useTheme } from '../../theme/useTheme';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

type Props = NativeStackScreenProps<HomeStackParamList, 'ProductList'>;

export default function ProductListScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { data, isLoading, error } = useProducts();

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 300); //300ms debounce timer

  const products = data?.products ?? [];

  const filteredProducts = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    if (!q) return products;

    return products.filter((p) => {
      const hay = `${p.title} ${p.description}`.toLowerCase();
      return hay.includes(q);
    });
  }, [products, debouncedSearch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator color={colors.text} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, padding: 16, backgroundColor: colors.background }}>
        <Text style={{ fontWeight: '700', color: colors.text }}>Something went wrong</Text>
        <Text style={{ color: colors.mutedText }}>
          {error instanceof Error ? error.message : 'Unknown error'}
        </Text>
      </View>
    );
  }

return (
  <View style={{ flex: 1, padding: 16, backgroundColor: colors.background }}>
    <TextInput
      value={search}
      onChangeText={setSearch}
      placeholder="Search products..."
      placeholderTextColor={colors.mutedText}
      style={{
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.card,
        color: colors.text,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 12,
      }}
    />

    {filteredProducts.length === 0 ? (
      <Text style={{ color: colors.mutedText, textAlign: 'center', marginTop: 24 }}>
        No products found
      </Text>
    ) : (
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
          />
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    )}
  </View>
);

}
