import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '../../types/cart';

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

type AddToCartPayload = {
  productId: number;
  title: string;
  price: number;
  thumbnail: string;
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const existing = state.items.find(
        (item) => item.productId === action.payload.productId
      );

      if (existing) {
        existing.quantity += 1;
        return;
      }

      state.items.push({
        ...action.payload,
        quantity: 1,
      });
    },

    incrementQuantity: (state, action: PayloadAction<{ productId: number }>) => {
      const item = state.items.find(
        (i) => i.productId === action.payload.productId
      );
      if (item) item.quantity += 1;
    },

    decrementQuantity: (state, action: PayloadAction<{ productId: number }>) => {
      const item = state.items.find(
        (i) => i.productId === action.payload.productId
      );
      if (!item) return;

      item.quantity -= 1;
      if (item.quantity <= 0) {
        state.items = state.items.filter(
          (i) => i.productId !== action.payload.productId
        );
      }
    },

    removeItem: (state, action: PayloadAction<{ productId: number }>) => {
      state.items = state.items.filter(
        (i) => i.productId !== action.payload.productId
      );
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
} = cartSlice.actions;

export default cartSlice.reducer;
