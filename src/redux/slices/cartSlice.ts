import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CartSlice = {
    id: string, 
    title: string, 
    price: number, 
    imageUrl: string, 
    count: number, 
    type: string, 
    size: string 
};

interface CartSliceState {
    totalPrice: number,
    items: CartSlice[],
}

const initialState: CartSliceState = {
    totalPrice: 0,
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartSlice>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }

            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            }, 0)
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter((obj) => obj.id !== action.payload)
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find((obj) => obj.id === action.payload)
            if (findItem) {
                findItem.count--;
            }
        },
        clearCart(state) {
            state.items = [];
            state.totalPrice = 0
        }
    }
})

export const selectCart = (state: RootState) => state.cart;
export const selectCartItems = (id: string) => (state: RootState) => state.cart.items.find(obj => obj.id === id);

export const { addItem, removeItem, minusItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
