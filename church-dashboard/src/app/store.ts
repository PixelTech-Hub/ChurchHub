import { configureStore } from '@reduxjs/toolkit'
import UserReducer from '@/features/users/userSlice';
import accountReducer from '@/features/account/accountSlice';
import churchBranchesReducer from '@/features/church-branches/churchBranchesSlice';
import churchReducer from '@/features/churches/churchSlice';
import churchServiceReducer from '@/features/church-services/churchServiceSlice';
import churchMinistryReducer from '@/features/church-ministry/churchMinistrySlice';
import insightReducer from '@/features/insights/insightSlice';
import ChurchStaffReducer from '@/features/staffs/staffSlice';

export const store = configureStore({
	reducer: {
		users: UserReducer,
		accounts: accountReducer,
		branches: churchBranchesReducer,
		churches: churchReducer,
		services: churchServiceReducer,
		ministries: churchMinistryReducer,
		blogs: insightReducer,
		staff: ChurchStaffReducer
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch