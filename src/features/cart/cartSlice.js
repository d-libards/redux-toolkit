import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toggleModal } from '../modal/modalSlice';

const url = 'https://www.course-api.com/react-useReducer-cart-project';

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalPrice: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(toggleModal());
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
      console.error(error);
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },
});
export const { clearCart, removeItem, toggleAmount, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
