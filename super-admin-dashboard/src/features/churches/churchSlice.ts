import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { Churches } from "../../types/Churches";
import churchService from "./churchService";

export interface ChurchState {
    data: Churches[] | null,
    singleChurch: Churches | null,
    loading: boolean,
    error: string | null
}

const initialState: ChurchState = {
    data: [],
    singleChurch: null,
    loading: false,
    error: ""
}

export const getAllChurches = createAsyncThunk("churches/get-all", async () => {
    return churchService.getAllChurches()
});

export const getSingleChurch = createAsyncThunk("churches/one-church", async (id: string) => {
    return churchService.getChurchById(id);
});

export const createChurch = createAsyncThunk("churches/create", async (churchData: Churches) => {
    return churchService.createChurch(churchData);
});

export const updateChurch = createAsyncThunk(
    "churches/update",
    async ({ id, churchData }: { id: string; churchData: Partial<Churches> }, { rejectWithValue }) => {
      try {
        const response = await churchService.updateChurch(id, churchData);
        return response;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );

export const deleteChurch = createAsyncThunk<string, string>("churches/delete", async (id: string) => {
    await churchService.deleteChurch(id);
    return id;  // Return the id of the deleted church
});

export const churchSlice = createSlice({
    name: "churches",
    initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getAllChurches.pending, (state) => {
                state.loading = true
                state.error = "Processing..."
            })
            .addCase(getAllChurches.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.data = action.payload
            })
            .addCase(getAllChurches.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
                state.data = []
            })
            .addCase(getSingleChurch.pending, (state) => {
                state.loading = true
                state.error = "Processing..."
            })
            .addCase(getSingleChurch.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.singleChurch = action.payload
            })
            .addCase(getSingleChurch.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
                state.singleChurch = null
            })
            .addCase(createChurch.pending, (state) => {
                state.loading = true
                state.error = "Processing..."
            })
            .addCase(createChurch.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.data = state.data ? [...state.data, action.payload] : [action.payload]
            })
            .addCase(createChurch.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(updateChurch.pending, (state) => {
                state.loading = true
                state.error = "Processing..."
            })
            .addCase(updateChurch.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.data = state.data ? state.data.map(church => 
                    church.id === action.payload.id ? action.payload : church
                ) : [action.payload]
                if (state.singleChurch && state.singleChurch.id === action.payload.id) {
                    state.singleChurch = action.payload
                }
            })
            .addCase(updateChurch.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(deleteChurch.pending, (state) => {
                state.loading = true
                state.error = "Processing..."
            })
            .addCase(deleteChurch.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.data = state.data ? state.data.filter(church => church.id !== action.payload) : []
                if (state.singleChurch && state.singleChurch.id === action.payload) {
                    state.singleChurch = null
                }
            })
            .addCase(deleteChurch.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default churchSlice.reducer;