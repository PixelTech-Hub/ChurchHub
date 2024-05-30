import { ChurchBranches } from "@/types/ChurchBrances";
import { ChurchService } from "@/types/ChurchService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import ChurchServiceData from "./church-serviceService";




export interface ChurchServiceState {
	data: ChurchService[] | null,
	loading: boolean,
	error: string | null

}


const initialState: ChurchServiceState = {
	data: [],
	loading: false,
	error: ""
}

export const createNewChurchService = createAsyncThunk(
	'church-service/post',
	async (data: ChurchService) => {
		try {
			const response = await ChurchServiceData.createNewChurchService(data);
			return response.data; // Assuming the API response contains the created sermon data
		} catch (error) {
			throw error;
		}
	}
);

export const getAllChurchServices = createAsyncThunk("church-services/get-all", async () => {
	return ChurchServiceData.getChurchServices()
});

export const deleteChurchService = createAsyncThunk(
	"church-service/delete",
	async (churchServiceId) => {
		await ChurchServiceData.deleteChurchService(churchServiceId);
		return churchServiceId;
	}
);

export const updateChurchService = createAsyncThunk(
	"church-service/update",
	async ({ id, updatedData }: { id: string, updatedData: Partial<ChurchBranches> }) => {
		await ChurchServiceData.updateChurchServiceById(id, updatedData);
		return { id, updatedData };
	}
);

export const churchServiceSlice = createSlice({
	name: "churchservices",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(createNewChurchService.pending, (state) => {
				state.loading = true
				state.error = "Processing..."
			})
			.addCase(createNewChurchService.fulfilled, (state, action) => {
				state.loading = false
				state.error = "Data created successfully..."
				state.data = action.payload
			})
			.addCase(createNewChurchService.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.error = action.payload
				state.data = []
			})
			.addCase(getAllChurchServices.pending, (state) => {
				state.loading = true
				state.error = "Processing..."
			})
			.addCase(getAllChurchServices.fulfilled, (state, action) => {
				state.loading = false
				state.error = "Data created successfully..."
				state.data = action.payload
			})
			.addCase(getAllChurchServices.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.error = action.payload
				state.data = []
			})
			.addCase(updateChurchService.pending, (state) => {
				state.loading = true
				state.error = "Processing..."
			})
			.addCase(updateChurchService.fulfilled, (state, action) => {
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
			.addCase(updateChurchService.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.error = action.payload
				state.data = []
			})
			.addCase(deleteChurchService.pending, (state) => {
				state.loading = true
				state.error = "Processing..."
			})
			.addCase(deleteChurchService.fulfilled, (state) => {
				state.loading = false
				state.error = "Data created successfully..."
				state.data = []
			})
			.addCase(deleteChurchService.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.error = action.payload
				state.data = []
			})
	},
})

export default churchServiceSlice.reducer;