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
	  console.log('Login thunk started with user:', user)
	  try {
		const response = await userService.loginUser(user);
		console.log('Login response:', response)
		
		// The response already contains the data we need, no need to check for 'success'
		if (response && response.accessToken) {
		  console.log('Login successful, returning data:', response)
		  return response;  // Return the whole response, not just response.data
		} else {
		  console.log('Login failed, no accessToken in response')
		  return rejectWithValue('Login failed: No access token received');
		}
	  } catch (error) {
		console.error("Login error:", error)
		if (error instanceof Error) {
		  return rejectWithValue(error.message || 'An unexpected error occurred');
		}
		return rejectWithValue('An unexpected error occurred');
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
			localStorage.removeItem('token'); // Clear token from localStorage
		},
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
				localStorage.setItem('token', action.payload.accessToken); // Store token in localStorage
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
				state.data = null;
				state.accessToken = null;
				state.isAuthenticated = false;
			});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;