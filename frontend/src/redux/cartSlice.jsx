import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.price.totalPrice += newItem.price.newPrice;
      } else {
        state.cartItems.push({
          ...newItem,
          quantity: 1,
          price: {
            newPrice: newItem.price.newPrice,
            oldPrice: newItem.price.oldPrice,
            totalPrice: newItem.price.newPrice,
          },
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("cartTotalPrice", JSON.stringify(state.totalPrice));
    },
    deleteFromCart: (state, action) => {
      const itemToDelete = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === itemToDelete.id);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.cartItems = state.cartItems.filter((item) => item.id !== itemToDelete.id);
        } else {
          existingItem.quantity -= 1;
          existingItem.price.totalPrice -= itemToDelete.price.newPrice;
        }
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("cartTotalPrice", JSON.stringify(state.totalPrice));
    },
  },
});

export const { addToCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;
