import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ChurchStaffService from "./staffServices";
import { Users } from "../../types/Users";

export interface UserState {
    singleUser: Users | null;
    allUsers: Users[];
    accessToken: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
}

const initialState: UserState = {
    singleUser: null,
    allUsers: [],
    accessToken: null,
    isLoading: false,
    isAuthenticated: false,
    error: null
}

export const createNewChurchStaff = createAsyncThunk(
    "auth/user/createNewChurchStaff",
    async (userData: Users, { rejectWithValue }) => {
        try {
            const response = await ChurchStaffService.createNewChurchStaff(userData);
            return response;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message || 'An unexpected error occurred');
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);

export const getAllChurchStaffs = createAsyncThunk(
    "auth/user/getAllChurchStaffs",
    async (_, { rejectWithValue }) => {
        try {
            return await ChurchStaffService.getAllChurchStaffs();
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const deleteChurchStaff = createAsyncThunk(
    "auth/user/deleteChurchStaff",
    async (staffId: string, { rejectWithValue }) => {
        try {
            await ChurchStaffService.deleteChurchStaff(staffId);
            return staffId;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const ChurchStaffSlice = createSlice({
    name: "church staff",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(createNewChurchStaff.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createNewChurchStaff.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allUsers.push(action.payload);
            })
            .addCase(createNewChurchStaff.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(getAllChurchStaffs.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllChurchStaffs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allUsers = action.payload;
            })
            .addCase(getAllChurchStaffs.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteChurchStaff.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteChurchStaff.fulfilled, (state, action) => {
                state.isLoading = false;
                state.allUsers = state.allUsers.filter(user => user.id !== action.payload);
            })
            .addCase(deleteChurchStaff.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const {  } = ChurchStaffSlice.actions;
export default ChurchStaffSlice.reducer;