import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existingItem = state.items.find(
                (i) => i.productId === item.productId
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    ...item,
                    quantity: 1,
                });
            }
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                (item) => item.productId !== action.payload
            );
        },

        updateQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const item = state.items.find(i => i.productId === productId);
            if (item) item.quantity = quantity;
        },

        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;