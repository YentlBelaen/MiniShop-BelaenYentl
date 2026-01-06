import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((sum, item) => sum + item.quantity, 0)
);

export const selectCartSubtotal = createSelector(
  [selectCartItems],
  (items) => items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
