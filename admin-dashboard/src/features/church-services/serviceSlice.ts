import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ChurchServices } from "../../types/ChurchServices";
import ChurchService from "./churchServiceService";

export interface ChurchServiceState {
    allChurchServices: ChurchServices[] | null;
    churchService: ChurchServices | null;
    loading: boolean;
    error: string | null;
    posting: boolean;
    postError: string | null;
    deleting: boolean; // New state for tracking delete status
    deleteError: string | null; // New state for tracking delete errors
}

const initialState: ChurchServiceState = {
    allChurchServices: [],
    churchService: null,
    loading: false,
    error: null,
    posting: false,
    postError: null,
    deleting: false,
    deleteError: null,
};

// Thunk for getting all church services
export const getAllChurchServices = createAsyncThunk("churches_service/get-all", 
    async (churchId: string, { rejectWithValue }) => {
        try {
            return await ChurchService.getAllChurchServices(churchId);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// Thunk for posting a new church service
export const postNewChurchService = createAsyncThunk("churches_service/post", 
    async (serviceData: ChurchServices, { rejectWithValue }) => {
        try {
            return await ChurchService.postNewChurchService(serviceData);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// Thunk for getting a single church service
export const getChurchServiceById = createAsyncThunk("churches_service/get-by-id", 
    async (serviceId: string, { rejectWithValue }) => {
        try {
            return await ChurchService.getChurchServiceById(serviceId);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// Thunk for updating a church service
export const updateChurchService = createAsyncThunk("churches_service/update", 
    async ({ serviceId, serviceData }: { serviceId: string, serviceData: Partial<ChurchServices> }, { rejectWithValue }) => {
        try {
            return await ChurchService.updateChurchService(serviceId, serviceData);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

// Thunk for deleting a church service
export const deleteChurchService = createAsyncThunk("churches_branch/delete", 
    async (serviceId: string, { rejectWithValue }) => {
        try {
            await ChurchService.deleteChurchService(serviceId);
            return serviceId;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const churchServiceSlice = createSlice({
    name: "churches_service",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllChurchServices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllChurchServices.fulfilled, (state, action) => {
                state.loading = false;
                state.allChurchServices = action.payload;
            })
            .addCase(getAllChurchServices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch church services";
            })
            .addCase(postNewChurchService.pending, (state) => {
                state.posting = true;
                state.postError = null;
            })
            .addCase(postNewChurchService.fulfilled, (state, action) => {
                state.posting = false;
                state.allChurchServices = state.allChurchServices ? [...state.allChurchServices, action.payload] : [action.payload];
            })
            .addCase(postNewChurchService.rejected, (state, action) => {
                state.posting = false;
                state.postError = action.error.message || "Failed to post new church branch";
            })
            .addCase(getChurchServiceById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getChurchServiceById.fulfilled, (state, action) => {
                state.loading = false;
                state.churchService = action.payload;
            })
            .addCase(getChurchServiceById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch church branch";
            })
            .addCase(updateChurchService.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateChurchService.fulfilled, (state, action) => {
                state.loading = false;
                if (state.allChurchServices) {
                    const index = state.allChurchServices.findIndex(service => service.id === action.payload.id);
                    if (index !== -1) {
                        state.allChurchServices[index] = action.payload;
                    }
                }
            })
            .addCase(updateChurchService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update church branch";
            })
            .addCase(deleteChurchService.pending, (state) => {
                state.deleting = true;
                state.deleteError = null;
            })
            .addCase(deleteChurchService.fulfilled, (state, action) => {
                state.deleting = false;
                if (state.allChurchServices) {
                    state.allChurchServices = state.allChurchServices.filter(service => service.id !== action.payload);
                }
            })
            .addCase(deleteChurchService.rejected, (state, action) => {
                state.deleting = false;
                state.deleteError = action.error.message || "Failed to delete church branch";
            });
    },
});

export default churchServiceSlice.reducer;
