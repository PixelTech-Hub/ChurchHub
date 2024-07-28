import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ChurchBranch } from "../../types/ChurchBranches";
import ChurchBranchService from "./branchService";

export interface ChurchBranchState {
    allChurchBranches: ChurchBranch[] | null;
    churchBranch: ChurchBranch | null;
    loading: boolean;
    error: string | null;
    posting: boolean;
    postError: string | null;
    deleting: boolean; // New state for tracking delete status
    deleteError: string | null; // New state for tracking delete errors
}

const initialState: ChurchBranchState = {
    allChurchBranches: [],
    churchBranch: null,
    loading: false,
    error: null,
    posting: false,
    postError: null,
    deleting: false,
    deleteError: null,
};

// Thunk for getting all church branches
export const getAllChurchBranches = createAsyncThunk("churches_branch/get-all", 
    async (churchId: string, { rejectWithValue }) => {
        try {
            return await ChurchBranchService.getAllChurchBranches(churchId);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// Thunk for posting a new church branch
export const postNewChurchBranch = createAsyncThunk("churches_branch/post", 
    async (branchData: ChurchBranch, { rejectWithValue }) => {
        try {
            return await ChurchBranchService.postNewChurchBranch(branchData);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// Thunk for getting a single church branch
export const getChurchBranchById = createAsyncThunk("churches_branch/get-by-id", 
    async (branchId: string, { rejectWithValue }) => {
        try {
            return await ChurchBranchService.getChurchBranchById(branchId);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// Thunk for updating a church branch
export const updateChurchBranch = createAsyncThunk("churches_branch/update", 
    async ({ branchId, branchData }: { branchId: string, branchData: Partial<ChurchBranch> }, { rejectWithValue }) => {
        try {
            return await ChurchBranchService.updateChurchBranch(branchId, branchData);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// Thunk for deleting a church branch
export const deleteChurchBranch = createAsyncThunk("churches_branch/delete", 
    async (branchId: string, { rejectWithValue }) => {
        try {
            await ChurchBranchService.deleteChurchBranch(branchId);
            return branchId;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const churchBranchSlice = createSlice({
    name: "churches_branches",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllChurchBranches.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllChurchBranches.fulfilled, (state, action) => {
                state.loading = false;
                state.allChurchBranches = action.payload;
            })
            .addCase(getAllChurchBranches.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch church branches";
            })
            .addCase(postNewChurchBranch.pending, (state) => {
                state.posting = true;
                state.postError = null;
            })
            .addCase(postNewChurchBranch.fulfilled, (state, action) => {
                state.posting = false;
                state.allChurchBranches = state.allChurchBranches ? [...state.allChurchBranches, action.payload] : [action.payload];
            })
            .addCase(postNewChurchBranch.rejected, (state, action) => {
                state.posting = false;
                state.postError = action.error.message || "Failed to post new church branch";
            })
            .addCase(getChurchBranchById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getChurchBranchById.fulfilled, (state, action) => {
                state.loading = false;
                state.churchBranch = action.payload;
            })
            .addCase(getChurchBranchById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch church branch";
            })
            .addCase(updateChurchBranch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateChurchBranch.fulfilled, (state, action) => {
                state.loading = false;
                if (state.allChurchBranches) {
                    const index = state.allChurchBranches.findIndex(branch => branch.id === action.payload.id);
                    if (index !== -1) {
                        state.allChurchBranches[index] = action.payload;
                    }
                }
            })
            .addCase(updateChurchBranch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update church branch";
            })
            .addCase(deleteChurchBranch.pending, (state) => {
                state.deleting = true;
                state.deleteError = null;
            })
            .addCase(deleteChurchBranch.fulfilled, (state, action) => {
                state.deleting = false;
                if (state.allChurchBranches) {
                    state.allChurchBranches = state.allChurchBranches.filter(branch => branch.id !== action.payload);
                }
            })
            .addCase(deleteChurchBranch.rejected, (state, action) => {
                state.deleting = false;
                state.deleteError = action.error.message || "Failed to delete church branch";
            });
    },
});

export default churchBranchSlice.reducer;
