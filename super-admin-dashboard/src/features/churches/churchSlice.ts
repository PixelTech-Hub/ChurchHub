import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { Churches } from "../../types/Churches";
import churchService from "./churchService";




export interface ChurchState {
	data: Churches[] | null,
	loading: boolean,
	error: string | null

}


const initialState: ChurchState = {
	data: [],
	loading: false,
	error: ""
}



export const getAllChurches = createAsyncThunk("churches/get-all", async () => {
	return churchService.getAllChurches()
});

export const getSingleChurch = createAsyncThunk("churches/one-church", async (id: string) => {
    return churchService.getChurchById(id);
})


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
				state.error = "Data created successfully..."
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
                state.error = "Single church fetched successfully..."
                state.data = action.payload
            })
            .addCase(getSingleChurch.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
                state.data = null // Reset singleInsight on rejection
            })
	},
})

export default churchSlice.reducer;