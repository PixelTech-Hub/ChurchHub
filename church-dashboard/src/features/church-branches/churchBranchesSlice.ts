import { ChurchBranches } from "@/types/ChurchBrances";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import ChurchBranchService from "./churchBranchService";




export interface ChurchBranchState {
	data: ChurchBranches[] | null,
	loading: boolean,
	error: string | null

}


const initialState: ChurchBranchState = {
	data: [],
	loading: false,
	error: ""
}

export const createNewChurchBranch = createAsyncThunk(
	'church-branch/post',
	async (data: ChurchBranches) => {
		try {
			const response = await ChurchBranchService.createNewChurchBranch(data);
			return response.data; // Assuming the API response contains the created sermon data
		} catch (error) {
			throw error;
		}
	}
);

export const getAllChurchBranches = createAsyncThunk("church-branch/get-all", async () => {
	return ChurchBranchService.getChurchBranchesAll()
});

export const getSingleChurchBranch = createAsyncThunk("church-branch/get-one", async (branchId: string) => {
	return ChurchBranchService.getChurchBranchId(branchId);
})

export const deleteChurchBranch = createAsyncThunk(
	"church-branch/delete",
	async (churchBranchId) => {
		await ChurchBranchService.deleteChurchBranches(churchBranchId);
		return churchBranchId;
	}
);

export const updateChurchBranch = createAsyncThunk(
	"insight/update",
	async ({ id, updatedData }: { id: string, updatedData: Partial<ChurchBranches> }) => {
		await ChurchBranchService.updateChurchBranchById(id, updatedData);
		return { id, updatedData };
	}
);

export const churchBranchSlice = createSlice({
	name: "churchbranches",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(createNewChurchBranch.pending, (state) => {
				state.loading = true
				state.error = "Processing..."
			})
			.addCase(createNewChurchBranch.fulfilled, (state, action) => {
				state.loading = false
				state.error = "Data created successfully..."
				state.data = action.payload
			})
			.addCase(createNewChurchBranch.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.error = action.payload
				state.data = []
			})
			.addCase(getAllChurchBranches.pending, (state) => {
				state.loading = true
				state.error = "Processing..."
			})
			.addCase(getAllChurchBranches.fulfilled, (state, action) => {
				state.loading = false
				state.error = "Data created successfully..."
				state.data = action.payload
			})
			.addCase(getAllChurchBranches.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.error = action.payload
				state.data = []
			})
			.addCase(getSingleChurchBranch.pending, (state) => {
				state.loading = true
				state.error = "Processing..."
			})
			.addCase(getSingleChurchBranch.fulfilled, (state, action) => {
				state.loading = false
				state.error = "Single insight fetched successfully..."
				state.data = action.payload
			})
			.addCase(getSingleChurchBranch.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.error = action.payload
				state.data = null // Reset singleInsight on rejection
			})
			.addCase(updateChurchBranch.pending, (state) => {
				state.loading = true
				state.error = "Processing..."
			})
			.addCase(updateChurchBranch.fulfilled, (state, action) => {
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
			.addCase(updateChurchBranch.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.error = action.payload
				state.data = []
			})
			.addCase(deleteChurchBranch.pending, (state) => {
				state.loading = true
				state.error = "Processing..."
			})
			.addCase(deleteChurchBranch.fulfilled, (state) => {
				state.loading = false
				state.error = "Data created successfully..."
				state.data = []
			})
			.addCase(deleteChurchBranch.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.error = action.payload
				state.data = []
			})
	},
})

export default churchBranchSlice.reducer;