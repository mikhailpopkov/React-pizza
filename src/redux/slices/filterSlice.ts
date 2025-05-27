import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type Filter = {
    name: string,
    techName: 'rating' | 'price' | 'title' | '-rating' | '-price' | '-title',
}

interface FilterSliceState {
    categoryId: number,
    sortType: Filter,
    searchValue: string
}

const initialState: FilterSliceState = {
    categoryId: 0,
    sortType: {
        name: 'популярности (сначала популярные)',
        techName: 'rating',
    },
    searchValue: '',
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId (state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSortType (state, action: PayloadAction<Filter>) {
            state.sortType = action.payload;
        },
        setSearchValue (state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        }
    }
})

export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSortType, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
