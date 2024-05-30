import { Account } from "@/types/Account";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import AccountSlicde from "./accountService";

export interface InitialAccountState {
	data: Account[] | null,
	loading: boolean,
	error: string | null

}


const initialState: InitialAccountState = {
	data: [],
	loading: false,
	error: ""
}

export const getAccountBalance = createAsyncThunk("acccount", async () => {
	return AccountSlicde.getAccount()
})




export const accountSlice = createSlice({
	name: "accounts",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getAccountBalance.pending, (state) => {
				state.loading = true
				state.error = "Processing..."
			})
			.addCase(getAccountBalance.fulfilled, (state, action) => {
				state.loading = false
				state.error = "Data created successfully..."
				state.data = action.payload
			})
			.addCase(getAccountBalance.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.error = action.payload
				state.data = []
			})
	},
})

export default accountSlice.reducer;