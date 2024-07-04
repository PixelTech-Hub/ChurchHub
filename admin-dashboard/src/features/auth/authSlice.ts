import { PayloadAction, createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import userService from "./authServices";
import { Users } from "../../types/Users";
import axios from "axios";

// const user = JSON.parse(localStorage.getItem("users"));

export interface UserState {
	data: Users | null,
	accessToken: string | null,
	loading: boolean,
	error: string | null
}

const initialState: UserState = {
	data: null,
	accessToken: null,
	loading: false,
	error: null
}


export const login = createAsyncThunk("auth/user/login", async (user: Users) => {
	try {
		return await userService.loginUser(user)
	}  catch (error) {
		if (axios.isAxiosError(error)) {
		  return isRejectedWithValue(error.response?.data || 'An error occurred');
		}
		return isRejectedWithValue('An unexpected error occurred');
	  }
})


export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
	  logout: (state) => {
		state.data = null;
		state.accessToken = null;
	  },
	},
	extraReducers(builder) {
	  builder
		.addCase(login.pending, (state) => {
		  state.loading = true
		  state.error = null
		})
		.addCase(login.fulfilled, (state, action: PayloadAction<{ accessToken: string; data: Users }>) => {
		  state.loading = false
		  state.error = null
		  state.data = action.payload.data
		  state.accessToken = action.payload.accessToken
		})
		.addCase(login.rejected, (state, action) => {
		  state.loading = false
		  state.error = action.payload as string
		  state.data = null
		  state.accessToken = null
		})
	},
  })

export default authSlice.reducer;