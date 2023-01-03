import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Anime } from '../../Types/AnimeTypes';

interface UserType {
	User: string | null;
}

const initialState: UserType = {
	User: null,
};

export const UserState = createSlice({
	name: 'UserState',
	initialState,
	reducers: {
		SetUser: (state, action: PayloadAction<string | null>) => {
			state.User = action.payload;
		},
	},
});

export const { SetUser } = UserState.actions;
export default UserState.reducer;
