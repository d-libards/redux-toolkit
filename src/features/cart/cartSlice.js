import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';

const initialState = {
  cartItems: cartItems,
  totalAmount: 0,
  totalPrice: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },

    toggleAmount: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);

      if (payload.toggle === 'increase') {
        cartItem.amount = cartItem.amount + 1;
      }

      if (payload.toggle === 'decrease') {
        cartItem.amount = cartItem.amount - 1;

        if (cartItem.amount <= 0) {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== payload.id
          );
        }
      }
    },

    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });

      state.totalAmount = amount;
      state.totalPrice = total.toFixed(2);
    },
  },
});
export const { clearCart, removeItem, toggleAmount, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
