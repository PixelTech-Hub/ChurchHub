import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./authServices";
import { Users } from "../../types/Users";

export interface UserState {
    data: Users | null;
    accessToken: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    error: string | null;
}

const initialState: UserState = {
    data: null,
    accessToken: null,
    isLoading: false,
    isAuthenticated: false,
    error: null
}

export const login = createAsyncThunk(
    "auth/user/login",
    async (user: Users, { rejectWithValue }) => {
        try {
            const response = await userService.loginUser(user);
            if (response && response.accessToken) {
                return response;
            } else {
                return rejectWithValue('Login failed: No access token received');
            }
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message || 'An unexpected error occurred');
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);
export const signup = createAsyncThunk(
    "auth/user/singup",
    async (user: Users, { rejectWithValue }) => {
        try {
            const response = await userService.signupUser(user);
            if (response && response.accessToken) {
                return response;
            } else {
                return rejectWithValue('Login failed: No access token received');
            }
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message || 'An unexpected error occurred');
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);

export const getLoggedInUser = createAsyncThunk(
    "auth/user/getLoggedInUser",
    async (_, { rejectWithValue }) => {
        try {
            const userData = await userService.getLoggedInUser();
            return userData;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message || 'Failed to fetch user data');
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);

export const getAllChurchUsers = createAsyncThunk("auth/user/get-all", 
    async (churchId: string, { rejectWithValue }) => {
        try {
            return await userService.getAllUsers(churchId);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            localStorage.clear();
        },
        initializeFromLocalStorage: (state) => {
			const userData = localStorage.getItem('userData');
			const token = localStorage.getItem('accessToken');
			if (userData && token) {
				state.data = JSON.parse(userData);
				state.accessToken = token;
				state.isAuthenticated = true;
			}
		}
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.isAuthenticated = false;
            })
            .addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				state.data = action.payload.data;
				state.accessToken = action.payload.accessToken;
				state.isAuthenticated = true;
				localStorage.setItem('accessToken', action.payload.accessToken);
				localStorage.setItem('userData', JSON.stringify(action.payload.data));
			})
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.data = null;
                state.accessToken = null;
                state.isAuthenticated = false;
            })
            .addCase(signup.pending, (state) => {
                state.isLoading = true; 
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.data;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to post new church branch";
            })
            .addCase(getAllChurchUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllChurchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getAllChurchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to fetch church branch";
            })
            .addCase(getLoggedInUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getLoggedInUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(getLoggedInUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.data = null;
                state.isAuthenticated = false;
            });
    },
});

export const { logout, initializeFromLocalStorage } = authSlice.actions;
export default authSlice.reducer;