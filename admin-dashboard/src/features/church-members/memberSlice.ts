import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ChurchMembers } from "../../types/ChurchMember";
import ChurchMemberService from "./memberService";

export interface ChurchMemberState {
    allChurchMembers: ChurchMembers[] | null;
    churchMember: ChurchMembers | null;
    loading: boolean;
    error: string | null;
    posting: boolean;
    postError: string | null;
    deleting: boolean;
    updating: boolean // New state for tracking delete status
    deleteError: string | null; // New state for tracking delete errors
}

const initialState: ChurchMemberState = {
    allChurchMembers: [],
    churchMember: null,
    loading: false,
    error: null,
    posting: false,
    postError: null,
    deleting: false,
    deleteError: null,
    updating: false
};

// Thunk for getting all church members
export const getAllChurchMembers = createAsyncThunk("church_members/get-all", 
    async (churchId: string, { rejectWithValue }) => {
        try {
            return await ChurchMemberService.getAllChurchMembers(churchId);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// Thunk for posting a new church member
export const postNewChurchMember = createAsyncThunk("church_members/post", 
    async (memberData: ChurchMembers, { rejectWithValue }) => {
        try {
            return await ChurchMemberService.postNewChurchMember(memberData);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// Thunk for getting a single church members
export const getChurchMemberById = createAsyncThunk("church_members/get-by-id", 
    async (ministryId: string, { rejectWithValue }) => {
        try {
            return await ChurchMemberService.getChurchMemberById(ministryId);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// Thunk for updating a church member
export const updateChurchMember = createAsyncThunk("church_members/update", 
    async ({ memberId, memberData }: { memberId: string, memberData: Partial<ChurchMembers> }, { rejectWithValue }) => {
        try {
            return await ChurchMemberService.updateChurchMember(memberId, memberData);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// Thunk for deleting a church member
export const deleteChurchMember = createAsyncThunk("churches_ministries/delete", 
    async (memberId: string, { rejectWithValue }) => {
        try {
            await ChurchMemberService.deleteChurchMember(memberId);
            return memberId;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const churchMemberSlice = createSlice({
    name: "church_members",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllChurchMembers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllChurchMembers.fulfilled, (state, action) => {
                state.loading = false;
                state.allChurchMembers = action.payload;
            })
            .addCase(getAllChurchMembers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch church services";
            })
            .addCase(postNewChurchMember.pending, (state) => {
                state.posting = true;
                state.postError = null;
            })
            .addCase(postNewChurchMember.fulfilled, (state, action) => {
                state.posting = false;
                state.allChurchMembers = state.allChurchMembers ? [...state.allChurchMembers, action.payload] : [action.payload];
            })
            .addCase(postNewChurchMember.rejected, (state, action) => {
                state.posting = false;
                state.postError = action.error.message || "Failed to post new church branch";
            })
            .addCase(getChurchMemberById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getChurchMemberById.fulfilled, (state, action) => {
                state.loading = false;
                state.churchMember = action.payload;
            })
            .addCase(getChurchMemberById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch church branch";
            })
            .addCase(updateChurchMember.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateChurchMember.fulfilled, (state, action) => {
                state.loading = false;
                if (state.allChurchMembers) {
                    const index = state.allChurchMembers.findIndex(member => member.id === action.payload.id);
                    if (index !== -1) {
                        state.allChurchMembers[index] = action.payload;
                    }
                }
            })
            .addCase(updateChurchMember.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update church branch";
            })
            .addCase(deleteChurchMember.pending, (state) => {
                state.deleting = true;
                state.deleteError = null;
            })
            .addCase(deleteChurchMember.fulfilled, (state, action) => {
                state.deleting = false;
                if (state.allChurchMembers) {
                    state.allChurchMembers = state.allChurchMembers.filter(member => member.id !== action.payload);
                }
            })
            .addCase(deleteChurchMember.rejected, (state, action) => {
                state.deleting = false;
                state.deleteError = action.error.message || "Failed to delete church branch";
            });
    },
});

export default churchMemberSlice.reducer;
