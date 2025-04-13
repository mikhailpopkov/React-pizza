import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            state.items.push(action.payload);
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price + sum
            }, 0)
        },
        removeItem(state, action) {

        },
        clearCart(state, action) {

        }
    }
})

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
