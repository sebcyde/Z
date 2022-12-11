import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserStateInt {
	UserID: string;
}

const initialState: UserStateInt = {
	UserID: '',
};

export const UserState = createSlice({
	name: 'UserStatePassthrough',
	initialState,
	reducers: {
		SetUser: (state, action: PayloadAction<string>) => {
			state.UserID = action.payload;
		},
	},
});

export const { SetUser } = UserState.actions;
export default UserState.reducer;
