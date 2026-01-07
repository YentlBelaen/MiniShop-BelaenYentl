import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import themeReducer from "./slices/themeSlice";
import { saveCartItems, saveThemeMode } from "./persistence";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

let saveTimeout: ReturnType<typeof setTimeout> | null = null;
let lastThemeMode: RootState["theme"]["mode"] | null = null;
let lastCartJson: string | null = null;

store.subscribe(() => {
  const state = store.getState();

  if (saveTimeout) clearTimeout(saveTimeout);

  saveTimeout = setTimeout(() => {
    if (state.theme.mode !== lastThemeMode) {
      lastThemeMode = state.theme.mode;
      void saveThemeMode(state.theme.mode);
    }

    const cartJson = JSON.stringify(state.cart.items);
    if (cartJson !== lastCartJson) {
      lastCartJson = cartJson;
      void saveCartItems(state.cart.items);
    }
  }, 250);
});
