import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ChurchBranch } from "../../types/ChurchBranches";
import ChurchBranchService from "./branchService";

export interface ChurchBranchState {
    allChurchBranches: ChurchBranch[] | null;
    churchBranch: ChurchBranch | null;
    loading: boolean;
    error: string | null;
    posting: boolean; // New state for tracking post status
    postError: string | null; // New state for tracking post errors
}

const initialState: ChurchBranchState = {
    allChurchBranches: [],
    churchBranch: null,
    loading: false,
    error: null,
    posting: false,
    postError: null,
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
            });
    },
});

export default churchBranchSlice.reducer;
