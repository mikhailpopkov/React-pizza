import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async (params) => {
        const {categoryUrlId, sortUrl, orderUrl, searchUrl, currentPage} = params;
        
        const {data} = await axios
        .get(
          `https://672b0125976a834dd0253071.mockapi.io/items?page=${currentPage}&limit=4&${categoryUrlId}&${sortUrl.replace(
            "-",
            ""
          )}&${orderUrl}&${searchUrl}`
        )
      return data;
    },
  )

const initialState = {
    items: [],
    status: 'loading',
}

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems (state, action) {
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

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
