import { ChurchService } from "@/types/ChurchService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { ChurchMinistry } from "@/types/ChurchMinistry";
import ChurchMinistryService from "./church-ministry";




export interface ChurchMinistryState {
	data: ChurchMinistry[] | null,
	loading: boolean,
	error: string | null

}


const initialState: ChurchMinistryState = {
	data: [],
	loading: false,
	error: ""
}

export const createNewChurchMinistry = createAsyncThunk(
	'church-ministry/post',
	async (data: ChurchMinistry) => {
		try {
			const response = await ChurchMinistryService.createNewChurchMinistry(data);
			return response.data; // Assuming the API response contains the created sermon data
		} catch (error) {
			throw error;
		}
	}
);

export const getAllChurchMinistries = createAsyncThunk("church-ministries/get-all", async () => {
	return ChurchMinistryService.getChurchMinistries()
});

export const DeleteChurchMinistryById = createAsyncThunk(
	"church-ministry/delete",
	async (churchMinistryId) => {
		await ChurchMinistryService.deleteChurchMinistry(churchMinistryId);
		return churchMinistryId;
	}
);

export const updateChurchMinistry = createAsyncThunk(
	"church-service/update",
	async ({ id, updatedData }: { id: string, updatedData: Partial<ChurchService> }) => {
		await ChurchMinistryService.updateChurchMinistryById(id, updatedData);
		return { id, updatedData };
	}
);

export const churchMinistrySlice = createSlice({
	name: "church-ministries",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(createNewChurchMinistry.pending, (state) => {
				state.loading = true
				state.error = "Processing..."
			})
			.addCase(createNewChurchMinistry.fulfilled, (state, action) => {
				state.loading = false
				state.error = "Data created successfully..."
				state.data = action.payload
			})
			.addCase(createNewChurchMinistry.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.error = action.payload
				state.data = []
			})
			.addCase(getAllChurchMinistries.pending, (state) => {
				state.loading = true
				state.error = "Processing..."
			})
			.addCase(getAllChurchMinistries.fulfilled, (state, action) => {
				state.loading = false
				state.error = "Data created successfully..."
				state.data = action.payload
			})
			.addCase(getAllChurchMinistries.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.error = action.payload
				state.data = []
			})
			.addCase(updateChurchMinistry.pending, (state) => {
				state.loading = true
				state.error = "Processing..."
			})
			.addCase(updateChurchMinistry.fulfilled, (state, action) => {
				state.loading = false;
				state.error = "Insight successfully updated...";
				// Update the data with the new sermon information
				const { id, updatedData } = action.payload;
				if (state.data) {
					const updatedIndex = state.data.findIndex(insight => insight.id === id);
					if (updatedIndex !== -1) {
						state.data[updatedIndex] = { ...state.data[updatedIndex], ...updatedData };
					}
				}
			})
			.addCase(updateChurchMinistry.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.error = action.payload
				state.data = []
			})
			.addCase(DeleteChurchMinistryById.pending, (state) => {
				state.loading = true
				state.error = "Processing..."
			})
			.addCase(DeleteChurchMinistryById.fulfilled, (state) => {
				state.loading = false
				state.error = "Data created successfully..."
				state.data = []
			})
			.addCase(DeleteChurchMinistryById.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.error = action.payload
				state.data = []
			})
	},
})

export default churchMinistrySlice.reducer;