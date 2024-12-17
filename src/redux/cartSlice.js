import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    { id: 1, name: "Cotton T-shirt", price: 44, quantity: 1 },
    { id: 2, name: "Cotton T-shirt", price: 44, quantity: 1 },
    { id: 3, name: "Cotton T-shirt", price: 44, quantity: 1 },
  ],
  totalPrice: 132, // Harga total awal
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity++;
        state.totalPrice += item.price;
      } else {
        state.items.push(action.payload);
        state.totalPrice += action.payload.price;
      }
    },
    removeItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {
        state.totalPrice -= state.items[itemIndex].price * state.items[itemIndex].quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    updateQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        const priceDifference = action.payload.quantity * item.price - item.quantity * item.price;
        item.quantity = action.payload.quantity;
        state.totalPrice += priceDifference;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
