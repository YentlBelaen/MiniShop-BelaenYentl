import AsyncStorage from "@react-native-async-storage/async-storage";
import type { ThemeMode } from "../theme/colors";
import type { CartItem } from "../types/cart";

const STORAGE_KEYS = {
  themeMode: "minishop_themeMode_v1",
  cartItems: "minishop_cartItems_v1",
} as const;

export type PersistedState = {
  themeMode: ThemeMode | null;
  cartItems: CartItem[] | null;
};

export async function loadPersistedState(): Promise<PersistedState> {
  try {
    const [themeModeRaw, cartItemsRaw] = await Promise.all([
      AsyncStorage.getItem(STORAGE_KEYS.themeMode),
      AsyncStorage.getItem(STORAGE_KEYS.cartItems),
    ]);

    const themeMode = themeModeRaw
      ? (JSON.parse(themeModeRaw) as ThemeMode)
      : null;
    const cartItems = cartItemsRaw
      ? (JSON.parse(cartItemsRaw) as CartItem[])
      : null;

    return { themeMode, cartItems };
  } catch {
    return { themeMode: null, cartItems: null };
  }
}

export async function saveThemeMode(mode: ThemeMode): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.themeMode, JSON.stringify(mode));
}

export async function saveCartItems(items: CartItem[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.cartItems, JSON.stringify(items));
}
