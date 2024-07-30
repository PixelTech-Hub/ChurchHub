import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import churchReducer from "../features/churches/churchSlice"
import churchBranchReducer  from "../features/church-branches/branchSlice"
import churchServiceReducer  from "../features/church-services/serviceSlice"

export const store = configureStore({
	reducer: {
		auth: authReducer,
		church: churchReducer,
		branch: churchBranchReducer,
		service: churchServiceReducer
	},

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch