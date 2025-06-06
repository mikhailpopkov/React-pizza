import { configureStore } from '@reduxjs/toolkit';
import cart from './slices/cartSlice';
import pizzas from './slices/pizzasSlice';
import filter from './slices/filterSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizzas,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();