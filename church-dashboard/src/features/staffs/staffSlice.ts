import { ChurchStaff } from "@/types/ChurchStaff";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import ChurchStaffService from "./staffService";




export interface StaffState {
	data: ChurchStaff[] | null,
	loading: boolean,
	error: string | null

}


const initialState: StaffState = {
	data: [],
	loading: false,
	error: ""
}

export const createNewChurchStaff = createAsyncThunk(
	'church-staff/post',
	async (staffData: ChurchStaff) => {
	  try {
		const response = await ChurchStaffService.createStaffData(staffData);
		return response.data; // Assuming the API response contains the created sermon data
	  } catch (error) {
		throw error;
	  }
	}
  );

export const getAllChurchStaffs = createAsyncThunk("church-staffs/get", async () => {
	return ChurchStaffService.getChurchStaffData();
});

export const deleteAChurchStaff = createAsyncThunk(
    "church-staff/delete",
    async (staffId) => {
        await ChurchStaffService.deleteChurchStaffData(staffId)
        return staffId;
    }
);

export const updateChurchStaffId = createAsyncThunk(
    "church-staff/update",
    async ({ id, updatedData }: { id: string, updatedData: Partial<ChurchStaff> }) => {
        await ChurchStaffService.updateChurchStaffData(id, updatedData);
        return { id, updatedData };
    }
);

export const ChurchStaffSlice = createSlice({
	name: "church-staffs",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(createNewChurchStaff.pending, (state) => {
				state.loading = true
				state.error = "Processing..."
			})
			.addCase(createNewChurchStaff.fulfilled, (state, action) => {
				state.loading = false
				state.error = "Data created successfully..."
				state.data = action.payload
			})
			.addCase(createNewChurchStaff.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.error = action.payload
				state.data = []
			})
			.addCase(getAllChurchStaffs.pending, (state) => {
				state.loading = true
				state.error = "Processing..."
			})
			.addCase(getAllChurchStaffs.fulfilled, (state, action) => {
				state.loading = false
				state.error = "Data created successfully..."
				state.data = action.payload
			})
			.addCase(getAllChurchStaffs.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.error = action.payload
				state.data = []
			})
			.addCase(updateChurchStaffId.pending, (state) => {
				state.loading = true
				state.error = "Processing..."
			})
			.addCase(updateChurchStaffId.fulfilled, (state, action) => {
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
			.addCase(updateChurchStaffId.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.error = action.payload
				state.data = []
			})
			.addCase(deleteAChurchStaff.pending, (state) => {
				state.loading = true
				state.error = "Processing..."
			})
			.addCase(deleteAChurchStaff.fulfilled, (state) => {
				state.loading = false
				state.error = "Data created successfully..."
				state.data = []
			})
			.addCase(deleteAChurchStaff.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.error = action.payload
				state.data = []
			})
	},
})

export default ChurchStaffSlice.reducer;