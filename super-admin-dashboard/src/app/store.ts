import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import churchReducer from "../features/churches/churchSlice"
import  ChurchStaffReducer from "../features/church-staff/staffSlice"

export const store = configureStore({
	reducer: {
		auth: authReducer,
		church: churchReducer,
		staffs: ChurchStaffReducer,
	},

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch