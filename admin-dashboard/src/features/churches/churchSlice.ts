import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Churches } from "../../types/Churches";
import churchService from "./churchService";

export interface ChurchState {
    allChurches: Churches[] | null;
    userChurch: Churches | null;
    loading: boolean;
    error: string | null;
}

const initialState: ChurchState = {
    allChurches: [],
    userChurch: null,
    loading: false,
    error: null
}

export const getAllChurches = createAsyncThunk("churches/get-all", async () => {
    return churchService.getAllChurches();
});

export const getUserChurch = createAsyncThunk(
    "churches/get-user-church",
    async (churchId: string, { rejectWithValue }) => {
        try {
            return await churchService.getChurchById(churchId);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const churchSlice = createSlice({
    name: "churches",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllChurches.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllChurches.fulfilled, (state, action) => {
                state.loading = false;
                state.allChurches = action.payload;
            })
            .addCase(getAllChurches.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch churches";
            })
            .addCase(getUserChurch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserChurch.fulfilled, (state, action) => {
                state.loading = false;
                state.userChurch = action.payload;
            })
            .addCase(getUserChurch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Failed to fetch user's church";
            });
    },
});

export default churchSlice.reducer;