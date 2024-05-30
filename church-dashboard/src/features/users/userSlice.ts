import { User } from "@/types/User";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./userService";

// const user = JSON.parse(localStorage.getItem("users"));

export interface UserState {
	data: User[] | null,
	loading: boolean,
	error: string | null
}

const initialState: UserState = {
	data: [],
	loading: false,
	error: ""
}


export const signup = createAsyncThunk("auth/user/register", async (user: User) => {
	try {
		return await userService.registerNewUser(user)
	} catch (error) {
		throw error

	}
})

export const login = createAsyncThunk("auth/user/login", async (user: User) => {
	try {
		return await userService.loginUser(user)
	} catch (error) {
		throw error

	}
})


export const userSlice = createSlice({
	name: "users",
	initialState: initialState,
	reducers: {
		reset: (state) => {
			state.loading = false;
			state.error = "";
		}
	},
	extraReducers(builder) {
		builder
			.addCase(signup.pending, (state) => {
				state.loading = true
				state.error = "Processing..."
			})
			.addCase(signup.fulfilled, (state, action) => {
				state.loading = false
				state.error = "Data created successfully..."
				state.data = action.payload
			})
			.addCase(signup.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.error = action.payload
				state.data = []
			})
			.addCase(login.pending, (state) => {
				state.loading = true
				state.error = "Processing..."
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false
				state.error = "Data created successfully..."
				state.data = action.payload
			})
			.addCase(login.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false
				state.error = action.payload
				state.data = []
			})

	},
})

export default userSlice.reducer;