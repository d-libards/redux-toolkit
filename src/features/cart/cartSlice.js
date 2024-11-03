import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';

const initialState = {
  cartItems: cartItems,
  totalAmount: 4,
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
  },
});
console.log(cartSlice);
export const { clearCart, removeItem, toggleAmount } = cartSlice.actions;

export default cartSlice.reducer;
