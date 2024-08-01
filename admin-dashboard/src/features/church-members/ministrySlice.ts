import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ChurchMinistries } from "../../types/ChurchMinistries";
import ChurchMinistriesService from "./memberService";

export interface ChurchMinistryState {
    allChurchMinistry: ChurchMinistries[] | null;
    churchMinistry: ChurchMinistries | null;
    loading: boolean;
    error: string | null;
    posting: boolean;
    postError: string | null;
    deleting: boolean; // New state for tracking delete status
    deleteError: string | null; // New state for tracking delete errors
}

const initialState: ChurchMinistryState = {
    allChurchMinistry: [],
    churchMinistry: null,
    loading: false,
    error: null,
    posting: false,
    postError: null,
    deleting: false,
    deleteError: null,
};

// Thunk for getting all church ministries
export const getAllChurchMinistries = createAsyncThunk("churches_ministries/get-all", 
    async (churchId: string, { rejectWithValue }) => {
        try {
            return await ChurchMinistriesService.getAllChurchMinistries(churchId);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// Thunk for posting a new church ministry
export const postNewChurchMinistry = createAsyncThunk("churches_ministries/post", 
    async (ministryData: ChurchMinistries, { rejectWithValue }) => {
        try {
            return await ChurchMinistriesService.postNewChurchMinistry(ministryData);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// Thunk for getting a single church ministry
export const getChurchMinistryById = createAsyncThunk("churches_ministries/get-by-id", 
    async (ministryId: string, { rejectWithValue }) => {
        try {
            return await ChurchMinistriesService.getChurchMinistryById(ministryId);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// Thunk for updating a church ministry
export const updateChurchMinistry = createAsyncThunk("churches_ministries/update", 
    async ({ ministryId, ministryData }: { ministryId: string, ministryData: Partial<ChurchMinistries> }, { rejectWithValue }) => {
        try {
            return await ChurchMinistriesService.updateChurchMinistry(ministryId, ministryData);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// Thunk for deleting a church ministry
export const deleteChurchMinistry = createAsyncThunk("churches_ministries/delete", 
    async (ministryId: string, { rejectWithValue }) => {
        try {
            await ChurchMinistriesService.deleteChurchMinistry(ministryId);
            return ministryId;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const churchMinistrySlice = createSlice({
    name: "church_ministries",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllChurchMinistries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllChurchMinistries.fulfilled, (state, action) => {
                state.loading = false;
                state.allChurchMinistry = action.payload;
            })
            .addCase(getAllChurchMinistries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch church services";
            })
            .addCase(postNewChurchMinistry.pending, (state) => {
                state.posting = true;
                state.postError = null;
            })
            .addCase(postNewChurchMinistry.fulfilled, (state, action) => {
                state.posting = false;
                state.allChurchMinistry = state.allChurchMinistry ? [...state.allChurchMinistry, action.payload] : [action.payload];
            })
            .addCase(postNewChurchMinistry.rejected, (state, action) => {
                state.posting = false;
                state.postError = action.error.message || "Failed to post new church branch";
            })
            .addCase(getChurchMinistryById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getChurchMinistryById.fulfilled, (state, action) => {
                state.loading = false;
                state.churchMinistry = action.payload;
            })
            .addCase(getChurchMinistryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch church branch";
            })
            .addCase(updateChurchMinistry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateChurchMinistry.fulfilled, (state, action) => {
                state.loading = false;
                if (state.allChurchMinistry) {
                    const index = state.allChurchMinistry.findIndex(ministry => ministry.id === action.payload.id);
                    if (index !== -1) {
                        state.allChurchMinistry[index] = action.payload;
                    }
                }
            })
            .addCase(updateChurchMinistry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update church branch";
            })
            .addCase(deleteChurchMinistry.pending, (state) => {
                state.deleting = true;
                state.deleteError = null;
            })
            .addCase(deleteChurchMinistry.fulfilled, (state, action) => {
                state.deleting = false;
                if (state.allChurchMinistry) {
                    state.allChurchMinistry = state.allChurchMinistry.filter(ministry => ministry.id !== action.payload);
                }
            })
            .addCase(deleteChurchMinistry.rejected, (state, action) => {
                state.deleting = false;
                state.deleteError = action.error.message || "Failed to delete church branch";
            });
    },
});

export default churchMinistrySlice.reducer;
