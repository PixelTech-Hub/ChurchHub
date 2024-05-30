import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import insightsService from "./insightService";
import { Insight } from "@/types/Insight";




export interface InsightState {
	data: Insight[] | null,
	loading: boolean,
	error: string | null

}


const initialState: InsightState = {
	data: [],
	loading: false,
	error: ""
}

export const createNewInsight = createAsyncThunk(
	'insight/post',
	async (insightData: Insight) => {
	  try {
		const response = await insightsService.createInsightData(insightData);
		return response.data; // Assuming the API response contains the created sermon data
	  } catch (error) {
		throw error;
	  }
	}
  );

export const getAllInsights = createAsyncThunk("insights", async () => {
	return insightsService.getInsightData();
});

export const deleteInsight = createAsyncThunk(
    "insight/delete",
    async (insightId) => {
        await insightsService.deleteInsightData(insightId);
        return insightId;
    }
);

export const updateInsight = createAsyncThunk(
    "insight/update",
    async ({ id, updatedData }: { id: string, updatedData: Partial<Insight> }) => {
        await insightsService.updateInsightData(id, updatedData);
        return { id, updatedData };
    }
);

export const insightsSlice = createSlice({
	name: "insights",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(createNewInsight.pending, (state) => {
				state.loading = true
				state.error = "Processing..."
			})
			.addCase(createNewInsight.fulfilled, (state, action) => {
				state.loading = false
				state.error = "Data created successfully..."
				state.data = action.payload
			})
			.addCase(createNewInsight.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.error = action.payload
				state.data = []
			})
			.addCase(getAllInsights.pending, (state) => {
				state.loading = true
				state.error = "Processing..."
			})
			.addCase(getAllInsights.fulfilled, (state, action) => {
				state.loading = false
				state.error = "Data created successfully..."
				state.data = action.payload
			})
			.addCase(getAllInsights.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.error = action.payload
				state.data = []
			})
			.addCase(updateInsight.pending, (state) => {
				state.loading = true
				state.error = "Processing..."
			})
			.addCase(updateInsight.fulfilled, (state, action) => {
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
			.addCase(updateInsight.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.error = action.payload
				state.data = []
			})
			.addCase(deleteInsight.pending, (state) => {
				state.loading = true
				state.error = "Processing..."
			})
			.addCase(deleteInsight.fulfilled, (state) => {
				state.loading = false
				state.error = "Data created successfully..."
				state.data = []
			})
			.addCase(deleteInsight.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.error = action.payload
				state.data = []
			})
	},
})

export default insightsSlice.reducer;