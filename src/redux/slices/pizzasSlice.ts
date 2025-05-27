import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";


type FetcPizzas = {
    categoryUrlId: string, 
    sortUrl: string, 
    orderUrl: string, 
    searchUrl: string, 
    currentPage: number, 
}
    

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async (params: FetcPizzas) => {
        const {categoryUrlId, sortUrl, orderUrl, searchUrl, currentPage} = params;
        
        const {data} = await axios
        .get(
          `https://672b0125976a834dd0253071.mockapi.io/items?page=${currentPage}&limit=4&${categoryUrlId}&${sortUrl.replace(
            "-",
            ""
          )}&${orderUrl}&${searchUrl}`
        )
      return data as Pizzas[];
    },
  )

type Pizzas = {
    id: string, 
    title: string, 
    price: number, 
    imageUrl: string, 
    sizes: number[], 
    types: number[] 
}

interface PizzasSliceState {
    items: Pizzas[],
    status: 'loading' | 'succes' | 'error'
}

const initialState: PizzasSliceState = {
    items: [],
    status: 'loading',
}

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems (state, action: PayloadAction<Pizzas[]>) {
            state.items = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'succes';
        })
        .addCase(fetchPizzas.pending, (state) => {
            state.status  = 'loading';
            state.items = [];
        })
        .addCase(fetchPizzas.rejected, (state) => {
            state.status = 'error';
            state.items = [];
        })
    }
})

export const selectPizzas = (state: RootState) => state.pizzas;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
