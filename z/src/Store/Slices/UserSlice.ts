import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserStateInt {
	UserObject: any;
}

const initialState: UserStateInt = {
	UserObject: null,
};

export const UserState = createSlice({
	name: 'UserStatePassthrough',
	initialState,
	reducers: {
		SetUser: (state, action: PayloadAction<any>) => {
			state = action.payload;
		},
	},
});

export const { SetUser } = UserState.actions;
export default UserState.reducer;
